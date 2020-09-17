const AppForm = require('../models/AppFormModel.js');
const database = require('../models/db.js');
const { ObjectID } = require('mongodb');

const appformController = {
    editAppForm: function (req, res) {
        var appform_id = req.query.id;
        var appform_year = req.body.cms_apps_date;
        var appform_desc = req.body.cms_apps_content;

        var filter = {
            _id: ObjectID(appform_id)
        }

        var appform_details = {
            appform_year: appform_year,
            appform_desc: appform_desc,
        }

        database.updateOne(AppForm, filter, appform_details);
        res.redirect('/cms-application');
    },
}

module.exports = appformController;