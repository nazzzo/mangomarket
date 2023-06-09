const SocketIO = require("socket.io")
const { repository: chat } = require("./src/chats/chat.module")
const { repository: reservation } = require("./src/reservations/reservation.module")
const { repository: board } = require("./src/boards/board.module")

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

      socket.on("sendMessage", async ({ data }) => {
        try {
          const date = new Date()
          const result = await chat.postChat(data)
          io.to(roomname).emit("receiveMessage", {
            boardid: data.boardid,
            seller: data.seller,
            customer: data.customer,
            content: data.content,
            email: data.email,
            username: data.username,
            userImg: data.userImg,
            address: data.address,
            createdAt: new Date(Date.now() + (9 * 60 * 60 * 1000)).toISOString()
        })
        } catch (e) {
          console.log(e)
        }
      })

      socket.on("reservation", async ({ data }) => {
        try {
          console.log(data)
          const {address, latitude:lat, longitude:lng, reservation:time } = data
          const content = JSON.stringify({address,lat, lng, time})
          // const content = `{"address": "${data.address}", "lat": ${data.latitude}, "lng": ${data.longitude}, "time": "${data.reservation}"}`
          await reservation.postReservation(data)
          const { email : seller} = await board.findOne(data.boardid)
          const chatData = {
            seller,
            content,
            customer : data.email,
            email : null,
            boardid: data.boardid,
          }
          await chat.postChat(chatData)
          if (data.email) {
            io.to(roomname).emit("reserveMessage", {
              content,
              boardid: data.boardid,
              customer: data.email,
            })
          }
        } catch (e) {
          console.log(e)
        }
      })

      socket.on("reserveAccept", async (data) => {
        try {
          console.log(data)
          const {id, boardState, chatid} = data
          await reservation.updateState(id, boardState)
          if(boardState === "reserved"){
            await chat.putChatState(chatid, "accepted")
            io.to(roomname).emit("reserveAccept", { content: "reserved", chatid, state:"accepted" })
            io.emit("chatStateChanged", { chatid, chatState: "accepted" });
        } else {
            await chat.putChatState(chatid, "rejected")
            io.to(roomname).emit("reserveAccept", { content: "rejected", chatid, state: "rejected" })
            io.emit("chatStateChanged", { chatid, chatState: "rejected" });
        }
        } catch (e) {
          console.log(e)
        }
      })

      socket.on("disconnect", () => {
        console.log(`disconnected`)
      })
    })
  } catch (e) {
    console.log(e)
  }
}
