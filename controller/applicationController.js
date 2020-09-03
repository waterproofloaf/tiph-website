const PreApp = require('../models/PreAppModel.js');
const database = require('../models/db.js');
const { ObjectID } = require('mongodb');

// URL of MongoDB database
const url = "mongodb://localhost:27017/tiph";

const applicationController = {

    // deleteDonate: function (req, res) {
    //     var donate_id = req.query.id;
    //     var donate_details = {
    //         _id: ObjectID(donate_id)
    //     }

    //     database.deleteOne(Donate, donate_details);
    //     res.redirect('/cms-donate');
    // },

    AcceptPreApplicant: function (req, res) {
        var pre_id = req.query.id;

        var filter = {
            _id: ObjectID(pre_id)
        }

        var pre_details = {
            pre_status: "Accepted"
        }

        database.updateOne(PreApp, filter, pre_details);
        res.redirect('/cms-applicant-pre');
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
        res.redirect('/cms-applicant-pre');
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
}

module.exports = applicationController;
