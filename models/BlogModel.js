var mongoose = require('mongoose');

var BlogModel = new mongoose.Schema({
    blog_title: {
        type: String,
        required: true,
    },
    blog_content: {
        type: String,
        required: true
    },
    blog_date: {
        type: Date,
        required: true
    },
    blog_img: {
        type: Image,
    },
});

module.exports = mongoose.model('Blog', BlogModel);