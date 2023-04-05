const SocketIO = require("socket.io")
const { repository } = require("./src/chats/chat.module")

module.exports = (server, app) => {
    const io = SocketIO(server, { cors: { origin: '*' } })
    
    io.on('connection', (socket) => {
        console.log(`사용자가 접속했습니다`)
        socket.on('join', (data) => {
            console.log(`${data.username}님이 보냈습니다`)
            // namespace === receiver
            const { namespace, room } = data

            // namespace 생성
            socket.join(namespace)

            // event === sender
            socket.on(`${room}`, async (data) => {
                io.of(namespace).in(room).emit(`${room}`, data.content)
                data.boardid = namespace
                const result = await repository.postChat(data)
                console.log(result)
                // socket.broadcast.to(namespace).emit(`${room}`, `${data.content} 브로드캐스트 실험`)
            })

        })
    })
}