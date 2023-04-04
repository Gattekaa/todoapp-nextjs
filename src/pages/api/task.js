import Task from "@/model/Task";
import NextCors from 'nextjs-cors'; 

export default async function handler(req, res) {
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
 });

  
  if (req.method === "GET" && req.query.id) {
    await getById(req, res);
  } else if (req.method === "GET") {
    await getTask(req, res);
  } else if (req.method === "POST") {
    await postTask(req, res);
  } else if (req.method === "DELETE") {
    await deleteTask(req, res);
  } else if (req.method === "PATCH") {
    await updateTask(req, res);
  }
}

export const getById = async (req, res) => {
  const { id } = req.query;
  if (!id) return res.status(400).json({ message: "'id' não pode ser vazio" });
  try {
    const data = await Task.query().select('*').where('todoappusers_id', id);
    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    return res.status(404).json({ message: "Task não encontrada." });
  }
};

export const getTask = async (req, res) => {
  try {
    const data = await Task.query();
    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
};

export const postTask = async (req, res) => {
  const { id, title, description } = req.body;
  try {
    const data = await Task.query().insert({
      todoappusers_id: id,
      title,
      description,
    });
    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

export const deleteTask = async (req, res) => {
  const { id  } = req.query
  if (!id) return res.status(400).json({ message: "id não pode ser vazio." });

  try {
    const data = await Task.query().deleteById(id);
    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

export const updateTask = async (req, res) => {
  const dataBody = req.body;
  delete dataBody.createdAt
  delete dataBody.updatedAt


  try {
    const data = await Task.query().findById(dataBody.id).patch(dataBody).returning('*');
    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};
