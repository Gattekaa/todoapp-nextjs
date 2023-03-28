import connection from "@/config/connection";

export default async function fetchUpdate(e, item, sfetch, setFetch, socket) {
    e.preventDefault();
    if (sfetch) return;
    setFetch(true);

    try {
      const data = await connection.patch(`/task`, {
        ...item,
        done: !item.done,
      });
      socket.emit("refresh-data");
      setShowModal(false);
    } catch (err) {
    } finally {
      setFetch(false);
    }
  }