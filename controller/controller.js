// import module from db.js in models directory
const database = require('../models/db.js');
const Donate = require('../models/DonateModel.js');
const Blog = require('../models/ProjectModel.js');

// URL of MongoDB database
const url = "mongodb://localhost:27017/tiph";

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
        var MongoClient = require('mongodb').MongoClient;
        // var url = "mongodb://localhost:27017/tiph";
        MongoClient.connect(url, { useUnifiedTopology: true },
            function (err, db) {
                if (err) throw err;
                var projArray = [];
                var dbo = db.db("tiph");
                var cursor = dbo.collection("projects").find();
                cursor.forEach(function (doc, err) {
                    projArray.push(doc);
                },
                    function () {
                        res.render('projects', {
                            layout: '/layouts/main',
                            title: 'Projects | The Initiative PH',
                            projects_active: true,
                            proj_info: projArray,
                        });
                        db.close();
                    });
            });
        //        res.render('projects', {
        //            layout: '/layouts/main',
        //            title: 'Projects | The Initiative PH',
        //            projects_active: true,
        //        })
    },

    getBlogs: function (req, res) {
        var MongoClient = require('mongodb').MongoClient;
        // var url = "mongodb://localhost:27017/tiph";
        MongoClient.connect(url, { useUnifiedTopology: true },
            function (err, db) {
                if (err) throw err;
                var blogArray = [];
                var dbo = db.db("tiph");
                var cursor = dbo.collection("blogs").find();
                cursor.forEach(function (doc, err) {
                    blogArray.push(doc);
                },
                    function () {
                        res.render('blog', {
                            layout: '/layouts/main',
                            title: 'Blogs | The Initiative PH',
                            blog_active: true,
                            blog_info: blogArray,
                        });
                        db.close();
                    });
            });
        //        res.render('blog', {
        //            layout: '/layouts/main',
        //            title: 'Blog | The Initiative PH',
        //            blog_active: true,
        //        })
    },

    getABlog: function (req, res) {
        res.render('a-blog', {
            layout: '/layouts/main',
            title: 'A Blog | The Initiative PH',
            blog_active: true,
        });
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
        // res.render('donate', {
        //     layout: '/layouts/main',
        //     title: 'Donate | The Initiative PH',
        //     donate_active: true
        // })

        var MongoClient = require('mongodb').MongoClient;
        MongoClient.connect(url, { useUnifiedTopology: true },
            function (err, db) {
                if (err) throw err;
                var resultArray = [];
                var dbo = db.db("tiph");
                var cursor = dbo.collection("donates").find();
                cursor.forEach(function (doc, err) {
                    resultArray.push(doc);
                },
                    function () {
                        res.render('donate', {
                            layout: '/layouts/main',
                            title: 'Donate | The Initiative PH',
                            donate_active: true,
                            donate_info: resultArray
                        });
                        db.close();
                    });
            });
    },

    getCMSLogin: function (req, res) {
        res.render('cms-login', {
            title: 'CMS Login | The Initiative PH',
        })
    },

    getCMSLogout: function (req, res) {
        req.logout;
        req.session.destroy(function (err) { });
        res.redirect('cms-login')
    },

    getCMSHome: function (req, res) {
        if (req.session.user && req.cookies.user_sid) {
            res.render('cms-home', {
                layout: '/layouts/cms-layout',
                title: 'CMS Home | The Initiative PH',
                home_active: true,
            })
        }
        else {
            res.redirect('cms-login')
        }
    },

    getCMSApplication: function (req, res) {
        if (req.session.user && req.cookies.user_sid) {
            res.render('cms-application', {
                layout: '/layouts/cms-layout',
                title: 'CMS Application | The Initiative PH',
                application_active: true,
            })
        }
        else {
            res.redirect('cms-login')
        }
    },

    getCMSEditApplication: function (req, res) {
        if (req.session.user && req.cookies.user_sid) {
            res.render('cms-edit-application', {
                layout: '/layouts/cms-layout',
                title: 'CMS Application Form Edit | The Initiative PH',
                application_active: true,
            })
        }
        else {
            res.redirect('cms-login')
        }
    },

    getCMSEditPreApplication: function (req, res) {
        if (req.session.user && req.cookies.user_sid) {
            res.render('cms-edit-pre-application', {
                layout: '/layouts/cms-layout',
                title: 'CMS Pre-Application Form Edit | The Initiative PH',
                application_active: true,
            })
        }
        else {
            res.redirect('cms-login')
        }
    },

    getCMSApplicant: function (req, res) {
        var MongoClient = require('mongodb').MongoClient;
        // var url = "mongodb://localhost:27017/tiph";
        MongoClient.connect(url, { useUnifiedTopology: true },
            function (err, db) {
                if (err) throw err;
                var preappArray = [];
                var appArray = [];
                var dbo = db.db("tiph");
                var cursor = dbo.collection("preapps").find();
                var cursor1 = dbo.collection("apps").find();
                cursor.forEach(function (doc, err) {
                    preappArray.push(doc);
                },
                    function () {
                        cursor1.forEach(function (doc, err) {
                            appArray.push(doc);
                        },
                            function () {
                                if (req.session.user && req.cookies.user_sid) {
                                    res.render('cms-applicant', {
                                        layout: '/layouts/cms-layout',
                                        title: 'CMS Applicants | The Initiative PH',
                                        applicant_active: true,
                                        preapp_info: preappArray,
                                        app_info: appArray,
                                    });
                                }
                                else {
                                    res.redirect('cms-login')
                                }
                                db.close();
                            });
                    });
            });
    },

    getCMSAdmin: function (req, res) {
        if (req.session.user && req.cookies.user_sid) {
            res.render('cms-admin', {
                layout: '/layouts/cms-layout',
                title: 'CMS Admin | The Initiative PH',
                admin_active: true,
            })
        }
        else {
            res.redirect('cms-login')
        }
    },

    getCMSNewAdmin: function (req, res) {
        if (req.session.user && req.cookies.user_sid) {
            res.render('cms-admin-new', {
                layout: '/layouts/cms-layout',
                title: 'CMS Add Admin | The Initiative PH',
                admin_active: true,
            })
        }
        else {
            res.redirect('cms-login')
        }
    },

    getCMSEditAdmin: function (req, res) {
        if (req.session.user && req.cookies.user_sid) {
            res.render('cms-admin-edit', {
                layout: '/layouts/cms-layout',
                title: 'CMS Edit Admin | The Initiative PH',
                admin_active: true,
            })
        }
        else {
            res.redirect('cms-login')
        }
    },

    getCMSBlog: function (req, res) {
        var MongoClient = require('mongodb').MongoClient;
        // var url = "mongodb://localhost:27017/tiph";
        MongoClient.connect(url, { useUnifiedTopology: true },
            function (err, db) {
                if (err) throw err;
                var blogArray = [];
                var dbo = db.db("tiph");
                var cursor = dbo.collection("blogs").find();
                cursor.forEach(function (doc, err) {
                    blogArray.push(doc);
                },
                    function () {
                        if (req.session.user && req.cookies.user_sid) {
                            res.render('cms-blog', {
                                layout: '/layouts/cms-layout',
                                title: 'CMS Blog | The Initiative PH',
                                blog_active: true,
                                blog_info: blogArray,
                            });
                        }
                        else {
                            res.redirect('cms-login')
                        }
                        db.close();
                    });
            });
    },

    getCMSBlogPage: function (req, res) {
        if (req.session.user && req.cookies.user_sid) {
            res.render('cms-blog-page', {
                layout: '/layouts/cms-layout',
                title: 'CMS Blog Edit | The Initiative PH',
                blog_active: true,
            })
        }
        else {
            res.redirect('cms-login')
        }
    },

    getCMSBlogNewPage: function (req, res) {
        if (req.session.user && req.cookies.user_sid) {
            res.render('cms-blog-new-page', {
                layout: '/layouts/cms-layout',
                title: 'CMS New Blog Entry | The Initiative PH',
                blog_active: true,
            })
        }
        else {
            res.redirect('cms-login')
        }
    },

    getCMSProject: function (req, res) {
        var MongoClient = require('mongodb').MongoClient;
        // var url = "mongodb://localhost:27017/tiph";
        MongoClient.connect(url, { useUnifiedTopology: true },
            function (err, db) {
                if (err) throw err;
                var projArray = [];
                var dbo = db.db("tiph");
                var cursor = dbo.collection("projects").find();
                cursor.forEach(function (doc, err) {
                    projArray.push(doc);
                },
                    function () {
                        if (req.session.user && req.cookies.user_sid) {
                            res.render('cms-project', {
                                layout: '/layouts/cms-layout',
                                title: 'CMS Project | The Initiative PH',
                                project_active: true,
                                proj_info: projArray,
                            });
                        }
                        else {
                            res.redirect('cms-login')
                        }
                        db.close();
                    });
            });
        //        res.render('cms-project', {
        //            layout: '/layouts/cms-layout',
        //            title: 'CMS Project | The Initiative PH',
        //            project_active: true,
        //        })
    },

    getCMSProjectPage: function (req, res) {
        if (req.session.user && req.cookies.user_sid) {
            res.render('cms-project-page', {
                layout: '/layouts/cms-layout',
                title: 'CMS Project Edit | The Initiative PH',
                project_active: true,
            })
        }
        else {
            res.redirect('cms-login')
        }
    },

    getCMSProjectNewPage: function (req, res) {
        if (req.session.user && req.cookies.user_sid) {
            res.render('cms-project-new-page', {
                layout: '/layouts/cms-layout',
                title: 'CMS New Project Page | The Initiative PH',
                project_active: true,
            })
        }
        else {
            res.redirect('cms-login')
        }
    },

    getCMSDonate: function (req, res) {
        var MongoClient = require('mongodb').MongoClient;
        MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
            if (err) throw err;
            var resultArray = [];
            var dbo = db.db("tiph");
            var cursor = dbo.collection("donates").find();
            cursor.forEach(function (doc, err) {
                resultArray.push(doc);
            },
                function () {
                    if (req.session.user && req.cookies.user_sid) {
                        res.render('cms-donate', {
                            layout: '/layouts/cms-layout',
                            title: 'CMS Donate | The Initiative PH',
                            donate_active: true,
                            donate_info: resultArray,
                        });
                    }
                    else {
                        res.redirect('cms-login')
                    }
                    db.close();
                });

        });
    },

    getCMSNewDonate: function (req, res) {
        if (req.session.user && req.cookies.user_sid) {
            res.render('cms-donation-new-option', {
                layout: '/layouts/cms-layout',
                title: 'CMS Add Donation Option | The Initiative PH',
                donate_active: true,
            })
        }
        else {
            res.redirect('cms-login')
        }
    },

    getCMSEditDonate: function (req, res) {
        if (req.session.user && req.cookies.user_sid) {
            var donate_type = req.query.type;
            var donate_name = req.query.name;
            var donate_number = req.query.num;
            var donate_id = req.query.id;

            res.render('cms-edit-donation', {
                layout: '/layouts/cms-layout',
                title: 'CMS Edit Donation Option | The Initiative PH',
                donate_type: donate_type,
                donate_name: donate_name,
                donate_number: donate_number,
                donate_id: donate_id,
                donate_active: true,
            })
        }
        else {
            res.redirect('cms-login')
        }
    },
}

// enables to export controller object when called in another .js file
module.exports = controller;