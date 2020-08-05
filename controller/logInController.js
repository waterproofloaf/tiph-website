const bcrypt = require('bcrypt');
const sanitize = require('mongo-sanitize');
const session = require('express-session');

const database = require('../models/db.js');
const User = require('../models/UserModel.js');

const helper = require('./helper.js')

const logIncontroller = {

    postLogIn: function(req, res){

        var username = helper.sanitize(req.body.cmsusername);
        var password = helper.sanitize(req.body.cmspassword);

        User.findOne( {username: username}, {}, function(err, user){
            if (user){
                bcrypt.compare(password, user.password, function(err, equal){
                    console.log(equal)
                    if(equal){
                        console.log('Username and password is correct.. Redirecting..');
                        // req.session.user = user.username;
                        res.redirect('/cms-home');
                    }
                    else{
                        res.render('cms-login', {
                            title: 'Login | TIPH',
                            login_active: true,
                            loginErrorMessage: 'Invalid credentials!'
                        });
                    }
                });
            }
            else{
                res.render('cms-login', {
                    title: 'Login | TIPH',
                    login_active: true,
                    loginErrorMessage: 'Invalid credentials!'
                });
            }
        })
        
    },
}

 // enables to export controller object when called in another .js file
 module.exports = logIncontroller;