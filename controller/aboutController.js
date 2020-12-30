const About = require('../models/AboutModel.js');
const database = require('../models/db.js');
const { ObjectID } = require('mongodb');
const { validationResult } = require('express-validator');

const aboutController = {
    editAbout: function (req, res) {
        let errors = validationResult(req);

        if (!errors.isEmpty()) {
            errors = errors.errors;
            database.findOne(About, {}, {}, function (aboutContent) {
                res.render('cms-about', {
                    layout: '/layouts/cms-layout',
                    title: 'CMS About Page | The Initiative PH',
                    about_active: true,
                    name: req.session.name,
                    type: req.session.type,
                    userid: req.session.userid,
                    about_content: aboutContent,
                    aboutErrorMessage: errors[0].msg,
                })
            });

            return;
        }

        var about_title = req.body.about_title;
        var about_description = req.body.about_description;

        var about_details = {
            about_title: about_title,
            about_description: about_description,
        }

        database.updateOne(About, {}, about_details);
        res.redirect('/cms-about');
    },
}

module.exports = aboutController;