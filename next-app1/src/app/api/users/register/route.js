import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import db from "../../db.js";

const HashPassword = (password) =>{
    return new Promise((resolve) =>{
        bcrypt.genSalt(10, function(saltErr, salt){
            if(saltErr) { throw saltErr}
            else{
                bcrypt.hash(password, salt, (hashErr, hash) =>{
                    if(hashErr) { throw hashErr}
                    else{
                        //console.log("Hashed in function: " + hash);
                        resolve(hash);
                    }
                });
            }
        });
        //resolve(password);
    })
    
}

export async function POST(request){
    try{
        const reqBody = await request.json();
        const { email, password } = reqBody;
        //console.log(email, password);
        let hashed = await HashPassword(password);

        const query1 = "INSERT INTO users VALUES('', ?, ?, '0', NULL, NULL)";
        const query2 = "SELECT * FROM users WHERE email = ?";

        const isUnique = await new Promise((resolve, reject) => {
            db.query(query2, [email], (error, results) => {
              if (error) {
                reject(error);
              } else {
                resolve(results.length === 0);
              }
            });
        });
        
        if(isUnique){
            const result = await new Promise((resolve, reject) => {
                db.query(query1, [email, hashed], (error, results) => {
                  if (error) {
                    reject(error);
                  } else {
                    resolve(true);
                  }
                });
            });
            if(result){
                const SavedUser = { email: email, password: hashed}
                console.log("Saved User: ", SavedUser);
                return NextResponse.json({ message: "Pomyślnie zarejestrowano", success: true });
            }
            else{
                return NextResponse.json({ error: "Nie udało się dodać użytkownika" }, { status: 400 });
            }
        }
        else{
            return NextResponse.json({error: "Konto z tym adresem e-mail już istnieje"}, { status: 400});
        }

    }catch(err){
        return NextResponse.json({error: err.message}, {status: 500});
    }
}