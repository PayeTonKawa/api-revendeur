import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from "../../../lib/mongodb";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = await clientPromise;
    const db = client.db("payetonkawa");
    const sessionsCollection = await db.collection("sessions")
    const { query, method } = req
    const bodyparams = req.body
    const email = query.email

    return new Promise(() => {
        switch (method) {
            case 'GET':
                res.status(501).end(`${method} Not Implemented`)

                break;
            case 'POST':
                sessionsCollection.findOne({ email: email }, function (err, result) {
                    if (!result) throw res.status(404).end(err)
                    console.log(bodyparams);

                    res.status(200).json({ code: 200, data: result.jwt })
                })
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