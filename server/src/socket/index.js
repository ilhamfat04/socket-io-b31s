// import model
const {chat, user} = require("../../models");

const socketIo = (io) => {
  io.on('connection', (socket) => {
    console.log('client connect: ', socket.id)

    // define listener on event load admin contact
    socket.on("load admin contact", async () => {
      try {
        const adminContact = await user.findOne({
          where: {
            status: "admin"
          },
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        });

        socket.emit("admin contact", adminContact);
      } catch (err) {
        console.log(err);
      }
    });

    // define listener on event load customer contact
    socket.on("load customer contacts", async () => {
      try {
        const customerContacts = await user.findAll({
          include: [
            {
              model: chat,
              as: "recipientMessage",
              attributes: {
                exclude: ["createdAt", "updatedAt", "idRecipient", "idSender"],
              },
            },
            {
              model: chat,
              as: "senderMessage",
              attributes: {
                exclude: ["createdAt", "updatedAt", "idRecipient", "idSender"],
              },
            },
          ],
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        });

        socket.emit("customer contacts", customerContacts);
      } catch (err) {
        console.log(err);
      }
    })
  })
}

module.exports = socketIo;