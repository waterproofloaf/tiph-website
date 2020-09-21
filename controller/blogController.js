const Blog = require('../models/BlogModel.js');
const database = require('../models/db.js');
const { ObjectID } = require('mongodb');
const { validationResult } = require('express-validator');

const blogController = {
    postBlog: function (req, res) {
        let errors = validationResult(req);

        if (!errors.isEmpty()) {
            errors = errors.errors;
            res.render('cms-blog-new-page', {
                layout: '/layouts/cms-layout',
                title: 'CMS New Blog Entry | The Initiative PH',
                blog_active: true,
                name: req.session.name,
                type: req.session.type,
                userid: req.session.userid,
                blogErrorMessage: errors[0].msg,
            })

            return;
        }

        var today = new Date();

        var blog_id = req.body._id;
        var blog_title = req.body.blog_title;
        var blog_author = req.body.blog_author;
        var blog_content = req.body.blog_content;
        var blog_date = (today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear();
        var blog_keywords = req.body.blog_keywords;
        var blog_preview = req.body.blog_preview;
        var blog_published = true;

        var newBlog = {
            _id: ObjectID(blog_id),
            blog_title: blog_title,
            blog_author: blog_author,
            blog_content: blog_content,
            blog_date: blog_date,
            blog_keywords: blog_keywords,
            blog_preview: blog_preview,
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
        database.findOne(Blog, { _id: query }, {}, function (blog) {
            console.log(blog.blog_title);

            if (blog.blog_published) {
                res.render('a-blog', {
                    layout: '/layouts/main',
                    title: blog.blog_title + ' | The Initiative PH',
                    blog_title: blog.blog_title,
                    blog_author: blog.blog_author,
                    blog_date: blog.blog_date,
                    blog_content: blog.blog_content,
                    blog_preview: blog.blog_preview,
                    blog_active: true,
                });
            }
            else {
                res.redirect('/404');
            }
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

    editBlog: function (req, res) {
        let errors = validationResult(req);

        if (!errors.isEmpty()) {
            errors = errors.errors;
            var query = req.query.id;
            database.findOne(Blog, { _id: query }, {}, function (blog) {
                res.render('cms-blog-page', {
                    layout: '/layouts/cms-layout',
                    title: 'CMS Blog Edit | The Initiative PH',
                    blog_title: blog.blog_title,
                    blog_author: blog.blog_author,
                    blog_content: blog.blog_content,
                    blog_date: blog.blog_date,
                    blog_keywords: blog.blog_keywords,
                    blog_active: true,
                    name: req.session.name,
                    type: req.session.type,
                    userid: req.session.userid,
                    blogErrorMessage: errors[0].msg,
                });
            });

            return;
        }

        var blog_title = req.body.blog_title;
        var blog_author = req.body.blog_author;
        var blog_content = req.body.blog_content;
        var blog_date = req.body.blog_date;
        var blog_preview = req.body.blog_preview;
        var blog_keywords = req.body.blog_keywords;
        var blog_id = req.query.id;

        var filter = {
            _id: ObjectID(blog_id)
        }

        var blog_details = {
            blog_title: blog_title,
            blog_author: blog_author,
            blog_content: blog_content,
            blog_preview: blog_preview,
            blog_date: blog_date,
            blog_keywords: blog_keywords,
        }

        database.updateOne(Blog, filter, blog_details);
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

    blogSort: function (req, res) {
        var blog_sort_by = req.body.blog_sort_by;
        if (blog_sort_by == 'adate') { //value="adate" Date(Latest)
            Blog.find({}).sort({ date: 1 }).toArray(function (err, result) {
                if (err) throw err;
                res.render('blog', {
                    layout: '/layouts/main',
                    title: 'Blogs | The Initiative PH',
                    blog_active: true,
                    blog_info: result,
                });
            });
        } else if (blog_sort_by == 'ddate') { //value="ddate" Date(Oldest)
            Blog.find({}).sort({ date: -1 }).toArray(function (err, result) {
                if (err) throw err;
                res.render('blog', {
                    layout: '/layouts/main',
                    title: 'Blogs | The Initiative PH',
                    blog_active: true,
                    blog_info: result,
                });
            });
        }
    }
}

module.exports = blogController;