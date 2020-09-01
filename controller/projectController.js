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

    findProject: function (req, res) {
        var query = req.query.id;
        database.findOne(Project, { _id: query }, {}, function (proj) {
            res.render('a-project', {
                layout: '/layouts/main',
                title: proj.proj_title + ' | The Initiative PH',
                proj_title: proj.proj_title,
                proj_status: proj.proj_status,
                proj_date: proj.proj_date,
                proj_content: proj.proj_content,
                proj_keywords: proj.proj_keywords,
                proj_active: true,
            });
        });
    },

    deleteProject: function (req, res) {
        var proj_id = req.query.id;
        var proj_details = {
            _id: ObjectID(proj_id)
        }

        database.deleteOne(Project, proj_details);
        res.redirect('/cms-project');
    },

    editProject: function (req, res) {
        var proj_title = req.body.proj_title;
        var proj_date = req.body.proj_date;
        var proj_content = req.body.proj_content;
        var proj_preview = req.body.proj_preview;
        var proj_status = req.body.proj_status;
        var proj_keywords = req.body.proj_keywords;
        var proj_id = req.query.id;

        var filter = {
            _id: ObjectID(proj_id)
        }

        var proj_details = {
            proj_title: proj_title,
            proj_date: proj_date,
            proj_content: proj_content,
            proj_preview: proj_preview,
            proj_status: proj_status,
            proj_keywords: proj_keywords,
        }

        database.updateOne(Project, filter, proj_details);
        res.redirect('/cms-project');
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