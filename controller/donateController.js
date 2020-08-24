const Donate = require('../models/DonateModel.js');
const database = require('../models/db.js');

exports.postDonate = function(req, res){
    var donate_type = req.body.donate_type;
    var donate_name = req.body.donate_name;
    var donate_number = req.body.donate_number;
    
    var donate_details = {
        donate_type: donate_type,
        donate_name: donate_name,
        donate_number: donate_number
    }
    
    database.insertOne(Donate, donate_details, function(flag){
       if(flag){
           console.log("1 document added");
       }
    });
};

// exports.getAllDonate = function(req, res){
//    donateModel.getAll(function(result){
//        res.render('donate', {title: 'Donate', donate})
//    });
//};