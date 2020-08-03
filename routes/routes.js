// import module `express`
const express = require('express');

// import module `controller` from `../controllers/controller.js`
const controller = require('../controller/controller.js');

const logInController = require('../controller/logInController.js');

const app = express();

// call function getIndex when client sends a request for '/' defined in routes.js
// controller
app.get('/homepage', controller.getHomePage);
app.get('/about-us', controller.getAboutUs);
app.get('/projects', controller.getProjects);
app.get('/news', controller.getNews);
app.get('/contact-us', controller.getContactUs);


// enables to export app object when called in another .js file
module.exports = app;
