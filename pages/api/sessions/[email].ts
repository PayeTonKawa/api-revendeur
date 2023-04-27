import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from "../../../lib/mongodb";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = await clientPromise;
    const db = client.db("payetonkawa");
    const sessionsCollection = await db.collection("sessions")
    const { query, method } = req
    const email = query.email

    return new Promise(() => {
        switch (method) {
            case 'POST':


                break;
            case 'GET':
                sessionsCollection.findOne({ email: email }, function (err, result) {
                    if (!result) throw res.status(404).end(err)

                    res.status(200).json(result.jwt)
                })


                break;
            default:
                res.setHeader('Allow', ['GET', 'POST'])
                res.status(405).end(`Method ${method} Not Allowed`)
                break;
        }
    })


}