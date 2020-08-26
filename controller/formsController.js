require('dotenv').config();

const nodemailer = require('nodemailer');

const formsController = {
    postContactUs: function (req, res) {

        // console.log(req.body);
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
                    // filename: `${req.body.contact_upload}`,
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
}

// enables to export controller object when called in another .js file
module.exports = formsController;