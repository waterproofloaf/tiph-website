const Blog = require('../models/BlogModel.js');
const database = require('../models/db.js');

const blogController = {
    postBlog: function(req, res){
        var today = new Date();
        
        var blog_title = req.body.blog_title;
        var blog_content = req.body.blog_content;
        var blog_date = today.getFullYear()+'/' (today.getMonth()+1)+'/'+today.getDate();
        var blog_keyword = req.body.blog_keyword;
        
        var newBlog = {
            blog_title: blog_title,
            blog_content: blog_content,
            blog_date: blog_date,
            blog_keyword: blog_keyword
        }
        
        database.insertOne(Blog, newBlog, function(f){
            if(f){
                console.log('Blog Added: ' + blog_title);
                res.redirect('/cms-blog');
            }
        });
    },
    
    deleteBlog: function(req, res){
        var query = req.body.blog_title;
        database.deleteOne(query, function(err, obj){
            if(err) throw err;
            console.log('Blog Deleted: ' + query);
            res.redirect('/cms-blog');
        });
    }
}

module.exports = blogController;