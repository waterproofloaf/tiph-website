const PreApp = require('../models/PreAppModel.js');
const App = require('../models/AppModel.js');
const database = require('../models/db.js');
const { ObjectID } = require('mongodb');

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
