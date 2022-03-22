const socketIo = (io) => {
  // code here
  // on = menerima perintah/event/kata kunci
  // emit = mengirim perintah/event/kata kunci
  let userCount = 0
  io.on("connection", (socket) => {
    userCount++
    console.log('Client id ', socket.id);
    console.log('Client connect ', userCount);

    socket.on("disconnect", () => {
      userCount--
      console.log("client disconnect");
    })
  })
}

module.exports = socketIo