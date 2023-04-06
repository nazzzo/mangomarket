const SocketIO = require("socket.io")
const { repository } = require("./src/chats/chat.module")

module.exports = (server, app) => {
    try {
        const io = SocketIO(server, { cors: { origin: '*' } })
        // console.log("소켓서버", io)
        io.on('connection', (socket) => {

            console.log(`Socket 사용자가 접속했습니다`)

            socket.on('init', (data) => {
                console.log(data)
                const { namespace, room, username } = data
                const server = io.of(`/${namespace}`)
                
                socket.emit("namespace", { namespace })
                // socket.emit("senderInfo", { senderId: `${room}`})

                server.on("connection", (socket) => {
                    console.log("New Connection")
                    socket.on('join', (room) => {
                        console.log(room.data)
                        socket.join(room.data)
                        console.log("룸에 접속")
                    })

                    socket.on(`${room}`, (data) => {
                        console.log(data)
                        server.to(`${room}`).emit("message", data)
                    })

                })
            })
            
            // socket.on(`${room}`, async (data) => {
            //     io.of(namespace).in(room).emit(`${room}`, data.content)
            //     data.boardid = namespace
            //     const result = await repository.postChat(data)
            //     // socket.broadcast.to(namespace).emit(`${room}`, `${data.content} 브로드캐스트 실험`)
            // })

            socket.on('disconnect', () => {
                console.log(`Socket disconnected`)
            })
        })
    } catch (e) {
        console.log(e)
    }

    
}