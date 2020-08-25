require('dotenv').config();

const nodemailer = require('nodemailer');

const formsController = {
    postContactUs: function (req, res){
        // console.log(req.body);
        const output = `<p>You have a new message from the TIPH website<p>
        <h3>Contact Details</h3>
        <ul>
            <li>Name: ${req.body.contact_name}</li>
        </ul>
        <h3>Inquiry</h3>
        <p>${req.body.contact_inquiry}</p>
        `;
        
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.EMAIL,
              pass: process.env.PASSWORD
            }
          });
          
          var mailOptions = {
            from: `${req.body.contact_email}`,
            to: 'victor_tulabot@dlsu.edu.ph',
            subject: `${req.body.contact_subject}`,
            text: 'That was easy!',
            html: output,
            attachments: [{filename: `${req.body.contact_upload}`}],
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