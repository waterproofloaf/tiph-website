var mongoose = require('mongoose');

var PositionModel = new mongoose.Schema({
    position_name: {
        type: String,
        required: true
    },
    
    position_available: {
        type: Boolean,
        required: true
    }
})


module.exports = mongoose.model('Position', PositionModel);