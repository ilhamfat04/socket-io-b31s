# Prepare

Before integrate our application with Socket.io, we make some preparations, including:

* Install package socket.io on client and server

On server:
```
npm install socket.io
```

On client:
```
npm install socket.io-client
```

* Server initialization
```javascript
// import package
const http = require('http')
const {Server} = require('socket.io')

// add after app initialization
const server = http.createServer(app)
const io = new Server(server, {
 cors: {
   origin: 'http://localhost:3000' // define client origin if both client and server have different origin
 }
})

// change app to server
server.listen(port, () => console.log(`Listening on port ${port}!`))
```