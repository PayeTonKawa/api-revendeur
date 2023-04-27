import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from "../../../lib/mongodb";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = await clientPromise;
    const db = client.db("payetonkawa");
    const productCollection = await db.collection("produits")
    const { query, method } = req
    const id = query.id

    return new Promise(() => {
        switch (method) {
            case 'GET':
                productCollection.findOne({ id: id }, function (err, result) {
                    if (!result) throw res.status(404).end(err)

                    res.status(200).json(result)
                })


                break;
            default:
                res.setHeader('Allow', ['GET', 'POST'])
                res.status(405).end(`Method ${method} Not Allowed`)
                break;
        }
    })


}