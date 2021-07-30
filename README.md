# Socket.io Middlewares

Socket.io provide API to let us create middlewares. To create middlewares, we can call `io.use()` method before connection event and make validation on handshake.

Note: handshake is the property that store object with options value that sent from client

## For example usage

### Server
```javascript
... // import models
const socketIo = (io) => {
  ...
  // create middlewares before connection event
  // to prevent client access socket server without token
  io.use((socket, next) => {
    if (socket.handshake.auth && socket.handshake.auth.token ) {
      next();
    } else {
      next(new Error("Not Authorized"));
    }
  });
  ... //connection
}

module.exports = socketIo
```

### Client
```javascript
...
useEffect(() =>{
  socket = io('http://localhost:5000', {
      auth: {
          token: localStorage.getItem("token") // we must set options to get access to socket server
      }
  })
  loadContacts()

  // listen error sent from server
  socket.on("connect_error", (err) => {
      console.error(err.message); // not authorized
  });
  
  return () => {
      socket.disconnect()
  }
}, [])
...

```

[Socket.io middlewares](https://socket.io/docs/v3/middlewares/)