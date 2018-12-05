module.exports = (app) => {
    const notes = require('../controllers/note.controller.js');
    const message = require('../controllers/chat.controller.js');
    const login = require('../controllers/login.controller.js');
    const uploadImage = require('../controllers/sendFile.controller.js');
    const express = require('express');

    // Create a new Note
    app.post('/notes', notes.create);

    // Retrieve all Notes
    app.get('/notes', notes.findAll);

    // Retrieve a single Note with noteId
    app.get('/notes/:noteId', notes.findOne);

    // Update a Note with noteId
    app.put('/notes/:noteId', notes.update);

    // Delete a Note with noteId
    app.delete('/notes/:noteId', notes.delete);


    //Chatting
    app.post('/message', message.create);

    app.get('/getallmessages', message.findAll);

    app.get('/home',function(req,res){
            res.render("home")
    });

    //login
    app.put('/login', login.findOne);

    // app.put('/upload', uploadImage.uploadImage);
    const apiRoutes = express.Router();


var multer  = require('multer')
//   const sftpStorage = require('multer-sftp');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './image')
    },
    filename: function (req, file, cb) {
    //   let jdjjd = file.fieldname + '-' + new Date().getTime() + '.' + file.originalname.split('.')[1];
      cb(null, file.fieldname + '-' + new Date().getTime() + '.' + file.originalname.split('.')[1]);
    }
  })

var upload = multer({ storage: storage });
var uploadImageChat = upload.single('chatImage');

apiRoutes.post('/upload', upload.single('chatImage'), function(req, res){
    var fileInfor = req.file;
    var path = fileInfor.path
    console.log(path);
});

    app.use( apiRoutes);
  
}
