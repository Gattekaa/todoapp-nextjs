import Task from "@/model/Task";

export default async function handler(req, res) {
  if (req.method === "GET" && req.query.id) {
    await getById(req, res);
  }
  if (req.method === "GET") {
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
    const data = await Task.query().findById(id);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Task não encontrada." });
  }
};

export const getTask = async (req, res) => {
  try {
    const data = await Task.query();
    res.status(200).json(data);
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
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

export const deleteTask = async (req, res) => {
  const { id  } = req.query
  if (!id) return res.status(400).json({ message: "id não pode ser vazio." });

  try {
    const data = await Task.query().deleteById(id);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

export const updateTask = async (req, res) => {
  const dataBody = req.body;
  delete dataBody.createdAt
  delete dataBody.updatedAt


  try {
    const data = await Task.query().findById(dataBody.id).patch(dataBody).returning('*');
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
