const PreAppForm = require('../models/PreAppFormModel.js');
const database = require('../models/db.js');
const { ObjectID } = require('mongodb');

const preappformController = {
    editPreAppForm: function (req, res) {
        var preappform_id = req.query.id;
        var preform_year = req.body.cms_pre_apps_date;
        var preform_desc = req.body.cms_pre_apps_content;

        var filter = {
            _id: ObjectID(preappform_id)
        }

        var preappform_details = {
            preform_year: preform_year,
            preform_desc: preform_desc,
        }

        database.updateOne(PreAppForm, filter, preappform_details);
        res.redirect('/cms-application');
    },
}

module.exports = preappformController;