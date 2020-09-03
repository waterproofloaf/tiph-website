var mongoose = require('mongoose');

var PreAppFormModel = new mongoose.Schema({
    preform_year: {
        type: Number,
        required: true,
    },
    preform_desc: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('PreAppForm', PreAppFormModel);