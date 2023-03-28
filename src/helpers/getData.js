import connection from "@/config/connection";

export default async function getData(user, setTodo, setLoading) {
    if (!user) return;
    const { data } = await connection.get(`/task/?id=${user.id}`);
    setTodo(data);
    setLoading(false);
  }