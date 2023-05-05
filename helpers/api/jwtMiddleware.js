import { error } from "console";
import clientPromise from "../../lib/mongodb";
import { NextResponse } from "next/server";

export async function jwtMiddleware(req, res) {
    const client = await clientPromise;
    const db = client.db("payetonkawa");
    const sessionsCollection = await db.collection("sessions")
    const token = req.headers['auth-token']
    
    const data = await sessionsCollection.findOne({ jwt: token})
    if (!data) {
        let error = new Error()
        error.name = "UnauthorizedError"
        throw error
    }
    

}