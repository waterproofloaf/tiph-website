const PreApp = require('../models/PreAppModel.js');
const App = require('../models/AppModel.js');
const database = require('../models/db.js');
const { ObjectID } = require('mongodb');
const { validationResult } = require('express-validator');

// URL of MongoDB database
const url = "mongodb://localhost:27017/tiph";

const applicationController = {

    deletePreApplicant: function (req, res) {
        var preprof_id = req.query.id;
        var preprof_details = {
            _id: ObjectID(preprof_id)
        }

        database.deleteOne(PreApp, preprof_details);
        res.redirect('/cms-applicant-pre');
    },

    EditPreApplicant: function (req, res) {
        let errors = validationResult(req);

        if (!errors.isEmpty()) {
            errors = errors.errors;
            var query = req.query.id;
            database.findOne(PreApp, { _id: query }, {}, function (prof) {
                res.render('cms-pre-app-profile', {
                    layout: '/layouts/cms-layout',
                    title: prof.pre_firstname + ' ' + prof.pre_lastname + ' | The Initiative PH',
                    pre_id: prof._id,
                    pre_firstname: prof.pre_firstname,
                    pre_lastname: prof.pre_lastname,
                    pre_age: prof.pre_age,
                    pre_number: prof.pre_number,
                    pre_email: prof.pre_email,
                    pre_schoolcompany: prof.pre_schoolcompany,
                    pre_affiliation: prof.pre_affiliation,
                    pre_facebook: prof.pre_facebook,
                    pre_notify: prof.pre_notify,
                    pre_comments: prof.pre_comments,
                    pre_status: prof.pre_status,
                    pre_status_reason: prof.pre_status_reason,
                    applicant_active: true,
                    pre_app_active: true,
                    name: req.session.name,
                    type: req.session.type,
                    userid: req.session.userid,
                    applicantErrorMessage: errors[0].msg,
                });
            });

            return;
        }

        var pre_id = req.query.id;
        var change_status = req.body.pre_status;
        var change_status_reason = req.body.pre_status_reason;

        var filter = {
            _id: ObjectID(pre_id)
        }

        if (change_status == "Pending"){
            var status = "Pending"
        }
        else if (change_status == "Accepted"){
            var status = "Accepted"
        }
        else if (change_status == "Rejected"){
            var status = "Rejected"
        }

        var pre_details = {
            pre_status: status,
            pre_status_reason: change_status_reason
        }

        database.updateOne(PreApp, filter, pre_details);

        res.redirect('/cms-applicant-pre');
    },

    deleteAppApplicant: function (req, res) {
        var appprof_id = req.query.id;
        var appprof_details = {
            _id: ObjectID(appprof_id)
        }

        database.deleteOne(App, appprof_details);
        res.redirect('/cms-applicant-app');
    },

    EditAppApplicant: function (req, res) {
        let errors = validationResult(req);

        if (!errors.isEmpty()) {
            errors = errors.errors;
            var query = req.query.id;
            database.findOne(App, { _id: query }, {}, function (prof) {
                res.render('cms-app-profile', {
                    layout: '/layouts/cms-layout',
                    title: prof.app_firstname + ' ' + prof.app_lastname + ' | The Initiative PH',
                    app_id: prof._id,
                    app_firstname: prof.app_firstname,
                    app_lastname: prof.app_lastname,
                    app_nickname: prof.app_nickname,
                    app_email: prof.app_email,
                    app_bday: prof.app_bday,
                    app_cResidence: prof.app_cResidence,
                    app_schoolcompany: prof.app_schoolcompany,
                    app_number: prof.app_number,
                    app_facebook: prof.app_facebook,
                    app_twitter: prof.app_twitter,
                    app_findout: prof.app_findout,
                    app_expertise: prof.app_expertise,
                    app_dept1: prof.app_dept1,
                    app_position1: prof.app_position1,
                    app_dept2: prof.app_dept2,
                    app_position2: prof.app_position2,
                    app_reason: prof.app_reason,
                    app_portfolio: prof.app_portfolio,
                    app_status: prof.app_status,
                    app_status_reason: prof.app_status_reason,
                    applicant_active: true,
                    app_active: true, 
                    name: req.session.name,
                    type: req.session.type,
                    userid: req.session.userid,
                    applicantErrorMessage: errors[0].msg,
                });
            });

            return;
        }

        var app_id = req.query.id;
        var change_status = req.body.app_status;
        var change_status_reason = req.body.app_status_reason;

        var filter = {
            _id: ObjectID(app_id)
        }

        if (change_status == "Pending"){
            var status = "Pending"
        }
        else if (change_status == "Accepted"){
            var status = "Accepted"
        }
        else if (change_status == "Rejected"){
            var status = "Rejected"
        }

        var app_details = {
            app_status: status,
            app_status_reason: change_status_reason
        }

        database.updateOne(App, filter, app_details);
        res.redirect('/cms-applicant-app');
    },
}

module.exports = applicationController;
