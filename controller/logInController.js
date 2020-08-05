// import module from db.js in models directory
const database = require('../models/db.js');

const User = require('../models/UserModel.js');

// define objects for client request functions for a certain path in the server
const logIncontroller = {

    postLogIn: function(req, res){

        var username = req.body.cmsusername;
        var password = req.body.cmspassword;

        User.findOne( {username: username}, function(err, result){
            if (err){
                console.log(err);
            }
            else{
                console.log("Result: ", result);
                if (result.username == username && result.password == password){
                    res.redirect('/cms-home');
                }
            }
        })
        
    }
}

 // enables to export controller object when called in another .js file
 module.exports = logIncontroller;