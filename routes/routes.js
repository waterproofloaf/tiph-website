// import module `express`
const express = require('express');

// import module `controller` from `../controllers/controller.js`
const controller = require('../controller/controller.js');
const logIncontroller = require('../controller/logIncontroller.js');

const app = express();

// call function getIndex when client sends a request for '/' defined in routes.js
// controller
app.get('/', controller.getHomePage);
app.get('/home', controller.getHomePage);
app.get('/about-us', controller.getAboutUs);
app.get('/volunteer', controller.getVolunteer);
app.get('/projects', controller.getProjects);
app.get('/blog', controller.getBlogs);
app.get('/contact-us', controller.getContactUs);

app.get('/cms-login', controller.getCMSLogin);
app.post('/cms-login', logIncontroller.postLogIn);

app.get('/cms-home', controller.getCMSHome);
app.get('/cms-blog', controller.getCMSBlog);

// app.get('/', function(req, res) {
//     res.render('home', {
//         title: 'Home | The Initiative PH',
//         home_active: true,
//     })
// });

// app.get('/home', function(req, res) {
//     res.render('home', {
//         title: 'Home | The Initiative PH',
//         home_active: true,
//     })
// });

// app.get('/about', function(req, res) {
//     res.render('about', {
//         title: 'About | The Initiative PH',
//         about_active: true,
//     })
// });

// app.get('/volunteer', function(req, res) {
//     res.render('volunteer', {
//         title: 'Volunteer | The Initiative PH',
//         volunteer_active: true,
//     })
// });

// app.get('/projects', function(req, res) {
//     res.render('projects', {
//         title: 'Projects | The Initiative PH',
//         projects_active: true,
//     })
// });

// app.get('/blog', function(req, res) {
//     res.render('blog', {
//         title: 'Blog | The Initiative PH',
//         blog_active: true,
//     })
// });

// app.get('/contact-us', function(req, res) {
//     res.render('contact-us', {
//         title: 'Contact Us | The Initiative PH',
//         contact_active: true,
//     })
// });

// app.get('/cms-login', function(req, res) {
//     res.render('cms-login', {
//         title: 'CMS Login | The Initiative PH',
//     })
// });

// app.get('/cms-home', function(req, res) {
//     res.render('cms-home', {
//         title: 'CMS Home | The Initiative PH',
//     })
// });

// app.get('/cms-blog', function(req, res) {
//     res.render('cms-blog', {
//         title: 'CMS Blog | The Initiative PH',
//     })
// });
// enables to export app object when called in another .js file
module.exports = app;
