import { NextRequest, NextResponse } from "next/server";
import db from "../../db";

export async function POST(request){
    try{
        const reqBody = await request.json();
        const { token } = reqBody;
        console.log(token);

        const query1 = "SELECT * FROM users WHERE verificationToken = ? AND verificationTokenExpiry >= ?";
        const user = await new Promise((resolve, reject) => {
            db.query(query1, [token, Date.now()], (error, results) => {
              if (error) {
                reject(error);
              } else {
                resolve(results[0]);
              }
            });
        });
        if(!user){
            return NextResponse.json({error: "Nieprawidłowy token. Spróbuj jeszcze raz"}, {status: 400});
        }

        const query2 = "UPDATE users SET verificationToken = NULL, verificationTokenExpiry = NULL, isVerified = 1 WHERE id = ?";
        
        const result = await new Promise((resolve, reject) => {
            db.query(query2, [user.id], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            })
        });
        return NextResponse.json({message: result, success: true});
    }
    catch(error){
        return NextResponse.json({error: error.message}, {status: 400});
    }
}