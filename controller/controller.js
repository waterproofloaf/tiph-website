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
            layout: '/layouts/main',
            title: 'Home | The Initiative PH',
            home_active: true,
        })
    },

    getAboutUs: function(req, res){
        res.render('about', {
            layout: '/layouts/main',
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
            layout: '/layouts/main',
            title: 'Pre-Application | The Initiative PH',
            volunteer_active: true,
        })
    },

    getApplication: function(req, res){
        res.render('application', {
            layout: '/layouts/main',
            title: 'Application | The Initiative PH',
            volunteer_active: true,
        })
    },

    getProjects: function(req, res){
        res.render('projects', {
            layout: '/layouts/main',
            title: 'Projects | The Initiative PH',
            projects_active: true,
        })
    },

    getBlogs: function(req, res){
        res.render('blog', {
            layout: '/layouts/main',
            title: 'Blog | The Initiative PH',
            blog_active: true,
        })
    },

    getContactUs: function(req, res){
        res.render('contact-us', {
            layout: '/layouts/main',
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
            layout: '/layouts/cms-layout',
            title: 'CMS Home | The Initiative PH',
            home_active: true,
        })
    },

    getCMSApplication: function(req, res){
        res.render('cms-application', {
            layout: '/layouts/cms-layout',
            title: 'CMS Application | The Initiative PH',
            application_active: true,
        })
    },

    getCMSBlog: function(req, res){
        res.render('cms-blog', {
            layout: '/layouts/cms-layout',
            title: 'CMS Blog | The Initiative PH',
            blog_active: true,
        })
    },

    getCMSProject: function(req, res){
        res.render('cms-project', {
            layout: '/layouts/cms-layout',
            title: 'CMS Project | The Initiative PH',
            project_active: true,
        })
    },

    getCMSProjectPage: function(req, res){
        res.render('cms-project-page', {
            layout: '/layouts/cms-layout',
            title: 'CMS Project Edit | The Initiative PH',
            project_active: true,
        })
    },
}

 // enables to export controller object when called in another .js file
 module.exports = controller;