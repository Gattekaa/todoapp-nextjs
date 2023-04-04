var jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();
import NextCors from 'nextjs-cors'; 

export default async function handler(req, res) {
    await NextCors(req, res, {
        // Options
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
     });

    const secret = process.env.SECRET
    try{
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(" ")[1]

        if (!token) return res.status(400)
        const data = jwt.verify(token, secret)
        return res.status(200).send(data)
    } catch(err) {
        console.log(err)
        return res.status(401).send({ message: 'expired' })
    }
    //console.log(data)

}
