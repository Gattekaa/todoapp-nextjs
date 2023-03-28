import connection from "@/config/connection";

export default async function fetchNewTag(e, setFetch, setNewTag, socket, initialState, user, newTag) {
    e.preventDefault();
    setFetch(true);
    try {
      const data = await connection.post(`/task/`, {
        id: user.id,
        title: newTag.title,
        description: newTag.description,
      });
      socket.emit("refresh-data");
    } catch (err) {
      console.log(err);
    } finally {
      setNewTag({ ...initialState });
      setFetch(false);
    }
  }