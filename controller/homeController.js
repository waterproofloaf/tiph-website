const Home = require('../models/HomeModel.js');
const database = require('../models/db.js');
const { ObjectID } = require('mongodb');

const homeController = {
    editHome: function (req, res) {
        var home_title = req.body.home_title;
        var home_subtitle = req.body.home_subtitle;
        var home_one_title = req.body.home_one_title;
        var home_one_content = req.body.home_one_content;
        var home_two_title = req.body.home_two_title;
        var home_two_content = req.body.home_two_content;
        var home_three_title = req.body.home_three_title;
        var home_three_content = req.body.home_three_content;
        var home_four_title = req.body.home_four_title;
        var home_four_content = req.body.home_four_content;
        var home_preapp_button = req.body.home_preapp_button_val;
        var home_app_button = req.body.home_app_button_val;

        var home_details = {
            home_title: home_title,
            home_subtitle: home_subtitle,
            home_one_title: home_one_title,
            home_one_content: home_one_content,
            home_two_title: home_two_title,
            home_two_content: home_two_content,
            home_three_title: home_three_title,
            home_three_content: home_three_content,
            home_four_title: home_four_title,
            home_four_content: home_four_content,
            home_preapp_button: home_preapp_button,
            home_app_button: home_app_button,
        }

        database.updateOne(Home, {}, home_details);
        res.redirect('/cms-home');
    },

    homeToggle: function (req, res) {
        var home_id = req.query.id;
        var preapp_visible = req.query.preapp;
        var app_visible = req.query.app;

        var filter = {
            _id: ObjectID(home_id)
        }

        var home_details = {
            home_preapp_button: preapp_visible,
            home_app_button: app_visible,
        }

        database.updateOne(Home, filter, home_details);
        res.redirect('/cms-home');
    }
}

module.exports = homeController;