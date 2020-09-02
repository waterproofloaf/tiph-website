const User = require('../models/UserModel.js');
const session = require('express-session');
const database = require('../models/db.js');
const bcrypt = require('bcrypt');
const helper = require('./helper.js')
const { ObjectID } = require('mongodb');

// URL of MongoDB database
const url = "mongodb://localhost:27017/tiph";

const adminController = {
    postAdmin: function (req, res) {
        var admin_name = `${req.body.admin_name}`;
        var admin_username = `${req.body.admin_username}`;
        var admin_password = `${req.body.admin_password}`;
        var admin_dept = `${req.body.admin_dept}`;
        var admin_userTypeMain = `${req.body.is_main}`;

        if (admin_userTypeMain == 'No'){
            admin_userTypeMain = false;
        }
        else{
            admin_userTypeMain = true;
        }

        bcrypt.hash(admin_password, 10, function(err, hash){
            let admin_details = {
                name: admin_name,
                username: admin_username,
                password: hash,
                userDepartment: admin_dept,
                userTypeMain: admin_userTypeMain
            }
        
            database.insertOne(User, admin_details, (result) => {
                console.log(result);
                res.redirect('/cms-admin');
            });
        })
    },

    deleteAdmin: function (req, res) {
        var admin_id = req.query.id;
        var admin_details = {
            _id: ObjectID(admin_id)
        }

        database.deleteOne(User, admin_details);
        res.redirect('/cms-admin');
    },

    editAdmin: function (req, res) {
        var admin_name = `${req.body.admin_name}`;
        var admin_username = helper.sanitize(req.body.admin_username);
        var admin_password = helper.sanitize(req.body.admin_password);
        var admin_new_password = `${req.body.admin_new_password}`;
        var admin_dept = `${req.body.admin_dept}`;

        var filter = {
            _id: req.session.userid
        }

        database.findOne(User, filter, {}, function(user){
            if (user){
                bcrypt.compare(admin_password, user.password, function(err, equal){
                    if(equal){
                        database.findOne(User, {username: admin_username}, {}, function(all){
                            if(all.username == admin_username && req.session.userid != all._id){
                                var query = req.session.userid;
                                database.findOne(User, { _id: query }, {}, function (admin) {
                                    res.render('cms-admin-edit', {
                                        layout: '/layouts/cms-layout',
                                        title: 'CMS Edit Admin | The Initiative PH',
                                        admin_name: admin.name,
                                        admin_username: admin.username,
                                        admin_dept: admin.userDepartment,
                                        type: req.session.type,
                                        name: req.session.name,
                                        userid: req.session.userid,
                                        loginErrorMessage: 'Username already exists!'
                                    });
                                });
                            }
                            else{
                                bcrypt.hash(admin_new_password, 10, function(err, hash){
                                    let admin_details = {
                                        name: admin_name,
                                        username: admin_username,
                                        password: hash,
                                        userDepartment: admin_dept,
                                    }
                        
                                    database.updateOne(User, filter, admin_details);
                                    res.redirect('/cms-logout');
                                })
                            }
                        })
                        
                    }
                    else{
                        var query = req.session.userid;
                        database.findOne(User, { _id: query }, {}, function (admin) {
                            res.render('cms-admin-edit', {
                                layout: '/layouts/cms-layout',
                                title: 'CMS Edit Admin | The Initiative PH',
                                admin_name: admin.name,
                                admin_username: admin.username,
                                admin_dept: admin.userDepartment,
                                type: req.session.type,
                                name: req.session.name,
                                userid: req.session.userid,
                                loginErrorMessage: 'Old password do not match the database!'
                            });
                        });
                    }
                });
            }
        })
    },

}

module.exports = adminController;

