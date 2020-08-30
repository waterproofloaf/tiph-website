var mongoose = require('mongoose');

var PreAppModel = new mongoose.Schema({
    pre_firstname: {
        type: String,
        required: true,
    },
    pre_age: {
        type: String,
        required: true,
    },
    pre_number: {
        type: String,
        required: true,
    },
    pre_email: {
        type: String,
        required: true,
    },
    pre_schoolcompany: {
        type: String,
        required: true,
    },
    pre_affiliation: {
        type: String,
        required: true,
    },
    pre_facebook: {
        type: String,
        required: true,
    },
    pre_notify: {
        type: String,
        required: true,
    },
    pre_comments: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('PreApp', PreAppModel);

exports.getAll = function (next) {
    PreApp.find({}).sort({}).exec(function (err, result) {
        if (err) throw err;
        var preAppObjects = [];

        result.forEach(function (doc) {
            preAppObjects.push(doc.toObject());
        });
        next(preAppObjects);
    })
}