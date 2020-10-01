const DonateMode = require('../models/DonateModeModel.js');
const database = require('../models/db.js');
const { ObjectID } = require('mongodb');
// const { validationResult } = require('express-validator');

// URL of MongoDB database
const url = "mongodb://localhost:27017/tiph";

const donatemodeController = {
    postDonate: function (req, res) {

        // let errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //     errors = errors.errors;
        //     res.render('cms-donation-new-option', {
        //         layout: '/layouts/cms-layout',
        //         title: 'CMS Add Donation Option | The Initiative PH',
        //         donate_active: true,
        //         name: req.session.name,
        //         type: req.session.type,
        //         userid: req.session.userid,
        //         donateErrorMessage: errors[0].msg,
        //     })

        //     return;
        // }

        var donatemode_id = req.body._id;
        var donatemode_name = req.body.donatemode_name;
        var donatemode_color = req.body.donatemode_color;
        var donatemode_visible = true;

        var donate_details = {
            _id: ObjectID(donatemode_id),
            donatemode_name: donatemode_name,
            donatemode_color: donatemode_color,
            donatemode_visible: donatemode_visible
        }

        database.insertOne(DonateMode, donate_details, function (flag) {
            if (flag) {
                console.log("1 document added");
                res.redirect('/cms-donate-mode');
            }
        });
    },

    deleteDonate: function (req, res) {
        var donate_id = req.query.id;
        var donate_details = {
            _id: ObjectID(donate_id)
        }

        database.deleteOne(DonateMode, donate_details);
        res.redirect('/cms-donate-mode');
    },

    editDonate: function (req, res) {
        // let errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //     errors = errors.errors;
        //     var donate_type = req.query.type;
        //     var donate_name = req.query.name;
        //     var donate_number = req.query.num;
        //     var donate_id = req.query.id;

        //     res.render('cms-edit-donation', {
        //         layout: '/layouts/cms-layout',
        //         title: 'CMS Edit Donation Option | The Initiative PH',
        //         donate_type: donate_type,
        //         donate_name: donate_name,
        //         donate_number: donate_number,
        //         donate_id: donate_id,
        //         donate_active: true,
        //         name: req.session.name,
        //         type: req.session.type,
        //         userid: req.session.userid,
        //         donateErrorMessage: errors[0].msg,
        //     })

        //     return;
        // }

        var donatemode_name = req.body.donatemode_name;
        var donatemode_color = req.body.donatemode_color;
        var donatemode_id = req.query.id;

        var filter = {
            _id: ObjectID(donatemode_id)
        }

        var donate_details = {
            donatemode_name: donatemode_name,
            donatemode_color: donatemode_color,
        }

        database.updateOne(DonateMode, filter, donate_details);
        res.redirect('/cms-donate-mode');
    },

    donateToggle: function (req, res) {
        var donate_id = req.query.id;
        var donatemode_visible = req.query.visible;

        var filter = {
            _id: ObjectID(donate_id)
        }

        var donate_details = {
            donatemode_visible: donatemode_visible
        }

        database.updateOne(DonateMode, filter, donate_details);
        res.redirect('/cms-donate-mode');
    },
}

module.exports = donatemodeController;

// exports.getAllDonate = function(req, res){
//    donateModel.getAll(function(result){
//        res.render('donate', {title: 'Donate', donate})
//    });
//};