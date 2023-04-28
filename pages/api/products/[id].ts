import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from "../../../lib/mongodb";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = await clientPromise;
    const db = client.db("payetonkawa");
    const productCollection = await db.collection("products")
    const { query, method } = req
    const id = query.id

    return new Promise(() => {
        switch (method) {
            case 'GET':
                productCollection.findOne({ id: id }, function (err, result) {
                    if (!result) throw res.status(404).end(err)

                    res.status(200).json({ code: 200, data: result })
                })
                break;
            case 'POST':
                res.status(501).end(`${method} Not Implemented`)
                break;
            case 'PUT':
                res.status(501).end(`${method} Not Implemented`)
                break;
            case 'DELETE':
                res.status(501).end(`${method} Not Implemented`)
                break;
            default:
                res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
                res.status(405).end(`Method ${method} Not Allowed`)
                break;
        }
    })


}