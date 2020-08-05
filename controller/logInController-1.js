const bcrypt = require('bcrypt');

// import module from db.js in models directory
const database = require('../models/db.js');
const session = require('express-session');

const User = require('../models/UserModel.js');
const helper = require('./helper.js')

// define objects for client request functions for a certain path in the server
const logIncontroller = {

        getLogin: function(req, res){
            console.log('Fetching Login Page...');
            res.render('cms-login', {
                title: 'Login | TIPH',
                login_active: true,
            });
        },

        postLogin: function(req, res) {
            var username = helper.sanitize(req.body.cms-username);
            var password = helper.sanitize(req.body.cms-password);

            if(username.trim() == '' || password == ''){
                res.render('cms-login', {
                    title: 'Login | TIPH',
                    login_active: true,
                    loginErrorMessage: 'Required Fields!'
                });
                return;
            }
    
            database.findOne(User, {username: username}, {}, function(user){
            if(user){
                bcrypt.compare(password, user.password, function(err, equal){
                    console.log(equal)
                    if(equal){
                        console.log('Username and password is correct.. Redirecting..');
                        req.session.user = user.username;
                        res.redirect('/cms-home');
                    }
                    else{
                        res.render('cms-login', {
                            title: 'Login | TIPH',
                            login_active: true,
                            loginErrorMessage: 'Invalid username or password!'
                        });
                    }
                });
            }else{
                res.render('cms-login', {
                    title: 'Login | TIPH',
                    login_active: true,
                    loginErrorMessage: 'Invalid username or password!'
                });
                }
         }); 
    } 
}
        

 // enables to export controller object when called in another .js file
 module.exports = logIncontroller;