const SocketIO = require("socket.io")
const { repository } = require("./src/chats/chat.module")

module.exports = (server, app) => {
    try {


        const io = SocketIO(server, { cors: { origin: '*' } })
        io.on("connection", (socket) => {
            console.log("user connected");

            let data;
            let room;
            socket.on("joinRoom", ({ boardId, customer, seller }) => {
                room = `${boardId}-${customer}`;
                socket.join(room);
                console.log(`room:::`, room);
                data = {boardId, seller, customer}
              });
              socket.on("sendMessage", ({ boardId, seller, customer, content, type }) => {
                io.to(room).emit("receiveMessage", {
                  boardId: boardId,
                  seller: seller,
                  customer: customer,
                  content: content,
                  type: type,
                })
            });
            socket.on("disconnect", () => {
                console.log(`disconnected`)
              })
        })
    } catch (e) {
            console.log(e)
    }
}
