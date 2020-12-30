const Department = require('../models/DepartmentModel.js');
const Position = require('../models/PositionModel.js');
const database = require('../models/db.js');
const { ObjectID } = require('mongodb');
const { validationResult } = require('express-validator');

const positionController = {
    newPosition: function (req, res) {
        let errors = validationResult(req);

        if (!errors.isEmpty()) {
            errors = errors.errors;
            res.render('cms-position-new', {
                layout: '/layouts/cms-layout',
                title: 'Add New Position | The Initiative PH',
                application_active: true,
                positions_active: true,
                name: req.session.name,
                type: req.session.type,
                userid: req.session.userid,
                positionErrorMessage: errors[0].msg,
            })

            return;
        }

        var position_name = req.body.position_name;

        Department.distinct('department_title')
        .then(docs => {
            docs.forEach(
                element => 
                    database.insertOne(Position, {position_name: position_name, dept_name: element, position_available: true}, function (f) {
                        if (f) {
                            console.log('Position Added: ' + position_name);
                        }
                    })
            )
            res.redirect('/cms-positions');
        })
    },

    deletePosition: function (req, res) {
        var pos_name = req.query.name;
        var pos_details = {
            position_name: pos_name
        }

        database.deleteMany(Position, pos_details, function(){});

        res.redirect('/cms-positions');
    },

    positionToggle: function (req, res) {
        var position_id = req.query.id;
        var position_available = req.query.available;

        var filter = {
            _id: ObjectID(position_id)
        }

        var position_details = {
            position_available: position_available
        }

        database.updateOne(Position, filter, position_details);
        // res.redirect('/cms-donate');
    },
}

module.exports = positionController;