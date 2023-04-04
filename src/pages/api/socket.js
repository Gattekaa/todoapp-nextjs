const { Server } = require("socket.io");
import NextCors from 'nextjs-cors'; 

const SocketHandler = async (req, res) => {
    await NextCors(req, res, {
        // Options
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
     });

        if (res.socket.server.io) {
            console.log('Socket is already running')
        } else {
            console.log('Socket is initializing')
        const io = new Server(res.socket.server, {
            cors: {
                origin: '*',
                methods: '*'
            }
        })
            res.socket.server.io = io
    
        io.on("connect", (socket) => {
                socket.on("refresh-data", () => {
                    io.emit("get-data");
                });
            });
        }
        res.end()
}

export default SocketHandler