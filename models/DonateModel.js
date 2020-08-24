var mongoose = require('mongoose');

var DonateSchema = new mongoose.Schema({
    account_type: {
        type: String,
        required: true
    },
    account_name: {
        type: String,
        required: true
    },
    account_number: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Donate', DonateModel);