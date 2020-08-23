// import module from db.js in models directory
const database = require('../models/db.js');

// define objects for client request functions for a certain path in the server
const controller = {

    getHomePage: function (req, res) {
        res.render('home', {
            layout: '/layouts/main',
            title: 'Home | The Initiative PH',
            home_active: true,
        })
    },

    getAboutUs: function (req, res) {
        res.render('about', {
            layout: '/layouts/main',
            title: 'About | The Initiative PH',
            about_active: true,
        })
    },

    getPreApp: function (req, res) {
        res.render('pre-application', {
            layout: '/layouts/main',
            title: 'Pre-Application | The Initiative PH',
            volunteer_active: true,
        })
    },

    getApplication: function (req, res) {
        res.render('application', {
            layout: '/layouts/main',
            title: 'Application | The Initiative PH',
            volunteer_active: true,
        })
    },

    getProjects: function (req, res) {
        res.render('projects', {
            layout: '/layouts/main',
            title: 'Projects | The Initiative PH',
            projects_active: true,
        })
    },

    getBlogs: function (req, res) {
        res.render('blog', {
            layout: '/layouts/main',
            title: 'Blog | The Initiative PH',
            blog_active: true,
        })
    },

    getABlog: function (req, res) {
        res.render('a-blog', {
            layout: '/layouts/main',
            title: 'A Blog | The Initiative PH',
            blog_active: true,
        })
    },

    getAProject: function (req, res) {
        res.render('a-project', {
            layout: '/layouts/main',
            title: 'A Project | The Initiative PH',
            projects_active: true,
        })
    },

    getContactUs: function (req, res) {
        res.render('contact-us', {
            layout: '/layouts/main',
            title: 'Contact Us | The Initiative PH',
            contact_active: true,
        })
    },

    getDonate: function (req, res) {
        res.render('donate', {
            layout: '/layouts/main',
            title: 'Donate | The Initiative PH',
            donate_active: true,
        })
    },

    getCMSLogin: function (req, res) {
        res.render('cms-login', {
            title: 'CMS Login | The Initiative PH',
        })
    },

    getCMSHome: function (req, res) {
        res.render('cms-home', {
            layout: '/layouts/cms-layout',
            title: 'CMS Home | The Initiative PH',
            home_active: true,
        })
    },

    getCMSApplication: function (req, res) {
        res.render('cms-application', {
            layout: '/layouts/cms-layout',
            title: 'CMS Application | The Initiative PH',
            application_active: true,
        })
    },

    getCMSAdmin: function (req, res) {
        res.render('cms-admin', {
            layout: '/layouts/cms-layout',
            title: 'CMS Admin | The Initiative PH',
            admin_active: true,
        })
    },

    getCMSNewAdmin: function (req, res) {
        res.render('cms-admin-new', {
            layout: '/layouts/cms-layout',
            title: 'CMS Add Admin | The Initiative PH',
            admin_active: true,
        })
    },

    getCMSEditApplication: function (req, res) {
        res.render('cms-edit-application', {
            layout: '/layouts/cms-layout',
            title: 'CMS Application Form Edit | The Initiative PH',
            application_active: true,
        })
    },

    getCMSBlog: function (req, res) {
        res.render('cms-blog', {
            layout: '/layouts/cms-layout',
            title: 'CMS Blog | The Initiative PH',
            blog_active: true,
        })
    },

    getCMSBlogPage: function (req, res) {
        res.render('cms-blog-page', {
            layout: '/layouts/cms-layout',
            title: 'CMS Blog Edit | The Initiative PH',
            blog_active: true,
        })
    },

    getCMSBlogNewPage: function (req, res) {
        res.render('cms-blog-new-page', {
            layout: '/layouts/cms-layout',
            title: 'CMS New Blog Entry | The Initiative PH',
            blog_active: true,
        })
    },

    getCMSProject: function (req, res) {
        res.render('cms-project', {
            layout: '/layouts/cms-layout',
            title: 'CMS Project | The Initiative PH',
            project_active: true,
        })
    },

    getCMSProjectPage: function (req, res) {
        res.render('cms-project-page', {
            layout: '/layouts/cms-layout',
            title: 'CMS Project Edit | The Initiative PH',
            project_active: true,
        })
    },

    getCMSProjectNewPage: function (req, res) {
        res.render('cms-project-new-page', {
            layout: '/layouts/cms-layout',
            title: 'CMS New Project Page | The Initiative PH',
            project_active: true,
        })
    },

    getCMSDonate: function (req, res) {
        res.render('cms-donate', {
            layout: '/layouts/cms-layout',
            title: 'CMS Donate | The Initiative PH',
            donate_active: true,
        })
    },

    getCMSNewDonate: function (req, res) {
        res.render('cms-donation-new-option', {
            layout: '/layouts/cms-layout',
            title: 'CMS Add Donation Option | The Initiative PH',
            donate_active: true,
        })
    },

    getCMSEditDonate: function (req, res) {
        res.render('cms-edit-donation', {
            layout: '/layouts/cms-layout',
            title: 'CMS Edit Donation Option | The Initiative PH',
            donate_active: true,
        })
    },
}

// enables to export controller object when called in another .js file
module.exports = controller;