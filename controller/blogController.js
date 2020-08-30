const Blog = require('../models/BlogModel.js');
const database = require('../models/db.js');

const blogController = {
    postBlog: function (req, res) {
        var today = new Date();

        var blog_title = req.body.blog_title;
        var blog_author = req.body.blog_author;
        var blog_content = req.body.blog_content;
        var blog_date = today.getMonth() + "/" + today.getDate() + "/" + today.getFullYear();
        var blog_keywords = req.body.blog_keywords;
        var blog_hide = false;

        var newBlog = {
            blog_title: blog_title,
            blog_author: blog_author,
            blog_content: blog_content,
            blog_date: blog_date,
            blog_keywords: blog_keywords,
            blog_hide: blog_hide
        }

        database.insertOne(Blog, newBlog, function (f) {
            if (f) {
                console.log('Blog Added: ' + blog_title);
                res.redirect('/cms-blog');
            }
        });
    },

    findBlog: function (req, res) {
        var query = req.body.blog_title;
        database.find({ blog_title: query }, function (err, obj) {
            if (err) throw err;
            console.log('Viewing: ' + query);
            res.redirect('/a-blog');
        });
    },

    deleteBlog: function (req, res) {
        var query = req.body.blog_title;
        database.deleteOne(query, function (err, obj) {
            if (err) throw err;
            console.log('Blog Deleted: ' + query);
            res.redirect('/cms-blog');
        });
    }
}

module.exports = blogController;