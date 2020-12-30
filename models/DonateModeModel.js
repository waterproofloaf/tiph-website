var mongoose = require('mongoose');

var DonateModeModel = new mongoose.Schema({
    donatemode_name: {
        type: String,
        required: true
    },
    donatemode_color: {
        type: String,
        required: true
    },
    donatemode_visible: {
        type: Boolean,
        required: true
    },
});

module.exports = mongoose.model('DonateMode', DonateModeModel);