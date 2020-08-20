const blogModel = require('../models/BlogModel.js');
const database = require('../models/db.js');

exports.createBlog = function(req, res){
    const blog_title = req.body.blog_title,
          blog_content = req.body.blog_content;
    
    blogModel.create(blog_title, blog_content, function(result){
       res.send(result); 
    });
};

exports.getAllBlogs = function(req, res){
    blogModel.getAll(function(result){
        res.render('blogs', {title: 'Blogs', blog})
    });
};