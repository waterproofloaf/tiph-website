var mongoose = require('mongoose');

var ProjectModel = new mongoose.Schema({
    proj_title: {
        type: String,
        required: true,
    },
    proj_content: {
        type: String,
        required: true
    },
    proj_date: {
        type: Date,
        required: true
    },
    proj_img: {
        type: Image,
    },
});

module.exports = mongoose.model('Project', ProjectModel);