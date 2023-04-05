const SocketIO = require("socket.io")

module.exports = (server, app) => {
    const io = SocketIO(server, { cors: { origin: '*' } })
    
    io.on('connection', (socket) => {
        console.log('사용자가 접속했습니다.')

        socket.on('join', (data) => {
            const { username } = data.user
            // namespace === sender
            const namespace = username
            
            console.log(namespace)
            // namespace 생성
            socket.join(namespace)

            // event === receiver
            socket.on('chat', (data) => {
                console.log(data)
                io.of('/').in(namespace).emit('chat', data.content)
            })


        })
    })
}