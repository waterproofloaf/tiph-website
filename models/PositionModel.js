const { ObjectID } = require('mongodb');
var mongoose = require('mongoose');

var PositionModel = new mongoose.Schema({
    dept_name: {
        type: String,
        required: true,
    },
    position_name: {
        type: String,
        required: true,
    },
    position_available: {
        type: Boolean,
    },
});

module.exports = mongoose.model('Position', PositionModel);