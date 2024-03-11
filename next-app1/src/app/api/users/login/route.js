import { NextRequest, NextResponse } from "next/server";
import db from "../../db.js";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import cookie from 'cookie';

export async function POST(request){
    try{
        console.log("Logging in..");
        const reqBody = await request.json();
        const { email, password } = reqBody;
        //console.log(email);
        const query = "SELECT * FROM users WHERE email = ?";
        const result = await new Promise((resolve, reject) => {
            db.query(query, [email], (error, results) => {
              if (error) {
                reject(error);
              } else {
                resolve(results);
              }
            });
        });
        if(result.length > 0){
            const equal = await new Promise((resolve, reject) => {
                bcrypt.compare(password, result[0].password, (error, response) => {
                    if (error) {
                        reject(error);
                      } else {
                        resolve(response);
                      }
                });
            });
            if(equal){
                if(result[0].isVerified){
                    const token = await sign({ email: email }, process.env.JWT_SECRET, {expiresIn: "1d"});

                    const response = NextResponse.json({
                        message: "Zalogowano",
                        success: true,
                    });
                    response.cookies.set("token", token, {
                        httpOnly: true, 
                    });
                    return response;
                }
                else{
                    return NextResponse.json({ error: "Twoje konto nie jest zweryfikowane", verify: true }, { status: 400 });
                }
                
                //return NextResponse.json({ message: "Pomyślnie zalogowano", success: true });
            }
            else{
                return NextResponse.json({ error: "Podano nieprawidłowe hasło" }, { status: 400 });
            }
        }
        else{
            return NextResponse.json({error: "Konto z tym adresem e-mail nie istnieje"}, { status: 400});
        }
    }
    catch(err){
        return NextResponse.json({error: err.message}, {status: 500});
    }
    
}