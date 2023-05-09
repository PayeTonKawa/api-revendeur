import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from "../../../lib/mongodb";
import { apiHandler } from '../../../helpers/api/api-handler';

/**
 * @swagger
 * /api/products/:
 *   get:
 *     tags:
 *       - Products
 *     summary: Get products
 *     responses:
 *       200:
 *         description: get all products
 *     security:
 *       - jwt_token: []
 */

export default apiHandler(handler)

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = await clientPromise;
    const db = client.db("payetonkawa");
    const productCollection = await db.collection("products")
    const { query, method } = req

    return new Promise(() => {
        switch (method) {
            case 'GET':
                productCollection.find({}).toArray(function (err, result) {
                    if (!result) throw res.status(404).end(err)

                    res.status(200).json(result)
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