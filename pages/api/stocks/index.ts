import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from "../../../lib/mongodb";
import { apiHandler } from '../../../helpers/api/api-handler';

/**
 * @swagger
 * /api/stocks/:
 *   get:
 *     tags:
 *       - Stocks
 *     summary: Get stocks
 *     responses:
 *       200:
 *         description: get all stocks
 *     security:
 *       - jwt_token: []
 */

export default apiHandler(handler)

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = await clientPromise;
    const db = client.db("payetonkawa");
    const clientCollection = await db.collection('products');
    const {method, query} = req
    var resultArray = []
    return new Promise(() => {
        switch (method) {
            case 'GET':
                clientCollection.find({}).toArray(function(err, result) {
                    if (!result || result.length === 0) throw  res.status(404).json({"code": 404, "error":"Not found"});
                    for (let index = 0; index < result.length; index++) {
                        const element = result[index];
                        resultArray.push({"stock": element.stock,"id": element.id})
                    }
                    
                    res.status(200).json({"code": 200, "data": resultArray});
                });
                break
            default:
                res.setHeader('Allow', ['GET']);
                res.status(405).end(`Method ${method} Not Allowed`);
        }
    })
}