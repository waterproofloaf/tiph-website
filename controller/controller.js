// import module from db.js in models directory
const db = require('../models/db.js');

// define objects for client request functions for a certain path in the server
const controller = {

    getFavicon: function (req, res) {
        res.status(204);
    },

    // render log-in page when client requests '/' defined in routes.js
    getIndex: function(req,res){        
        res.render('login');
    },

    getContactUs: function(req, res){
        res.render('contact-us');
    },

    //executed when client requests '/' for HTTP POST defined in routes.js
    postLogIn: function(req, res){
        var DisplayName = req.body.username;

        var query = {
            DisplayName: DisplayName,
        }

        db.findOne('userProfile',query,function(result){
            if(result){
                res.redirect('/HOME?_id=' + result._id + '&DisplayName=' + DisplayName);
            }
        })
    },

    // executes when client request for HTTP GET '/checkUsername' defined in routes.js
    checkUsername: function(req,res){

        // retrieve value of Username stored in req.query object
        var username = req.query.Username;

        // call the function findOne() from the module in db.js and use the object query to filter the collection 'userProfile' in the database
        // sends an empty string if no result was found. otherwise, send an object containing 'Username'
        db.findOne('userProfile', {DisplayName : username}, function(result){
            res.send(result);
        })


        // mongoose
        // db.findOne(User, {username: username}, 'username', function (result) {
        //     res.send(result);
        // });
    },

    checkPassword: function(req,res){

        // retrieve value of Username stored in req.query object
        var pass = req.query.Password;

        // call the function findOne() from the module in db.js and use the object query to filter the collection 'userProfile' in the database
        // sends an empty string if no result was found. otherwise, send an object containing 'Username'
        db.findOne('userProfile', {Password : pass}, function(result){
            res.send(result);
        })

    },
}

 // enables to export controller object when called in another .js file
 module.exports = controller;