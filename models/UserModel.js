var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        enum: ['PRIMARY_ADMIN', 'SUB_ADMIN']
    }
});

module.exports = mongoose.model('User', UserSchema);