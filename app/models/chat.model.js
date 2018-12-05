const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    roomId: String,
    sendId: String,
    reciveId: String,
    content: String,
    type: String
}, {
    timestamps: true
});

module.exports = mongoose.model('message', NoteSchema);