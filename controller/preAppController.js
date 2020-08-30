const PreApp = require('../models/PreAppModel.js');
const database = require('../models/db.js');

const preAppController = {
    postPreApp: function (req, res) {
        var pre_firstname = req.body.pre_firstname;
        var pre_lastname = req.body.pre_lastname;
        var pre_age = req.body.pre_age;
        var pre_number = req.body.pre_number;
        var pre_email = req.body.pre_email;
        var pre_schoolcompany = req.body.pre_schoolcompany;
        var pre_affiliation = req.body.pre_affiliation;
        var pre_facebook = req.body.pre_facebook;
        var pre_notify = req.body.pre_notify;
        var pre_comments = req.body.pre_comments;

        var newPreApp = {
            pre_firstname: pre_firstname,
            pre_lastname: pre_lastname,
            pre_age: pre_age,
            pre_number: pre_number,
            pre_email: pre_email,
            pre_schoolcompany: pre_schoolcompany,
            pre_affiliation: pre_affiliation,
            pre_facebook: pre_facebook,
            pre_notify: pre_notify,
            pre_comments: pre_comments
        }

        database.insertOne(PreApp, newPreApp, function (f) {
            if (f) {
                console.log('Pre Application Added: ' + pre_firstname + " " + pre_lastname);
                res.redirect('/pre-application');
            }
        });
    },

    findPreApp: function (req, res) {
        
    },

    deletePreApp: function (req, res) {
        
    }
}

module.exports = preAppController;