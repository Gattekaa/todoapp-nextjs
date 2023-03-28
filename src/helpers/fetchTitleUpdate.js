import connection from "@/config/connection";

export async function fetchTitleUpdate(e, item, socket, setShowModal) {
    e.preventDefault();
    try {
      const data = await connection.patch(`/task`, {
        ...item,
      });
      socket.emit("refresh-data");
      setShowModal(false);
    } catch (err) {}
  }