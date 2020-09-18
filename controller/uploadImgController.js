const upload = require("../middleware/upload.js");
const Home = require('../models/HomeModel.js');
const database = require('../models/db.js');
const { ObjectID } = require('mongodb');

// const uploadImgController = {
//     uploadFile: function (req, res) {
//         try {
//             await upload(req, res);

//             console.log(req.file);
//             if (req.file == undefined) {
//                 return res.send(`You must select a file.`);
//             }

//             return res.send(`File has been uploaded.`);
//         } catch (error) {
//             console.log(error);
//             return res.send(`Error when trying upload image: ${error}`);
//         }
//     }
// }

const uploadFile = async (req, res) => {
    try {
        await upload(req, res);

        console.log(req.file);
        if (req.file == undefined) {
            return res.send(`You must select a file.`);
        }

        var home_title = req.body.home_title;
        var home_subtitle = req.body.home_subtitle;
        var home_one_title = req.body.home_one_title;
        var home_one_content = req.body.home_one_content;
        var home_two_title = req.body.home_two_title;
        var home_two_content = req.body.home_two_content;
        var home_three_title = req.body.home_three_title;
        var home_three_content = req.body.home_three_content;
        var home_four_title = req.body.home_four_title;
        var home_four_content = req.body.home_four_content;
        var home_preapp_button = req.body.home_preapp_button_val;
        var home_app_button = req.body.home_app_button_val;

        var home_details = {
            home_title: home_title,
            home_subtitle: home_subtitle,
            home_one_title: home_one_title,
            home_one_content: home_one_content,
            home_two_title: home_two_title,
            home_two_content: home_two_content,
            home_three_title: home_three_title,
            home_three_content: home_three_content,
            home_four_title: home_four_title,
            home_four_content: home_four_content,
            home_preapp_button: home_preapp_button,
            home_app_button: home_app_button,
        }

        database.updateOne(Home, {}, home_details);
        res.redirect('/cms-home');

        return res.send(`File has been uploaded.`);

    } catch (error) {
        console.log(error);
        return res.send(`Error when trying upload image: ${error}`);
    }
};

module.exports = {
    uploadFile: uploadFile
};