var mongoose = require('mongoose');

var HomeModel = new mongoose.Schema({
    home_title: {
        type: String,
        required: true
    },
    home_subtitle: {
        type: String,
        required: true
    },
    home_one_title: {
        type: String,
        required: true
    },
    home_one_content: {
        type: String,
        required: true
    },
    home_two_title: {
        type: String,
        required: true
    },
    home_two_content: {
        type: String,
        required: true
    },
    home_three_title: {
        type: String,
        required: true
    },
    home_three_content: {
        type: String,
        required: true
    },
    home_four_title: {
        type: String,
        required: true
    },
    home_four_content: {
        type: String,
        required: true
    },
    home_preapp_button: {
        type: Boolean,
        required: true
    },
    home_app_button: {
        type: Boolean,
        required: true
    },
});

module.exports = mongoose.model('Home', HomeModel);