require('dotenv').config();

const nodemailer = require('nodemailer');

const PreApp = require('../models/PreAppModel.js');
const App = require('../models/AppModel.js');
const database = require('../models/db.js');

const formsController = {
    postContactUs: function (req, res) {
        const output = `<p>You have a new message from the TIPH website<p>
        <h3>Contact Details</h3>
        <p>Name: ${req.body.contact_name}<p>
        <p>Email: ${req.body.contact_email}<p>
        <h3>Inquiry</h3>
        <p>${req.body.contact_inquiry}</p>
        `;
        
        var transporter = nodemailer.createTransport({
            // host: 'smtp.gmail.com',
            // port: 465,
            // secure: true,
            service: 'gmail',
            auth: {
              user: process.env.EMAIL,
              pass: process.env.PASSWORD
              // type: 'OAuth2',
              // clientId: '832603771533-vfgm7kldqp7o8gmk96pvvro9q0lejg10.apps.googleusercontent.com',
              // clientSecret: '0HFvRJ8I4J9A7HhHpGJJFwgC'
            }
          });
          
          var mailOptions = {
            from: `${req.body.contact_email}`,
            to: 'victor_tulabot@dlsu.edu.ph',
            subject: `${req.body.contact_subject}`,
            html: output,
            attachments: [
                {
                    filename: `${req.file.filename}`,
                    encoding: `${req.file.encoding}`,
                    path: `${req.file.path}`,
                }
            ]
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
              res.render('contact-us', {
                layout: '/layouts/main',
                title: 'Contact Us | The Initiative PH',
                contact_active: true,
                msg: 'Your message has been sent!'
            })
            }
          });
    },

    postPreApp: function (req, res) {
      var pre_firstname = req.body.pre_firstname;
      var pre_lastname = req.body.pre_lastname;
      var pre_age = req.body.pre_age;
      var pre_number = req.body.pre_number;
      var pre_email = req.body.pre_email;
      var pre_schoolcompany = req.body.pre_schoolcompany;
      var pre_affiliation = req.body.pre_affiliation;
      var pre_facebook = req.body.pre_facebook;
      var pre_notify = req.body.pre_notify;
      var pre_comments = req.body.pre_comments;

      var newPreApp = {
          pre_firstname: pre_firstname,
          pre_lastname: pre_lastname,
          pre_age: pre_age,
          pre_number: pre_number,
          pre_email: pre_email,
          pre_schoolcompany: pre_schoolcompany,
          pre_affiliation: pre_affiliation,
          pre_facebook: pre_facebook,
          pre_notify: pre_notify,
          pre_comments: pre_comments,
          pre_status: "Pending"
      }

      database.insertOne(PreApp, newPreApp, function (f) {
          if (f) {
              console.log('Pre Application Added: ' + pre_firstname + " " + pre_lastname);
              res.redirect('/pre-application');
          }
      });
    },

    postAppForm: function (req, res) {
      var app_firstname = `${req.body.app_firstname}`;
      var app_lastname = `${req.body.app_lastname}`;
      var app_nickname = `${req.body.app_nickname}`;
      var app_email = `${req.body.app_email}`;
      var app_bday = `${req.body.app_bday}`;
      var app_cResidence = `${req.body.app_cResidence}`;
      var app_schoolcompany = `${req.body.app_schoolcompany}`;
      var app_number = `${req.body.app_number}`;
      var app_facebook = `${req.body.app_facebook}`;
      var app_twitter = `${req.body.app_twitter}`;
      var app_findout = `${req.body.app_findout}`;
      var app_expertise = `${req.body.app_expertise}`;
      var app_dept1 = `${req.body.app_dept1}`;
      var app_position1 = `${req.body.app_position1}`;
      var app_dept2 = `${req.body.app_dept2}`;
      var app_position2 = `${req.body.app_position2}`;
      var app_reason = `${req.body.app_reason}`;
      var app_portfolio = `${req.body.app_portfolio}`;

      if(app_findout == "other"){
        app_findout = `${req.body.app_others}`
      }

      var newApp = {
        app_firstname: app_firstname,
        app_lastname: app_lastname,
        app_nickname: app_nickname,
        app_email: app_email,
        app_bday: app_bday,
        app_cResidence: app_cResidence,
        app_schoolcompany: app_schoolcompany,
        app_number: app_number,
        app_facebook: app_facebook,
        app_twitter: app_twitter,
        app_findout: app_findout,
        app_expertise: app_expertise,
        app_dept1: app_dept1,
        app_position1: app_position1,
        app_dept2: app_dept2,
        app_position2: app_position2,
        app_reason: app_reason,
        app_portfolio: app_portfolio,
        app_status: "Pending"
    }

      database.insertOne(App, newApp, function (f) {
        if (f) {
            console.log('Application Added: ' + app_firstname + " " + app_lastname);
            res.redirect('/application');
        }
    });
    }
}

// enables to export controller object when called in another .js file
module.exports = formsController;