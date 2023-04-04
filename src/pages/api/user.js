import User from "../../model/User";
import NextCors from 'nextjs-cors'; 

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');

function generateHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(12));
}

export default async function handler(req, res) {
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
 });

  if (req.method === "GET" && req.query?.id) {
    return await getById(req, res);
  } else if (req.method === "GET") {
    return await getUser(req, res);
  } else if (req.method === "POST") {
    return await postUser(req, res);
  } else if (req.method === "DELETE") {
    return deleteUser(req, res);
  } else if (req.method === "PATCH") {
    return patchUser(req, res);
  }
}

export const getById = async (req, res) => {
  try {
    const [data] = await User.query()
      .select("id", "username")
      .where("id", req.query.id)
      .withGraphFetched("tasks");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
};

export const getUser = async (req, res) => {
  try {
    const data = await User.query()
      .select("id", "username")
      .withGraphFetched("tasks");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
};

export const postUser = async (req, res) => {
  const { username, password, password_confirm } = req.body;
  const user = await User.query().findOne('username', username)

  if (!username || !password || !password_confirm)
    return res.status(400).json({ message: "Preencha todos os campos!" });
  if (password !== password_confirm)
    return res
      .status(400)
      .json({ message: "As duas senhas precisam ser iguais!" });
  if (user) return res.status(409).json({ message: "Este usuário não está disponível." });

  const encriptedPassword = generateHash(password);

  try {

    const data = await User.query().insert({ username, password: encriptedPassword })
    delete data.password
    const token = jwt.sign({
      user: {
        ...data
      }
    }, process.env.SECRET, { expiresIn: process.env.TIME_TO_EXPIRE })

    res
      .status(200)
      .json({ message: "Usuário cadastrado com sucesso!", token });
  } catch (err) {
    res.status(400).json({
      message: "Ocorreu um erro, tente novamente mais tarde.",
    });
  }

};

export const deleteUser = async (req, res) => {
  const { id } = req.query;

  if (!id) return res.status(400).json({ message: "'id' não pode ser vazio." });

  try {
    const data = await User.query().deleteById(id);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

export const patchUser = async (req, res) => {
  const { id, username, password, confirm_password } = req.body;
  if (!id) return res.status(400).send({ message: "'id' não pode ser vazio." });
  if (password && password !== confirm_password)
    return res
      .status(400)
      .json({ message: "As duas senhas precisam ser iguais." });

  const encriptedPassword = password ? generateHash(password) : undefined;

  try {
    const data = await User.query()
      .findById(id)
      .patch({ username, password: encriptedPassword });
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json(err);
  }
};
