import { getDataFromToken } from "../../../helpers/getDataFromToken";

import { NextResponse } from "next/server";

export async function GET(request){

    try {
        const email = await getDataFromToken(request);
        return NextResponse.json({
            message: "User found",
            email: email
        })
    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 400});
    }

}