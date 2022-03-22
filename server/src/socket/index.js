// import models here
const { chat, user, profile } = require('../../models')

const socketIo = (io) => {
  io.on('connection', (socket) => {
    console.log('client connect: ', socket.id)

    // code here
    // event = load admin contact
    socket.on("load admin contact", async () => {
      try {
        const adminContact = await user.findOne({
          include: [
            {
              model: profile,
              as: "profile",
              attributes: {
                exclude: ["createdAt", "updatedAt"]
              }
            }
          ],
          where: {
            status: "admin"
          },
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"]
          }
        })

        socket.emit("admin contact", adminContact)
      } catch (error) {
        console.log(error);
      }
    })


    // event = load customer contacts
    socket.on("load customer contacts", async () => {
      try {
        let customerContacts = await user.findAll({
          include: [
            {
              model: profile,
              as: "profile",
              attributes: {
                exclude: ["createdAt", "updatedAt"]
              }
            },
            {
              model: chat,
              as: "recipientMessage",
              attributes: {
                exclude: ["createdAt", "updatedAt", "idSender", "idRecipient"]
              }
            },
            {
              model: chat,
              as: "senderMessage",
              attributes: {
                exclude: ["createdAt", "updatedAt", "idSender", "idRecipient"]
              }
            }
          ],
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"]
          }
        })

        customerContacts = JSON.parse(JSON.stringify(customerContacts))
        customerContacts = customerContacts.map(item => ({
          ...item,
          image: item.image ? process.env.PATH_FILE + item.image : null
        }))

        console.log(customerContacts);

        socket.emit("customer contacts", customerContacts)

      } catch (error) {
        console.log(error);
      }
    })

    socket.on("disconnect", () => {
      console.log("client disconnect")
    })
  })
}

module.exports = socketIo