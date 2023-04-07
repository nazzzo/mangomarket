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
              socket.on("sendMessage", ({ boardId, seller, customer, message, type }) => {
                io.to(room).emit("receiveMessage", {
                  boardId: boardId,
                  seller: seller,
                  customer: customer,
                  message: message,
                  type: type,
                })
        

            repository.postChat({
                boardid: data.boardId,
                seller: data.seller,
                customer: data.customer,
                content: message,
                type: type,
                });
            });
            socket.on("disconnect", () => {
                console.log("disconnected")
              })
        })
    } catch (e) {
             console.log(e)
    }
}
