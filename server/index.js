// import dotenv and call config function to load environment
require('dotenv').config()
const express = require('express')

const cors = require('cors')

// import here
const http = require('http')
const { Server } = require('socket.io')

// Get routes to the variabel
const router = require('./src/routes')

const app = express()

// code here
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000' // port FE
    }
})

const port = 5000

app.use(express.json())
app.use(cors())

// Add endpoint grouping and router
app.use('/api/v1/', router)
app.use('/uploads', express.static('uploads'))

// change app to server
app.listen(port, () => console.log(`Listening on port ${port}!`))
