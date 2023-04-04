// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
var jwt = require('jsonwebtoken');
import User from '@/model/User';
import knex from 'knex';
import knexConfig from '../../../knexfile';
const bcrypt = require('bcrypt');
const db = knex(knexConfig.development);
const dotenv = require("dotenv");
dotenv.config();
import NextCors from 'nextjs-cors'; 

function comparePassword(encriptedPassword, password) {
    return bcrypt.compareSync(`${password}`, `${encriptedPassword}`)
}

export default async function handler(req, res,) {
    await NextCors(req, res, {
        // Options
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
     });
     
    const { username, password } = req.body
    if (!username || !password) return res.status(400).json({ message: 'Preencha todos os campos!' })

    const responseDB = await User.query().select('username').where({ username: username })
    if (!responseDB.length) return res.status(400).json({ message: 'Usuário ou senha inválidos.' })

    const [encriptedPassword] = await User.query().select('password').where({ username: username })

    const comparedPassword = comparePassword(encriptedPassword.password, password)

    if (!comparedPassword) return res.status(400).json({ message: 'Usuário ou senha inválidos.' })

    const [userData] = await User.query().where({ username: username })
    delete userData.password

    try{

        const token = jwt.sign({
            user: {
                ...userData
            }
        }, process.env.SECRET, {expiresIn: process.env.TIME_TO_EXPIRE})

        res.status(200).send({
            token: token,
            user: {
                ...userData
            }
        })

    }catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Aconteceu um erro no servidor, tente novamente mais tarde!"
        })
    }
}
