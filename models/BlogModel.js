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
        //required: true -- commented out, to be fixed
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
    blog_hide: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('Blog', BlogModel);

exports.getAll = function (next) {
    BlogModel.find({}).sort({}).exec(function (err, result) {
        if (err) throw err;
        var blogObjects = [];

        result.forEach(function (doc) {
            blogObjects.push(doc.toObject());
        });
        next(blogObjects);
    })
}