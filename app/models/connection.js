const mongoose = require('mongoose');

const connectionSchema = mongoose.Schema({
    userId: String,
    socketId:String,
    userName: String
}, {
    timestamps: true
});

module.exports = mongoose.model('connections', connectionSchema);