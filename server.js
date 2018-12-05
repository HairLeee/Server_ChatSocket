const express = require('express');
const bodyParser = require('body-parser');
// const Message = require('./app/models/chat.message.js');
const connection = require('./app/controllers/conect.controller.js')
const chat = require('./app/controllers/chat.controller.js')
// create express app
const app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())


// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url)
.then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Hello, I Am Hair Lee - Ambition"});
});

require('./app/routes/chat.routes.js')(app);
http.listen(6789, function(){
  console.log('listening on ~*:6789');
});

io.on('connect', function(socket){
  var socketId = socket.id;
  console.log('a user connected' + socket.id);
  connection.findAll().then(data => {
    console.log('-------findAll complet --------');
    let listUser = data;
    socket.emit('sendsocketid', socketId, listUser);
    socket.emit('connect', socketId);
  })

  socket.on('insertConnection', function(dataClient){
  var myObject = {
    socketId:dataClient["socketId"],
    userId: dataClient["userId"],
    userName: dataClient["userName"]
    }
    connection.insertConnection(myObject.userId, myObject.socketId, myObject.userName)
    .then(data => {
      console.log(data);
      connection.findAll().then(data => {
        let listUser = JSON.stringify(data);
        socket.broadcast.emit('updateUser', listUser);
      });
    });
  });


  socket.on('getListMessage', function(messageData){
    var dataObject = {
      roomId:messageData["roomId"]
    };
    socket.join(dataObject.roomId);
    chat.findAll(dataObject.roomId).then(data => {
      let listMessage = JSON.stringify(data);
      io.in(dataObject.roomId).emit('getListMessage', listMessage);
    });
  });


  socket.on('sendMessage', function(messageData){
    var dataObject = {
      roomId:messageData["roomId"],
      sendId:messageData["sendId"],
      reciveId: messageData["reciveId"],
      content: messageData["content"],
      type: messageData["type"]
    };
    // socket.join(dataObject.roomId);
    chat.create(dataObject.roomId, dataObject.sendId, dataObject.reciveId, dataObject.content, dataObject.type)
    .then(data => {
      // var arrData = [data];
      let dataSend = JSON.stringify(data);
      io.in(dataObject.roomId).emit('sendMessage', dataSend);
    });
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
    connection.deleteConnetion(socketId).then(data => {
      console.log(data);
      connection.findAll().then(data => {
        let listUser = data;
        socket.broadcast.emit('updateUser', listUser);
      });
    });
  });
});

function storeSocketIdAndMessage(userId,socketid,message) {
  // Save Socket Id and Message
  const note = new Message({
      userId: userId || "1",
      socketId: socketid,
      message: message
  });

  // Save Note in the database
  note.save()
  .then(data => {
        // console.log(data)
  }).catch(err => {

  });
}
