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

    AcceptPreApplicant: function (req, res) {
        var pre_id = req.query.id;

        var filter = {
            _id: ObjectID(pre_id)
        }

        var pre_details = {
            pre_status: "Accepted"
        }

        database.updateOne(PreApp, filter, pre_details);
        res.redirect('/cms-applicant-pre-pending');
    },

    RejectPreApplicant: function (req, res) {
        var pre_id = req.query.id;

        var filter = {
            _id: ObjectID(pre_id)
        }

        var pre_details = {
            pre_status: "Rejected"
        }

        database.updateOne(PreApp, filter, pre_details);
        res.redirect('/cms-applicant-pre-pending');
    },

    PendingPreApplicant: function (req, res) {
        var pre_id = req.query.id;

        var filter = {
            _id: ObjectID(pre_id)
        }

        var pre_details = {
            pre_status: "Pending"
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

    AcceptAppApplicant: function (req, res) {
        var app_id = req.query.id;

        var filter = {
            _id: ObjectID(app_id)
        }

        var app_details = {
            app_status: "Accepted"
        }

        database.updateOne(App, filter, app_details);
        res.redirect('/cms-applicant-app-pending');
    },

    RejectAppApplicant: function (req, res) {
        var app_id = req.query.id;

        var filter = {
            _id: ObjectID(app_id)
        }

        var app_details = {
            app_status: "Rejected"
        }

        database.updateOne(App, filter, app_details);
        res.redirect('/cms-applicant-app-pending');
    },

    PendingAppApplicant: function (req, res) {
        var app_id = req.query.id;

        var filter = {
            _id: ObjectID(app_id)
        }

        var app_details = {
            app_status: "Pending"
        }

        database.updateOne(App, filter, app_details);
        res.redirect('/cms-applicant-app');
    },
}

module.exports = applicationController;
