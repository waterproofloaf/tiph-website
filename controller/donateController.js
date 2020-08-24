const Donate = require('../models/DonateModel.js');
const database = require('../models/db.js');

const donateController = {
    postDonate: function (req, res) {
        var donate_type = req.body.donate_type;
        var donate_name = req.body.donate_name;
        var donate_number = req.body.donate_number;
        var donate_hide = false;

        var donate_details = {
            donate_type: donate_type,
            donate_name: donate_name,
            donate_number: donate_number,
            donate_hide: donate_hide
        }

        database.insertOne(Donate, donate_details, function (flag) {
            if (flag) {
                console.log("1 document added");
                res.redirect('/cms-donate');
            }
        });
    },

    deleteDonate: function (req, res) {
        var query = req.body.donate_number;
        database.deleteOne(query, function (err, obj) {
            if (err) throw err;
            console.log("1 document deleted");
            res.redirect('/cms-donate');
        });
    }
}

module.exports = donateController;

// exports.getAllDonate = function(req, res){
//    donateModel.getAll(function(result){
//        res.render('donate', {title: 'Donate', donate})
//    });
//};