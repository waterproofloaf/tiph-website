const Project = require('../models/ProjectModel.js');
const database = require('../models/db.js');
const { ObjectID } = require('mongodb');

const projectController = {
    postProject: function (req, res) {
        var today = new Date();

        var proj_title = req.body.proj_title;
        var proj_content = req.body.proj_content;
        var proj_date = today.getMonth() + "/" + today.getDate() + "/" + today.getFullYear();
        var proj_keywords = req.body.proj_keywords;
        var proj_preview = req.body.proj_preview;
        var proj_status = req.body.proj_status;
        var proj_published = true;

        var newProject = {
            proj_title: proj_title,
            proj_content: proj_content,
            proj_date: proj_date,
            proj_keywords: proj_keywords,
            proj_preview: proj_preview,
            proj_status: proj_status,
            proj_published: proj_published
        }

        database.insertOne(Project, newProject, function (f) {
            if (f) {
                console.log('Project Added: ' + proj_title);
                res.redirect('/cms-project');
            }
        });
    },

    deleteProject: function (req, res) {
        var query = req.body.proj_title;
        database.deleteOne(query, function (err, obj) {
            if (err) throw err;
            console.log('Project Deleted: ' + query);
            res.redirect('/cms-project');
        });
    },

    projToggle: function (req, res) {
        var proj_id = req.query.id;
        var proj_published = req.query.publish;

        var filter = {
            _id: ObjectID(proj_id)
        }

        var proj_details = {
            proj_published: proj_published
        }

        database.updateOne(Project, filter, proj_details);
        res.redirect('/cms-project');
    },
}

module.exports = projectController;