const { Server } = require("socket.io");
const SocketHandler = (req, res) => {
    if (res.socket.server.io) {
        console.log('Socket is already running')
    } else {
        console.log('Socket is initializing')
        const io = new Server(res.socket.server)
        res.socket.server.io = io

        io.on("connection", (socket) => {
            socket.on("refresh-data", () => {
                io.emit("get-data");
            });
        });
    }
    res.end()
}

export default SocketHandler