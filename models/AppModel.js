var mongoose = require('mongoose');

var AppModel = new mongoose.Schema({
    app_firstname: {
        type: String,
        required: true,
    },
    app_lastname: {
        type: String,
        required: true,
    },
    app_nickname: {
        type: String,
        required: true,
    },
    app_email: {
        type: String,
        required: true,
    },
    app_bday: {
        type: String,
        required: true
    },
    app_cResidence: {
        type: String,
        required: true,
    },
    app_schoolcompany: {
        type: String,
        required: true,
    },
    app_number: {
        type: String,
        required: true,
    },
    app_facebook: {
        type: String,
        required: true,
    },
    app_twitter: {
        type: String,
    },
    app_findout: {
        type: String,
        required: true,
    },
    app_expertise: {
        type: String,
        required: true,
    },
    app_dept1: {
        type: String,
        required: true,
    },
    app_position1:{
        type: String,
        required: true,
    },
    app_dept2: {
        type: String,
        required: true,
    },
    app_position2:{
        type: String,
        required: true,
    },
    app_reason: {
        type: String,
        required: true,
    },
    app_portfolio: {
        type: String,
    },
    app_status: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('App', AppModel);

exports.getAll = function (next) {
    App.find({}).sort({}).exec(function (err, result) {
        if (err) throw err;
        var AppObjects = [];

        result.forEach(function (doc) {
            AppObjects.push(doc.toObject());
        });
        next(AppObjects);
    })
}