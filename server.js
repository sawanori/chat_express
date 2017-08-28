const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const portNo = 3000

server.listen(portNo, () => {
  console.log('起動', `http://localhost:${portNo}`)
})

app.use('/public', express.static('./public'))
app.get('/', (req,res) => {
  res.redirect(302,'/public')
})

const socketio = require('socket.io')
const io = socketio.listen(server)
io.on('connection', (socket) => {
  console.log('ユーザーが接続', socket.client.id)

  socket.on('chat-msg', (msg) => {
    console.log('メッセージ', msg)
    io.emit('chat-msg', msg)
  } )
})
