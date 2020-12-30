const Department = require('../models/DepartmentModel.js');
const Position = require('../models/PositionModel.js');
const database = require('../models/db.js');
const { ObjectID } = require('mongodb');
const { validationResult } = require('express-validator');

const departmentController = {
    newDepartment: function (req, res) {
        let errors = validationResult(req);

        if (!errors.isEmpty()) {
            errors = errors.errors;
            res.render('cms-department-new', {
                layout: '/layouts/cms-layout',
                title: 'CMS New Department | The Initiative PH',
                department_active: true,
                name: req.session.name,
                type: req.session.type,
                userid: req.session.userid,
                departmentErrorMessage: errors[0].msg,
            })

            return;
        }

        var department_title = req.body.department_title;
        var department_description = req.body.department_description;
        var department_category = req.body.department_category;
        var department_contact = req.body.department_contact;

        var newDept = {
            department_title: department_title,
            department_description: department_description,
            department_category: department_category,
            department_contact: department_contact,
            department_available: true,
        }

        database.insertOne(Department, newDept, function (f) {
            if (f) {
                console.log('Department Added: ' + department_title);
                res.redirect('/cms-department');
            }
        });

        Position.distinct('position_name')
        .then(docs => {
            docs.forEach(
                element => 
                    database.insertOne(Position, {position_name: element, dept_name: department_title, position_available: true}, function (f) {})
            )
        })
    },

    deleteDepartment: function (req, res) {
        var department_id = req.query.id;
        var department_details = {
            _id: ObjectID(department_id)
        }

        database.findOne(Department, department_details, {}, function (dept) {
            database.deleteMany(Position, {dept_name: dept.department_title}, function(){});
        })

        database.deleteOne(Department, department_details);
        res.redirect('/cms-department');
    },

    editDepartment: function (req, res) {
        let errors = validationResult(req);

        if (!errors.isEmpty()) {
            errors = errors.errors;
            var query = req.query.id;
            database.findOne(Department, { _id: query }, {}, function (departmentContent) {
                res.render('cms-department-edit', {
                    layout: '/layouts/cms-layout',
                    title: 'CMS Edit Department | The Initiative PH',
                    department_active: true,
                    name: req.session.name,
                    type: req.session.type,
                    userid: req.session.userid,
                    department_content: departmentContent,
                    departmentErrorMessage: errors[0].msg,
                });
            });

            return;
        }

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

    departmentToggle: function (req, res) {
        var department_id = req.query.id;
        var department_available = req.query.available;

        var filter = {
            _id: ObjectID(department_id)
        }

        var department_details = {
            department_available: department_available
        }

        database.updateOne(Department, filter, department_details);
        // res.redirect('/cms-donate');
    },
}

module.exports = departmentController;