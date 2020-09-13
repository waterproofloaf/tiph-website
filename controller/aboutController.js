const About = require('../models/AboutModel.js');
const database = require('../models/db.js');
const { ObjectID } = require('mongodb');

const aboutController = {
    editAbout: function (req, res) {
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