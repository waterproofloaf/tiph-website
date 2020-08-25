const Project = require('../models/ProjectModel.js');
const database = require('../models/db.js');

const projectController = {
    postProject: function(req, res){
        var today = new Date();
        
        var proj_title = req.body.proj_title;
        var proj_content = req.body.proj_content;
        var proj_date = today.getFullYear()+'/' (today.getMonth()+1)+'/'+today.getDate();
        var proj_keyword = req.body.proj_keyword;
        
        var newProject = {
            proj_title: proj_title,
            proj_content: proj_content,
            proj_date: proj_date,
            proj_keyword: proj_keyword
        }
        
        database.insertOne(Project, newProject, function(f){
            if(f){
                console.log('Project Added: ' + proj_title);
                res.redirect('/cms-project');
            }
        });
    },
    
    deleteProject: function(req, res){
        var query = req.body.proj_title;
        database.deleteOne(query, function(err, obj){
            if(err) throw err;
            console.log('Project Deleted: ' + query);
            res.redirect('/cms-project');        
        });
    }
}

module.exports = projectController;