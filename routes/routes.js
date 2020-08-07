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
app.get('/about', controller.getAboutUs);
app.get('/volunteer', controller.getVolunteer);
app.get('/pre-application', controller.getPreApp);
app.get('/application', controller.getApplication);
app.get('/projects', controller.getProjects);
app.get('/blog', controller.getBlogs);
app.get('/contact-us', controller.getContactUs);

app.get('/cms-login', controller.getCMSLogin);
app.post('/cms-login', logIncontroller.postLogIn);

app.get('/cms-home', controller.getCMSHome);
app.get('/cms-blog', controller.getCMSBlog);
// enables to export app object when called in another .js file


app.get('/cms-dashboard-h', controller.getH);
app.get('/cms-dashboard-a', controller.getA);
app.get('/cms-dashboard-b', controller.getB);
app.get('/cms-dashboard-p', controller.getP);
module.exports = app;
