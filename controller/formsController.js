require('dotenv').config();

const nodemailer = require('nodemailer');

const PreApp = require('../models/PreAppModel.js');
const App = require('../models/AppModel.js');
const PreAppForm = require('../models/PreAppFormModel.js');
const AppForm = require('../models/AppFormModel.js')
const Department = require('../models/DepartmentModel.js')
const Position = require('../models/PositionModel.js');
const database = require('../models/db.js');

const { validationResult } = require('express-validator');

const formsController = {
    postContactUs: function (req, res) {
      let errors = validationResult(req);

      if (!errors.isEmpty()) {
        errors = errors.errors;

        res.render('contact-us', {
          layout: '/layouts/main',
            title: 'Contact Us | The Initiative PH',
            contact_active: true,
            contactErrorMessage: errors[0].msg
        });

        return;
      }

      // remove if not necessary
      var spammer_name = req.body.contact_name;
      if (spammer_name == 'HenryReoft'){
        res.render('contact-us', {
          layout: '/layouts/main',
          title: 'Contact Us | The Initiative PH',
          contact_active: true,
          msg: '<mark>Your message has been sent!</mark>',
          confirmed: true,
        });
      }
      else{
        const output = `
        <p>You have a new message from the TIPH website<p>
        <h3>Contact Details</h3>
        <p>Name: ${req.body.contact_name}<p>
        <p>Email: ${req.body.contact_email}<p>
        <h3>Inquiry</h3>
        <p>${req.body.contact_inquiry}</p>
        `;
        if(req.file != null){
          var mailOptions = {
            from: `${req.body.contact_email}`,
            to: 'theinitiativeph@gmail.com',
            cc: 'tulabot18@gmail.com', 
            bcc: 'victor_tulabot@dlsu.edu.ph',
            subject: `${req.body.contact_subject}`,
            html: output,
            attachments: [
                {
                  filename: `${req.file.filename}`,
                  encoding: `${req.file.encoding}`,
                  path: `${req.file.path}`
                }
            ]
          };
        }
        else{
          var mailOptions = {
            from: `${req.body.contact_email}`,
            to: 'theinitiativeph@gmail.com',
            cc: 'tulabot18@gmail.com', 
            bcc: 'victor_tulabot@dlsu.edu.ph',
            subject: `${req.body.contact_subject}`,
            html: output,
          };
        }
        
        var transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          // service: 'gmail',
          auth: {
            // user: process.env.EMAIL,
            // pass: process.env.PASSWORD,
            type: 'OAuth2',
            user: process.env.EMAIL,
            clientId: '715120975215-gu4dnia1e7uhsdeu135i5etgjpbh23b3.apps.googleusercontent.com',
            clientSecret: 'HTXsSZKpIkskj4UjJ0UnFjWs',
            refreshToken: '1//04hxQ2KTxwLXrCgYIARAAGAQSNwF-L9Ir8q7iqvYd4k6W0VKgyvH6qnTY_9SzRdvdyx8aZ4IdU2cqt2MDagclEgq3RK-qZP16GoU',
          }
        });
          
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
            res.render('contact-us', {
              layout: '/layouts/main',
              title: 'Contact Us | The Initiative PH',
              contact_active: true,
              msg: '<mark>Your message has been sent!</mark>',
              confirmed: true,
            })
          }
        });
      }
    },

    postPreApp: function (req, res) {
      let errors = validationResult(req);

      if (!errors.isEmpty()) {
        errors = errors.errors;
        database.findOne(PreAppForm, {}, {}, function (preapp) {
          res.render('pre-application', {
            layout: '/layouts/main',
              title: 'Pre-Application | The Initiative PH',
              volunteer_active: true,
              preform_year: preapp.preform_year,
              preform_desc: preapp.preform_desc,
              preappErrorMessage: errors[0].msg
          });
        })
        
        return;
      }

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
          pre_status: "Pending",
          pre_status_reason: "This Pre-Application's status hasn't been changed yet."
      }

      database.insertOne(PreApp, newPreApp, function (f) {
          if (f) {
              console.log('Pre Application Added: ' + pre_firstname + " " + pre_lastname);
              database.findOne(PreAppForm, {}, {}, function (preapp) {
                res.render('pre-application', {
                    layout: '/layouts/main',
                    title: 'Pre-Application | The Initiative PH',
                    volunteer_active: true,
                    preform_year: preapp.preform_year,
                    preform_desc: preapp.preform_desc,
                    msg: '<mark>Your Pre-Application form has been submitted!</mark>',
                    confirmed: true,
                })
            });
          }
      });
    },

    postAppForm: function (req, res) {
      let errors = validationResult(req);

      if (!errors.isEmpty()) {
        errors = errors.errors;

        database.findOne(AppForm, {}, {}, function (appsform) {
          database.findMany(Department, {}, {}, function (departmentArray) {
            database.findMany(Position, {}, {}, function (positionArray) {
              res.render('application', {
                layout: '/layouts/main',
                  title: 'Application | The Initiative PH',
                  volunteer_active: true,
                  department_info: departmentArray,
                  position_info: positionArray,
                  appform_year: appsform.appform_year,
                  appform_desc: appsform.appform_desc,
                  appErrorMessage: errors[0].msg
              });
            })
          })
        })

        return;
      }

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
        app_status: "Pending",
        app_status_reason: "This Application's status hasn't been changed yet."
      }

      database.insertOne(App, newApp, function (f) {
        if (f) {
          console.log('Application Added: ' + app_firstname + " " + app_lastname);
          database.findOne(AppForm, {}, {}, function (appsform) {
            database.findMany(Department, {}, {}, function (departmentArray) {
              database.findMany(Position, {}, {}, function (positionArray) {
                res.render('application', {
                  layout: '/layouts/main',
                    title: 'Application | The Initiative PH',
                    volunteer_active: true,
                    department_info: departmentArray,
                    position_info: positionArray,
                    appform_year: appsform.appform_year,
                    appform_desc: appsform.appform_desc,
                    msg: '<mark>Your Application form has been submitted!<br>Click here for the <a href="https://tinyurl.com/tiphinterviews2020">Interview Schedule Link</a></mark>',
                    confirmed: true,
                });
              })
            })
          })
        }
      });

    }
}

// enables to export controller object when called in another .js file
module.exports = formsController;