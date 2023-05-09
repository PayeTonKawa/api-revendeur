import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from "../../../lib/mongodb";
import { apiHandler } from '../../../helpers/api/api-handler';

/**
 * @swagger
 * /api/orders/{order_id}/:
 *   get:
 *     tags:
 *       - Orders
 *     summary: Get one specific order
 *     responses:
 *       200:
 *         description: get an order based on its ID
 *     parameters:
 *       - name: order_id
 *         in: path
 *         description: Order ID
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     security:
 *      - jwt_token: []
 */

export default apiHandler(handler)

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = await clientPromise;
    const db = client.db("payetonkawa");
    const clientCollection = await db.collection('customers');
    const {method, query} = req
    const id = query.id;
    return new Promise(() => {
        switch (method) {
            case 'GET':
                clientCollection.find({id: id}).toArray(function(err, result) {
                    if (!result || result.length === 0) throw  res.status(404).json({"code": 404, "error":"Not found"});
                    const order = result[0].orders[0]

                    res.status(200).json({"code": 200, "data": order});
                });
                break
            case 'PUT':
                res.status(501).end();
                break
            case 'POST':
                res.status(501).end();
                break
            case 'DELETE':
                res.status(501).end();
                break
            default:
                res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
                res.status(405).end(`Method ${method} Not Allowed`);
        }
    })
}
