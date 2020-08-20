const projectModel = require('../models/ProjectModel.js');
const database = require('../models/db.js');

exports.createBlog = function(req, res){
    const proj_title = req.body.proj_title,
          proj_content = req.body.proj_content;
    
    projectModel.create(proj_title, proj_content, function(result){
       res.send(result); 
    });
}