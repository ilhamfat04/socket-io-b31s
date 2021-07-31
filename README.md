# Socket.io Events - contacts

To build our chat feature, there is two things that we need to define, contacts and messages

In Socket.io, we can use method `on()` and `emit()` to define events
* `on()`    : Method for listen an event that have been emitted. If the event triggered, the callback function will be executed.
* `emit()`  : Method for emit an event. So, this is useful if you want to send data.

We define contacts events inside 'connection' events

##For example usage

### Server
```javascript
... // import models
const socketIo = (io) => {
  io.on('connection', (socket) => {
    // define listener on event “load admin contact”
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
    
      // emit event to send admin data on event “admin contact”
      socket.emit("admin contact", adminContact)
      } catch (err) {
        console.log(err)
      }
    })
  })
}

module.exports = socketIo
```

### Client
```javascript
// initial variable outside component
let socket
...
// connect to server in useEffect function
  useEffect(() =>{
      socket = io('http://localhost:5000')
      loadContact()

      return () => {
          socket.disconnect()
      }
  }, [])

  const loadContact = () => {
    // emit event to load admin contact
    socket.emit("load admin contact")

    // listen event to get admin contact
    socket.on("admin contact", (data) => {
        // do whatever to the data sent from server
    })
  }
...

```