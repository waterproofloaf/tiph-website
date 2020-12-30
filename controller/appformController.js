const AppForm = require('../models/AppFormModel.js');
const Position = require('../models/PositionModel.js');
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

    listPositions: function (req, res){
        var dept_name = req.query.dept_name;

        database.findMany(Position, {dept_name: dept_name}, {}, function(positions) {
            res.send(positions);
        })
    }
}

module.exports = appformController;