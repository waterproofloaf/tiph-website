const User = require('../models/UserModel.js');
const session = require('express-session');
const database = require('../models/db.js');
const bcrypt = require('bcrypt');
const helper = require('./helper.js')
const { ObjectID } = require('mongodb');
const { validationResult } = require('express-validator');

const adminController = {
    postAdmin: function (req, res) {
        let errors = validationResult(req);

        if (!errors.isEmpty()) {
            errors = errors.errors;

            res.render('cms-admin-new', {
            layout: '/layouts/cms-layout',
                title: 'CMS Add Admin | The Initiative PH',
                admin_active: true,
                type: req.session.type,
                name: req.session.name,
                userid: req.session.userid,
                adminErrorMessage: errors[0].msg
            });

            return;
        }

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
        database.findOne(User, {username: admin_username}, {}, function(all){
            if(all == null || all.username != admin_username){
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
                });
            }
            else if(all.username == admin_username){
                res.render('cms-admin-new', {
                    layout: '/layouts/cms-layout',
                    title: 'CMS Add Admin | The Initiative PH',
                    admin_active: true,
                    type: req.session.type,
                    name: req.session.name,
                    userid: req.session.userid,
                    adminErrorMessage: 'Username already exists!'
                });
            }
        });
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
        let errors = validationResult(req);

        if (!errors.isEmpty()) {
            errors = errors.errors;
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
                    adminErrorMessage: errors[0].msg
                });
            });

            return;
        }

        var admin_name = `${req.body.admin_name}`;
        var admin_username = helper.sanitize(req.body.admin_username);
        var admin_password = helper.sanitize(req.body.admin_password);
        var admin_new_password = `${req.body.admin_new_password}`;
        var admin_confirm_password = `${req.body.admin_confirm_password}`;
        var admin_dept = `${req.body.admin_dept}`;

        var filter = {
            _id: req.session.userid
        }

        database.findOne(User, filter, {}, function(user){
            if (user){
                bcrypt.compare(admin_password, user.password, function(err, equal){
                    if(equal){
                        if(admin_new_password != admin_confirm_password){
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
                                    adminErrorMessage: 'New Password and Confirm Password do not match!'
                                });
                            });
                        }
                        else{
                            database.findOne(User, {username: admin_username}, {}, function(all){
                                if(all == null){
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
                                else if(all.username == admin_username && req.session.userid != all._id){
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
                                            adminErrorMessage: 'Username already exists!'
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
                            });
                        }
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
                                adminErrorMessage: 'Old password is incorrect!'
                            });
                        });
                    }
                });
            }
        })
    },

}

module.exports = adminController;

