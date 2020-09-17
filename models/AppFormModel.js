var mongoose = require('mongoose');

var AppFormModel = new mongoose.Schema({
    appform_year: {
        type: Number,
        required: true,
    },
    appform_desc: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('AppForm', AppFormModel);