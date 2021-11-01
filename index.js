const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')

const io = new Server(server)
const port = 3001

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/view/index.html')
})

io.on('connection', function (socket) {
    
    socket.on('chat message', function (message) {
       socket.broadcast.emit('chat message', message)
    })

    socket.on('connection status', function (message) {
        io.emit('connection status', message)
    })

    socket.on('disconnect status', function (message) {
        io.emit('disconnect status', message)
    })
})

server.listen(port, function () {
    console.log("Server listening on port : ", port)
})