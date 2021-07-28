# Socket.io Connection

To initialize connection between client and server, we can add code like this:


### Server
* src/socket/index.js
```javascript
const socketIo = (io) => {
 io.on('connection', (socket) => {
   console.log('client connect:', socket.id)
 })
}

module.exports = socketIo;
```

* src/index.js
```javascript
const io = new Server(server, {
 cors: {
   origin: 'http://localhost:3000' // define client origin if both client and server have different origin
 }
})
require('./src/socket')(io);
```


### Client
* client/src/pages/Complain.js
* client/src/pages/ComplainAdmin.js
```javascript
// initial variable outside component
let socket
...
// connect to server in useEffect function
   useEffect(() =>{
       socket = io('http://localhost:5000', {
           auth: {
               token: localStorage.getItem('token')
           }
       })

       return () => {
           socket.disconnect();
       }
   }, [])
...

```