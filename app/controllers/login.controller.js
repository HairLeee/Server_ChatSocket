const Note = require('../models/login.model.js');

exports.findOne = (req, res) => {
    Note.findOne({'userName': req.body.userName})
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with userName " + req.body.userName
            });
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with userName " + req.params.userName
            });
        }
        return res.status(500).send({
            message: "Error retrieving note with userName " + req.params.userName
        });
    });
};