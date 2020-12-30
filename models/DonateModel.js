var mongoose = require('mongoose');

var DonateModel = new mongoose.Schema({
    donate_type: {
        type: String,
        required: true
    },
    donate_name: {
        type: String,
        required: true
    },
    donate_number: {
        type: Number,
        required: true
    },
    donate_visible: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('Donate', DonateModel);