// import models here

const socketIo = (io) => {
  io.on('connection', (socket) => {
    console.log('client connect: ', socket.id)

    // code here

    socket.on("disconnect", () => {
      console.log("client disconnect")
    })
  })
}

module.exports = socketIo