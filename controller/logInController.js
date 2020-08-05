// import module from db.js in models directory
const database = require('../models/db.js');

const User = require('../models/UserModel.js');

// define objects for client request functions for a certain path in the server
const logIncontroller = {

    postLogIn: function(req, res){

        var username = req.body.cms-username;
        var password = req.body.cms-password;

        User.findOne( {username: username}, function(err, result){
            if (err){
                console.log(err);
            }
            else{
                console.log("Result: ", result);
            }
        })
        
    }
}

 // enables to export controller object when called in another .js file
 module.exports = logIncontroller;