const { v4: uuidv4 } = require('uuid');
const express = require('express');
const serverless = require('serverless-http');
const app = express()
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.use(express.static(__dirname + '/assets'));

io.on('connection', (socket) => {
  
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
  io.emit('chat message', 'Welcome to aws EC2 deployment world, one new person joined');
  
  socket.on('disconnect', () => {
    io.emit('chat message', 'one person disconnected');
  });
 
});
 
http.listen(3000, () => {
  console.log('listening on *:3000');
});

  //module.exports.hello = serverless(app);
