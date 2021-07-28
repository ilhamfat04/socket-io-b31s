const socketIo = (io) => {
  io.on('connection', (socket) => {
    console.log('client connect:', socket.id)
  })
}

module.exports = socketIo;