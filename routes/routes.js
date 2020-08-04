// import module `express`
const express = require('express');

// import module `controller` from `../controllers/controller.js`
const controller = require('../controller/controller.js');

const logInController = require('../controller/logInController.js');

const app = express();

// call function getIndex when client sends a request for '/' defined in routes.js
// controller
//app.get('/homepage', controller.getHomePage);
//app.get('/about-us', controller.getAboutUs);
//app.get('/projects', controller.getProjects);
//app.get('/news', controller.getNews);
//app.get('/contact-us', controller.getContactUs);

app.get('/', function(req, res) {
    res.render('home', {
        title: 'Home | The Initiative PH',
        home_active: true,
    })
});

app.get('/home', function(req, res) {
    res.render('home', {
        title: 'Home | The Initiative PH',
        home_active: true,
    })
});

app.get('/about', function(req, res) {
    res.render('about', {
        title: 'About | The Initiative PH',
        about_active: true,
    })
});

app.get('/volunteer', function(req, res) {
    res.render('volunteer', {
        title: 'Volunteer | The Initiative PH',
        volunteer_active: true,
    })
});

app.get('/projects', function(req, res) {
    res.render('projects', {
        title: 'Projects | The Initiative PH',
        projects_active: true,
    })
});

app.get('/blog', function(req, res) {
    res.render('blog', {
        title: 'Blog | The Initiative PH',
        blog_active: true,
    })
});

app.get('/contact-us', function(req, res) {
    res.render('contact-us', {
        title: 'Contact Us | The Initiative PH',
        contact_active: true,
    })
});

app.get('/cms-login', function(req, res) {
    res.render('cms-login', {
        title: 'CMS Login | The Initiative PH',
    })
});
// enables to export app object when called in another .js file
module.exports = app;
