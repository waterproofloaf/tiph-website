var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    userDepartment: {
        type: String,
        required: true,
    },
    userType: {
        type: Boolean,
        required: true,
    }
});

module.exports = mongoose.model('User', UserSchema);