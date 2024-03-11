"use server"
import nodemailer from 'nodemailer';
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import db from "../../db.js";

/*
    dodać do tabeli user rekordy: 
     verificationToken
     tokenExpiry
     isVerified
    po zarejestrowaniu dodaje się nowy użytkownik, token i data waznosci null, isVerified false.
    przekierowujemy na strone z wiadomoscią "Zweryfikuj adres email", z możliwością ponownego wysłania.
    Jezeli uzytkownik wyjdzie z tej strony bez zweryfikowania konta i spróbuje się na nie zalogować,
    to wyskoczy komunikat że nie jest zweryfikowany i link do weryfikacji (ten sam co po rejestracji)
*/

export async function POST(request){
    try{
        const reqBody = await request.json();
        const { email } = reqBody;
        const hashedToken = await bcrypt.hash(email, 10);

        const query1 = "SELECT * FROM users WHERE email = ? AND isVerified = 0";

        const isNotVerified = await new Promise((resolve, reject) => {
            db.query(query1, [email], (error, results) => {
                if (error) {
                    reject(error);
                }
                else{
                    resolve(results.length > 0);
                }
            });
        });
        if(!isNotVerified){
            return NextResponse.json({ error: "Użytkownik z tym adresem email jest już zweryfikowany"}, { status: 400 });
        }

        const query2 = "UPDATE users SET verificationToken=?, verificationTokenExpiry=? WHERE email=?";

        console.log("mailing: " + email);

        const result = await new Promise((resolve, reject) => {
            db.query(query2, [hashedToken, Date.now() + 3600000, email], (error, results) => {
                if (error) {
                    reject(error);
                }
                else{
                    resolve(results);
                }
            });
        });
        //return NextResponse.json({ message: result, success: true});

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "baffe99a91f423",
              pass: "4a73746586f035"
            }
        });
        
        const mailOptions = {
            from: "verificationBot@gmail.com",
            to: email,
            subject: "Zweryfikuj adres email",
            html: `<p>Kliknij <a href='${process.env.DOMAIN}/verifyEmail?token=${hashedToken}'>tutaj</a>, aby zweryfikować swój adres email</p>`,

        }

        const mailResponse = await transport.sendMail(mailOptions);

        return NextResponse.json({ message: mailResponse, success: true});
        


    }catch(error){
        return NextResponse.json({ error: error }, { status: 400 });
    }

}