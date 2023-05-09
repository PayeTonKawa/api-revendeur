import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from "../../../lib/mongodb";
import { jwtGenerator } from '../../../functions/jwtQRGenerator';
import mailSender from '../../../functions/mailSender';

/**
 * @swagger
 * /api/sessions:
 *   post:
 *     tags:
 *       - Sessions
 *     summary: Get email or JWT
 *     responses:
 *       200:
 *         description: if the email does not exist in DB, an email is sent to the email provided as arg, with a QRCode containing JWT. If the email exists, you will receive the corresponding JWT
 *     requestBody:
 *       description: Update an existent pet in the store
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - email
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *          
 *
 */

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = await clientPromise;
    const db = client.db("payetonkawa");
    const sessionsCollection = await db.collection("sessions")
    const jwt = require('jsonwebtoken');
    const { query, method } = req
    const email = req.body.email

    const token = jwtGenerator(email)

    return new Promise(() => {
        switch (method) {
            case 'GET':
                res.status(501).end(`${method} Not Implemented`)

                break;
            case 'POST':
                if (email) {
                    sessionsCollection.findOne({ email: email }, function (err, result) {
                        if (!result || result.length === 0){
                            mailSender(token, email, res)
                            sessionsCollection.insertOne({email: email, jwt:token})
                        } else {
                            res.status(200).json({ code: 200, data: {jwt: result.jwt, emailSent : false} })
                        }
    
                    })
                } else {
                    res.status(400).json({code: 400, date: {message: "paramètre obligatoire manquant"}})
                }
                
                break;
            case 'PUT':
                res.status(501).end(`${method} Not Implemented`)
                break;
            case 'DELETE':
                res.status(501).end(`${method} Not Implemented`)
                break;
            default:
                res.setHeader('Allow', ['GET', 'POST'])
                res.status(405).end(`Method ${method} Not Allowed`)
                break;
        }
    })


}