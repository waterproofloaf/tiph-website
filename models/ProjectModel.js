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
        type: String,
        required: true
    },
    proj_img: {
        //type: Image,
    },
    proj_keywords: {
        type: String,
        required: true
    },
    proj_status: {
        type: String,
        default: 'Proposed',
        //required: true
    },
    proj_preview: {
        type: String,
    },
    proj_published: {
        type: Boolean,
        required: true
    },
    proj_showcase: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('Project', ProjectModel);