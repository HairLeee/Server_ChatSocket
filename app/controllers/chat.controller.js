const Message = require('../models/chat.model.js');

exports.create = function (roomId, sendId, reciveId, content, type){
    return new Promise(resolve => {
        // Create a chat message
     const message = new Message({
         roomId:roomId,
         sendId: sendId ,
         reciveId: reciveId,
         content: content,
         type: type
    });
        // Save Note in the database
        message.save()
        .then(data => {
            resolve(data) ;
        }).catch(err => {
            return err;
        });
    });
};


exports.delete = function(messageId){
    return new Promise(resolve => {
        Message.findByIdAndRemove(messageId)
        .then(data => {
            resolve(data); 
        }).catch(err => {
            resolve(err);
        });
    });
};

exports.findAll = function(roomId) {
    return new Promise(resolve => {
        Message.find({'roomId':roomId})
        .then(data => {
            resolve(data);
        }).catch(err => {
            resolve(err);
        });
      });
};
