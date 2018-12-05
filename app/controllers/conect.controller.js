const conection = require('../models/connection.js');

exports.insertConnection = function (userId, socketId, userName){
    return new Promise(resolve => {
        // Create a Note
     const connet = new conection({
        userId: userId ,
        socketId: socketId,
        userName: userName
    });
        // Save Note in the database
        connet.save()
        .then(data => {
            resolve(data) ;
        }).catch(err => {
            return 'Have not insert';
        });
    });
};

exports.deleteConnetion = function(socketId){
    return new Promise(resolve => {
        conection.findOneAndRemove({'socketId': socketId})
        .then(data => {
            resolve(data);
        }).catch(err => {
            resolve(err);
        });
    });
};

exports.findAll = function() {
    return new Promise(resolve => {
        conection.find()
        .then(data => {
            resolve(data);
        }).catch(err => {
            resolve(err);
        });
      });
};

   
