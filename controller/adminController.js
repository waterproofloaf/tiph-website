const User = require('../models/UserModel.js');
const database = require('../models/db.js');
const bcrypt = require('bcrypt');
const { ObjectID } = require('mongodb');

// URL of MongoDB database
const url = "mongodb://localhost:27017/tiph";

const adminController = {
    postAdmin: function (req, res) {
        var admin_name = `${req.body.admin_name}`;
        var admin_username = `${req.body.admin_username}`;
        var admin_password = `${req.body.admin_password}`;
        var admin_dept = `${req.body.admin_dept}`;
        var admin_userType = `${req.body.is_main}`;

        if (admin_userType == 'No'){
            admin_userType = false;
        }
        else{
            admin_userType = true;
        }

        bcrypt.hash(admin_password, 10, function(err, hash){
            let admin_details = {
                name: admin_name,
                username: admin_username,
                password: hash,
                userDepartment: admin_dept,
                userType: admin_userType
            }
        
            database.insertOne(User, admin_details, (result) => {
                console.log(result);
                res.redirect('/cms-admin');
            });
        })
    },

    // deleteDonate: function (req, res) {
    //     var donate_id = req.query.id;
    //     var donate_details = {
    //         _id: ObjectID(donate_id)
    //     }

    //     database.deleteOne(Donate, donate_details);
    //     res.redirect('/cms-donate');
    // },

    // editDonate: function (req, res) {
    //     var donate_type = req.body.donate_type;
    //     var donate_name = req.body.donate_name;
    //     var donate_number = req.body.donate_number;
    //     var donate_id = req.query.id;

    //     var filter = {
    //         _id: ObjectID(donate_id)
    //     }

    //     var donate_details = {
    //         donate_type: donate_type,
    //         donate_name: donate_name,
    //         donate_number: donate_number
    //     }

    //     database.updateOne(Donate, filter, donate_details);
    //     res.redirect('/cms-donate');
    // },

}

module.exports = adminController;

