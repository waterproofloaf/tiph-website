const Blog = require('../models/BlogModel.js');
const database = require('../models/db.js');
const { ObjectID } = require('mongodb');

const blogController = {
    postBlog: function (req, res) {
        var today = new Date();

        var blog_title = req.body.blog_title;
        var blog_author = req.body.blog_author;
        var blog_content = req.body.blog_content;
        var blog_date = today.getMonth() + "/" + today.getDate() + "/" + today.getFullYear();
        var blog_keywords = req.body.blog_keywords;
        var blog_published = true;

        var newBlog = {
            blog_title: blog_title,
            blog_author: blog_author,
            blog_content: blog_content,
            blog_date: blog_date,
            blog_keywords: blog_keywords,
            blog_published: blog_published
        }

        database.insertOne(Blog, newBlog, function (f) {
            if (f) {
                console.log('Blog Added: ' + blog_title);
                res.redirect('/cms-blog');
            }
        });
    },

    findBlog: function (req, res) {
        var query = req.query.id;
        database.findOne(Blog, {_id: query}, {}, function(blog){
            console.log(blog.blog_title);
            res.render('a-blog', {
                layout:'/layouts/main',
                title: blog.blog_title + ' | The Initiative PH',
                blog_title: blog.blog_title,
                blog_author: blog.blog_author,
                blog_date: blog.blog_date,
                blog_content: blog.blog_content,
                blog_active: true,
            });
        });
    },

    deleteBlog: function (req, res) {
        var blog_id = req.query.id;
        var blog_details = {
            _id: ObjectID(blog_id)
        }

        database.deleteOne(Blog, blog_details);
        res.redirect('/cms-blog');
    },

    blogToggle: function (req, res) {
        var blog_id = req.query.id;
        var blog_published = req.query.publish;

        var filter = {
            _id: ObjectID(blog_id)
        }

        var blog_details = {
            blog_published: blog_published
        }

        database.updateOne(Blog, filter, blog_details);
        res.redirect('/cms-blog');
    },
}

module.exports = blogController;