// import module from db.js in models directory
const database = require('../models/db.js');

// define objects for client request functions for a certain path in the server
const controller = {

    getFavicon: function (req, res) {
        res.status(204);
    },

    // render log-in page when client requests '/' defined in routes.js
    getIndex: function(req,res){        
        res.render('login');
    },

    getHomePage: function(req, res){
        res.render('home', {
            title: 'Home | The Initiative PH',
            home_active: true,
        })
    },

    getAboutUs: function(req, res){
        res.render('about', {
            title: 'About | The Initiative PH',
            about_active: true,
        })
    },

    getVolunteer: function(req, res){
        res.render('volunteer', {
            title: 'Volunteer | The Initiative PH',
            volunteer_active: true,
       })
    },

    getPreApp: function(req, res){
        res.render('pre-application', {
            title: 'Pre-Application | The Initiative PH',
            volunteer_active: true,
        })
    },

    getApplication: function(req, res){
        res.render('application', {
            title: 'Application | The Initiative PH',
            volunteer_active: true,
        })
    },

    getProjects: function(req, res){
        res.render('projects', {
            title: 'Projects | The Initiative PH',
            projects_active: true,
        })
    },

    getBlogs: function(req, res){
        res.render('blog', {
            title: 'Blog | The Initiative PH',
            blog_active: true,
        })
    },

    getContactUs: function(req, res){
        res.render('contact-us', {
            title: 'Contact Us | The Initiative PH',
            contact_active: true,
        })
    },

    getCMSLogin: function(req, res){
        res.render('cms-login', {
            title: 'CMS Login | The Initiative PH',
        })
    },

    getCMSHome: function(req, res){
        res.render('cms-home', {
            title: 'CMS Home | The Initiative PH',
        })
    },

    getCMSApplication: function(req, res){
        res.render('cms-application', {
            title: 'CMS Application | The Initiative PH',
        })
    },

    getCMSBlog: function(req, res){
        res.render('cms-blog', {
            title: 'CMS Blog | The Initiative PH',
        })
    },

    getCMSProject: function(req, res){
        res.render('cms-project', {
            title: 'CMS Project | The Initiative PH',
        })
    },


    // new dashboard for cms
    getH: function(req, res){
        res.render('cms-dashboard-h', {
            title: 'CMS-Home | The Initiative PH',
            home_active: true,
        })
    },

    getA: function(req, res){
        res.render('cms-dashboard-a', {
            title: 'CMS-Application | The Initiative PH',
            application_active: true,
        })
    },

    getB: function(req, res){
        res.render('cms-dashboard-b', {
            title: 'CMS-Blog | The Initiative PH',
            blog_active: true,
        })
    },

    getP: function(req, res){
        res.render('cms-dashboard-p', {
            title: 'CMS-Project | The Initiative PH',
            project_active: true,
        })
    },
}

 // enables to export controller object when called in another .js file
 module.exports = controller;