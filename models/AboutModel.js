var mongoose = require('mongoose');

var AboutModel = new mongoose.Schema({
    about_title: {
        type: String,
        required: true
    },
    about_description: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('About', AboutModel);