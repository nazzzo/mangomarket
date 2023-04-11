const SocketIO = require("socket.io")
const { repository } = require("./src/chats/chat.module")

module.exports = (server, app) => {
    try {
        const io = SocketIO(server, { cors: { origin: '*' } })
        io.on("connection", (socket) => {
            console.log("user connected");

            let roomname
            socket.on("joinRoom", ({ room }) => {
                socket.join(room);
                roomname = room
                console.log(`room:::`, room);
              });
              socket.on("sendMessage", ({ data }) => {
                const date = new Date()
                io.to(roomname).emit("receiveMessage", {
                  boardid: data.boardid,
                  seller: data.seller,
                  customer: data.customer,
                  content: data.content,
                  email: data.email,
                  username: data.username,
                  userImg: data.userImg,
                  address: data.address,
                  createdAt: date.toISOString(),
                })
            })

            socket.on("disconnect", () => {
                console.log(`disconnected`)
              })
        })
    } catch (e) {
            console.log(e)
    }
}
