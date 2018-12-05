const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    userId: String,
    userName: String
}, {
    timestamps: true
});

module.exports = mongoose.model('account', NoteSchema);