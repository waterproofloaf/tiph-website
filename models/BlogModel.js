var mongoose = require('mongoose');

var BlogModel = new mongoose.Schema({
    blog_title: {
        type: String,
        required: true,
    },
    blog_author: {
        type: String,
        required: true,
    },
    blog_content: {
        type: String,
        required: true
    },
    blog_date: {
        type: String,
        required: true
    },
    blog_img: {
        //type: Image,
    },
    blog_keywords: {
        type: String,
        required: true
    },
    blog_preview:{
        type: String
    },
    blog_published: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('Blog', BlogModel);
