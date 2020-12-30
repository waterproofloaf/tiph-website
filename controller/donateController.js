const Donate = require('../models/DonateModel.js');
const DonateMode = require('../models/DonateModeModel.js');
const database = require('../models/db.js');
const { ObjectID } = require('mongodb');
const { validationResult } = require('express-validator');

// URL of MongoDB database
const url = "mongodb://localhost:27017/tiph";

const donateController = {
    postDonate: function (req, res) {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            errors = errors.errors;
            database.findMany(DonateMode, {}, {}, function (donate) {
                res.render('cms-donation-new-option', {
                    layout: '/layouts/cms-layout',
                    title: 'CMS Add Donation Option | The Initiative PH',
                    donate_active: true,
                    donatelist_active: true,
                    name: req.session.name,
                    type: req.session.type,
                    userid: req.session.userid,
                    donateErrorMessage: errors[0].msg,
                    donate: donate,
                })
            });

            return;
        }

        var donate_type = req.body.donate_type;
        var donate_name = req.body.donate_name;
        var donate_number = req.body.donate_number;
        var donate_visible = true;

        var donate_details = {
            donate_type: donate_type,
            donate_name: donate_name,
            donate_number: donate_number,
            donate_visible: donate_visible
        }

        database.insertOne(Donate, donate_details, function (flag) {
            if (flag) {
                console.log("1 document added");
                res.redirect('/cms-donate');
            }
        });
    },

    deleteDonate: function (req, res) {
        var donate_id = req.query.id;
        var donate_details = {
            _id: ObjectID(donate_id)
        }

        database.deleteOne(Donate, donate_details);
        res.redirect('/cms-donate');
    },

    editDonate: function (req, res) {
        let errors = validationResult(req);

        if (!errors.isEmpty()) {
            errors = errors.errors;
            var donate_type = req.query.type;
            var donate_name = req.query.name;
            var donate_number = req.query.num;
            var donate_id = req.query.id;
            database.findMany(DonateMode, {}, {}, function (donate) {
                res.render('cms-edit-donation', {
                    layout: '/layouts/cms-layout',
                    title: 'CMS Edit Donation Option | The Initiative PH',
                    donate_type: donate_type,
                    donate_name: donate_name,
                    donate_number: donate_number,
                    donate_id: donate_id,
                    donate_active: true,
                    donatelist_active: true,
                    name: req.session.name,
                    type: req.session.type,
                    userid: req.session.userid,
                    donateErrorMessage: errors[0].msg,
                    donate: donate,
                })
            });

            return;
        }

        var donate_type = req.body.donate_type;
        var donate_name = req.body.donate_name;
        var donate_number = req.body.donate_number;
        var donate_id = req.query.id;

        var filter = {
            _id: ObjectID(donate_id)
        }

        var donate_details = {
            donate_type: donate_type,
            donate_name: donate_name,
            donate_number: donate_number
        }

        database.updateOne(Donate, filter, donate_details);
        res.redirect('/cms-donate');
    },

    donateToggle: function (req, res) {
        var donate_id = req.query.id;
        var donate_visible = req.query.visible;

        var filter = {
            _id: ObjectID(donate_id)
        }

        var donate_details = {
            donate_visible: donate_visible
        }

        database.updateOne(Donate, filter, donate_details);
        res.redirect('/cms-donate');
    },
}

module.exports = donateController;

// exports.getAllDonate = function(req, res){
//    donateModel.getAll(function(result){
//        res.render('donate', {title: 'Donate', donate})
//    });
//};