var mongoose = require('mongoose');

var DepartmentModel = new mongoose.Schema({
    department_title: {
        type: String,
        required: true
    },
    department_description: {
        type: String,
        required: true
    },
    department_category: {
        type: String,
        required: true
    },
    department_contact: {
        type: String,
        required: true
    },
    department_available: {
        type: Boolean,
    },
});

module.exports = mongoose.model('Department', DepartmentModel);