const Department = require('../models/DepartmentModel.js');
const database = require('../models/db.js');
const { ObjectID } = require('mongodb');

const departmentController = {
    newDepartment: function (req, res) {
        var department_title = req.body.department_title;
        var department_description = req.body.department_description;
        var department_category = req.body.department_category;
        var department_contact = req.body.department_contact;

        var newDept = {
            department_title: department_title,
            department_description: department_description,
            department_category: department_category,
            department_contact: department_contact,
        }

        database.insertOne(Department, newDept, function (f) {
            if (f) {
                console.log('Department Added: ' + department_title);
                res.redirect('/cms-department');
            }
        });
    },

    deleteDepartment: function (req, res) {
        var department_id = req.query.id;
        var department_details = {
            _id: ObjectID(department_id)
        }

        database.deleteOne(Department, department_details);
        res.redirect('/cms-department');
    },

    editDepartment: function (req, res) {
        var department_title = req.body.department_title;
        var department_description = req.body.department_description;
        var department_category = req.body.department_category;
        var department_contact = req.body.department_contact;
        var department_id = req.query.id;

        var filter = {
            _id: ObjectID(department_id)
        }

        var department_details = {
            department_title: department_title,
            department_description: department_description,
            department_category: department_category,
            department_contact: department_contact,
        }

        database.updateOne(Department, filter, department_details);
        res.redirect('/cms-department');
    },
}

module.exports = departmentController;