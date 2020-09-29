// import module from db.js in models directory
const database = require('../models/db.js');
const Donate = require('../models/DonateModel.js');
const Home = require('../models/HomeModel.js');
const About = require('../models/AboutModel.js');
const Department = require('../models/DepartmentModel.js');
const Blog = require('../models/BlogModel.js');
const Project = require('../models/ProjectModel.js');
const User = require('../models/UserModel.js');
const PreApp = require('../models/PreAppModel.js');
const App = require('../models/AppModel.js');
const PreAppForm = require('../models/PreAppFormModel.js');
const AppForm = require('../models/AppFormModel.js');
const Position = require('../models/PositionModel.js');

// URL of MongoDB database
const url = "mongodb://localhost:27017/tiph";

// define objects for client request functions for a certain path in the server
const controller = {

    getHomePage: function (req, res) {
        Project.countDocuments({ proj_showcase: true }, function (err, count) {
            database.findOne(Home, {}, {}, function (home) {
                if (count == 0) {
                    res.render('home', {
                        layout: '/layouts/main',
                        title: 'Home | The Initiative PH',
                        home_active: true,
                        home_content: home,
                    })
                } else {
                    database.findOne(Project, { proj_showcase: true }, {}, function (carouselActive) {
                        database.findMany(Project, { proj_showcase: true, _id: { $ne: carouselActive._id } }, {}, function (carouselContent) {
                            res.render('home', {
                                layout: '/layouts/main',
                                title: 'Home | The Initiative PH',
                                home_active: true,
                                home_content: home,
                                homeactive: carouselActive,
                                home_carousel: carouselContent,
                            })
                        });
                    });
                }
            });
        });
    },

    getAboutUs: function (req, res) {
        About.countDocuments({}, function (err, count_about) {
            Department.countDocuments({}, function (err, count_department) {
                if (count_about == 0 || count_department == 0) {
                    database.findOne(Home, {}, {}, function (home) {
                        res.render('about', {
                            layout: '/layouts/main',
                            title: 'About | The Initiative PH',
                            about_active: true,
                            home_content: home,
                        })
                    });
                } else {
                    database.findOne(About, {}, {}, function (aboutContent) {
                        database.findMany(Department, {}, {}, function (deptContent) {
                            database.findOne(Home, {}, {}, function (home) {
                                res.render('about', {
                                    layout: '/layouts/main',
                                    title: 'About | The Initiative PH',
                                    about_active: true,
                                    about_content: aboutContent,
                                    department_content: deptContent,
                                    home_content: home,
                                })
                            });
                        });
                    });
                }
            });
        });
    },

    getPreApp: function (req, res) {
        database.findOne(PreAppForm, {}, {}, function (preapp) {
            database.findOne(Home, {}, {}, function (home) {
                if (home.home_preapp_button) {
                    res.render('pre-application', {
                        layout: '/layouts/main',
                        title: 'Pre-Application | The Initiative PH',
                        volunteer_active: true,
                        preform_year: preapp.preform_year,
                        preform_desc: preapp.preform_desc,
                        home_content: home,
                    })
                } else {
                    res.redirect('/unavailable');
                }
            });
        });

        // res.render('pre-application', {
        //     layout: '/layouts/main',
        //     title: 'Pre-Application | The Initiative PH',
        //     volunteer_active: true,
        // })
    },

    getApplication: function (req, res) {
        database.findOne(AppForm, {}, {}, function (appsform) {
            database.findMany(Department, {}, {}, function (departmentArray) {
                database.findMany(Position, {}, {}, function (positionArray) {
                    database.findOne(Home, {}, {}, function (home) {
                        if (home.home_preapp_button) {
                            res.redirect('/unavailable');
                        } else {
                            res.render('application', {
                                layout: '/layouts/main',
                                title: 'Application | The Initiative PH',
                                volunteer_active: true,
                                department_info: departmentArray,
                                position_info: positionArray,
                                appform_year: appsform.appform_year,
                                appform_desc: appsform.appform_desc,
                                home_content: home,
                            })
                        }
                    })
                })
            })
        })
    },

    getProjects: function (req, res, next) {
        Project.countDocuments({}, function (err, count) {
            if (count == 0) {
                database.findOne(Home, {}, {}, function (home) {
                    res.render('projects', {
                        layout: '/layouts/main',
                        title: 'Projects | The Initiative PH',
                        projects_active: true,
                        home_content: home,
                    })
                });
            }
            else {
                Project.countDocuments({ proj_published: true }, function (err, count) {
                    if (count == 0) {
                        database.findOne(Home, {}, {}, function (home) {
                            res.render('projects', {
                                layout: '/layouts/main',
                                title: 'Projects | The Initiative PH',
                                projects_active: true,
                                home_content: home,
                                projectMessage: 'There are currently no project entries published.',
                                count: count,
                            })
                        });
                    }
                    else {
                        var perPage = 5;
                        var page = req.params.page || 1;
                        var sort_by = { proj_date: -1 };
                        var sort_string = 'ddate';
                        var status = 'All';
                        var if_search = false;

                        proj_sort = req.body.proj_sort_by;

                        switch (proj_sort) {
                            case 'adate':
                                sort_by = { proj_date: 1 };
                                sort_string = 'adate';
                                break;
                            case 'ddate':
                                sort_by = { proj_date: -1 };
                                sort_string = 'ddate';
                                break;
                            case 'atitle':
                                sort_by = { proj_title: 1 };
                                sort_string = 'atitle';
                                break;
                            case 'dtitle':
                                sort_by = { proj_title: -1 };
                                sort_string = 'dtitle';
                                break;
                        }

                        Project
                            .find({ proj_published: true })
                            .sort(sort_by)
                            .skip((perPage * page) - perPage)
                            .limit(perPage)
                            .exec(function (err, projArray) {
                                Project.countDocuments({ proj_published: true }).exec(function (err, count) {
                                    if (err) return next(err)
                                    database.findOne(Home, {}, {}, function (home) {
                                        res.render('projects', {
                                            layout: '/layouts/main',
                                            title: 'Projects | The Initiative PH',
                                            projects_active: true,
                                            proj_info: projArray,
                                            current: page,
                                            pages: Math.ceil(count / perPage),
                                            home_content: home,
                                            count: count,
                                            sort_string: sort_string,
                                            status: status,
                                            if_search: if_search,
                                        });
                                    });
                                });
                            });
                    }
                });
            }
        });
    },

    getProjectsSearch: function (req, res, next) {
        Project.countDocuments({}, function (err, count) {
            if (count == 0) {
                database.findOne(Home, {}, {}, function (home) {
                    res.render('projects', {
                        layout: '/layouts/main',
                        title: 'Projects | The Initiative PH',
                        projects_active: true,
                        home_content: home,
                    })
                });
            }
            else {
                var search = req.params.string;
                Project.countDocuments({ proj_published: true, proj_title: { $regex: new RegExp(".*" + search + ".*", "i") } }, function (err, count) {
                    if (count == 0) {
                        database.findOne(Home, {}, {}, function (home) {
                            res.render('projects', {
                                layout: '/layouts/main',
                                title: 'Projects | The Initiative PH',
                                projects_active: true,
                                home_content: home,
                                projectMessage: 'There are currently no project entries published.',
                                count: count,
                            })
                        });
                    }
                    else {
                        var perPage = 5;
                        var page = req.params.page || 1;
                        var sort_by = { proj_date: -1 };
                        var sort_string = 'ddate';
                        var status = 'All';
                        var if_search = true;

                        proj_sort = req.body.proj_sort_by;

                        switch (proj_sort) {
                            case 'adate':
                                sort_by = { proj_date: 1 };
                                sort_string = 'adate';
                                break;
                            case 'ddate':
                                sort_by = { proj_date: -1 };
                                sort_string = 'ddate';
                                break;
                            case 'atitle':
                                sort_by = { proj_title: 1 };
                                sort_string = 'atitle';
                                break;
                            case 'dtitle':
                                sort_by = { proj_title: -1 };
                                sort_string = 'dtitle';
                                break;
                        }

                        Project
                            .find({ proj_published: true, proj_title: { $regex: new RegExp(".*" + search + ".*", "i") } })
                            .sort(sort_by)
                            .skip((perPage * page) - perPage)
                            .limit(perPage)
                            .exec(function (err, projArray) {
                                Project.countDocuments({ proj_published: true, proj_title: { $regex: new RegExp(".*" + search + ".*", "i") } }).exec(function (err, count) {
                                    if (err) return next(err)
                                    database.findOne(Home, {}, {}, function (home) {
                                        res.render('projects', {
                                            layout: '/layouts/main',
                                            title: 'Projects | The Initiative PH',
                                            projects_active: true,
                                            proj_info: projArray,
                                            current: page,
                                            pages: Math.ceil(count / perPage),
                                            home_content: home,
                                            count: count,
                                            sort_string: sort_string,
                                            status: status,
                                            search: search,
                                            if_search: if_search,
                                        });
                                    });
                                });
                            });
                    }
                });
            }
        });
    },

    getProjectsApproved: function (req, res) {
        Project.countDocuments({}, function (err, count) {
            if (count == 0) {
                database.findOne(Home, {}, {}, function (home) {
                    res.render('projects', {
                        layout: '/layouts/main',
                        title: 'Projects | The Initiative PH',
                        projects_active: true,
                        no_proj: true,
                        home_content: home,
                    })
                });
            } else {
                var perPage = 5
                var page = req.params.page || 1
                var sort_by = { proj_date: -1 }
                var sort_string = 'ddate'
                var status = 'Approved'

                proj_sort = req.body.proj_sort_by;

                switch (proj_sort) {
                    case 'adate':
                        sort_by = { proj_date: 1 };
                        sort_string = 'adate';
                        break;
                    case 'ddate':
                        sort_by = { proj_date: -1 };
                        sort_string = 'ddate';
                        break;
                    case 'atitle':
                        sort_by = { proj_title: 1 };
                        sort_string = 'atitle';
                        break;
                    case 'dtitle':
                        sort_by = { proj_title: -1 };
                        sort_string = 'dtitle';
                        break;
                }

                Project
                    .find({ proj_status: 'Approved' })
                    .sort(sort_by)
                    .skip((perPage * page) - perPage)
                    .limit(perPage)
                    .exec(function (err, projArray) {
                        Project.find({ proj_status: 'Approved' }).countDocuments().exec(function (err, count) {
                            if (err) return next(err)
                            database.findOne(Home, {}, {}, function (home) {
                                res.render('projects', {
                                    layout: '/layouts/main',
                                    title: 'Projects | The Initiative PH',
                                    projects_active: true,
                                    proj_info: projArray,
                                    current: page,
                                    pages: Math.ceil(count / perPage),
                                    home_content: home,
                                    sort_string: sort_string,
                                    status: status,
                                });
                            });
                        });
                    });
            }
        });
    },

    getProjectsOngoing: function (req, res) {
        Project.find({ proj_status: 'Ongoing' }).countDocuments({}, function (err, count) {
            if (count == 0) {
                database.findOne(Home, {}, {}, function (home) {
                    res.render('projects', {
                        layout: '/layouts/main',
                        title: 'Projects | The Initiative PH',
                        projects_active: true,
                        home_content: home,
                    })
                });
            } else {
                var perPage = 5
                var page = req.params.page || 1
                var sort_by = { proj_date: -1 }
                var sort_string = 'ddate'
                var status = 'Ongoing'

                proj_sort = req.body.proj_sort_by;

                switch (proj_sort) {
                    case 'adate':
                        sort_by = { proj_date: 1 };
                        sort_string = 'adate';
                        break;
                    case 'ddate':
                        sort_by = { proj_date: -1 };
                        sort_string = 'ddate';
                        break;
                    case 'atitle':
                        sort_by = { proj_title: 1 };
                        sort_string = 'atitle';
                        break;
                    case 'dtitle':
                        sort_by = { proj_title: -1 };
                        sort_string = 'dtitle';
                        break;
                }

                Project
                    .find({ proj_status: 'Ongoing' })
                    .sort(sort_by)
                    .skip((perPage * page) - perPage)
                    .limit(perPage)
                    .exec(function (err, projArray) {
                        Project.find({ proj_status: 'Ongoing' }).countDocuments().exec(function (err, count) {
                            if (err) return next(err)
                            database.findOne(Home, {}, {}, function (home) {
                                res.render('projects', {
                                    layout: '/layouts/main',
                                    title: 'Projects | The Initiative PH',
                                    projects_active: true,
                                    proj_info: projArray,
                                    current: page,
                                    pages: Math.ceil(count / perPage),
                                    home_content: home,
                                    sort_string: sort_string,
                                    status: status,
                                });
                            });
                        });
                    });
            }
        });
    },

    getProjectsProposed: function (req, res) {
        Project.find({ proj_status: 'Proposed' }).countDocuments({}, function (err, count) {
            if (count == 0) {
                database.findOne(Home, {}, {}, function (home) {
                    res.render('projects', {
                        layout: '/layouts/main',
                        title: 'Projects | The Initiative PH',
                        projects_active: true,
                        home_content: home
                    })
                });
            } else {
                var perPage = 5
                var page = req.params.page || 1
                var sort_by = { proj_date: -1 }
                var sort_string = 'ddate'
                var status = 'Proposed'

                proj_sort = req.body.proj_sort_by;

                switch (proj_sort) {
                    case 'adate':
                        sort_by = { proj_date: 1 };
                        sort_string = 'adate';
                        break;
                    case 'ddate':
                        sort_by = { proj_date: -1 };
                        sort_string = 'ddate';
                        break;
                    case 'atitle':
                        sort_by = { proj_title: 1 };
                        sort_string = 'atitle';
                        break;
                    case 'dtitle':
                        sort_by = { proj_title: -1 };
                        sort_string = 'dtitle';
                        break;
                }

                Project
                    .find({ proj_status: 'Proposed' })
                    .sort(sort_by)
                    .skip((perPage * page) - perPage)
                    .limit(perPage)
                    .exec(function (err, projArray) {
                        Project.find({ proj_status: 'Proposed' }).countDocuments().exec(function (err, count) {
                            if (err) return next(err)
                            database.findOne(Home, {}, {}, function (home) {
                                res.render('projects', {
                                    layout: '/layouts/main',
                                    title: 'Projects | The Initiative PH',
                                    projects_active: true,
                                    proj_info: projArray,
                                    current: page,
                                    pages: Math.ceil(count / perPage),
                                    home_content: home,
                                    sort_string: sort_string,
                                    status: status,
                                });
                            });
                        });
                    });
            }
        });
    },

    getBlogs: function (req, res) {
        Blog.countDocuments({}, function (err, count) {
            if (count == 0) {
                database.findOne(Home, {}, {}, function (home) {
                    res.render('blog', {
                        layout: '/layouts/main',
                        title: 'Blogs | The Initiative PH',
                        blog_active: true,
                        home_content: home,
                    })
                });
            }
            else {
                Blog.countDocuments({ blog_published: true }, function (err, count) {
                    if (count == 0) {
                        database.findOne(Home, {}, {}, function (home) {
                            res.render('blog', {
                                layout: '/layouts/main',
                                title: 'Blogs | The Initiative PH',
                                blog_active: true,
                                home_content: home,
                                blogMessage: 'There are currently no blog entries published.',
                                count: count,
                            })
                        });
                    }
                    else {
                        var blog_sort = req.params.sort;
                        var perPage = 5;
                        var page = req.params.page || 1;
                        // var sort_by = { blog_date: -1 };
                        var sort_by = { blog_date: -1 };
                        // var sort_string = blog_sort;
                        var sort_string = 'ddate';
                        var if_search = false;
                        var if_sort;

                        console.log(blog_sort);

                        // blog_sort = req.body.blog_sort_by;

                        switch (blog_sort) {
                            case 'adate':
                                sort_by = { blog_date: 1 };
                                sort_string = 'adate';
                                if_sort = true;
                                break;
                            case 'ddate':
                                sort_by = { blog_date: -1 };
                                sort_string = 'ddate';
                                if_sort = true;
                                break;
                            case 'atitle':
                                sort_by = { blog_title: 1 };
                                sort_string = 'atitle';
                                if_sort = true;
                                break;
                            case 'dtitle':
                                sort_by = { blog_title: -1 };
                                sort_string = 'dtitle';
                                if_sort = true;
                                break;
                        }

                        Blog
                            .find({ blog_published: true })
                            .sort(sort_by)
                            .skip((perPage * page) - perPage)
                            .limit(perPage)
                            .exec(function (err, blogArray) {
                                Blog.countDocuments({ blog_published: true }).exec(function (err, count) {
                                    if (err) return next(err)
                                    database.findOne(Home, {}, {}, function (home) {
                                        res.render('blog', {
                                            layout: '/layouts/main',
                                            title: 'Blogs | The Initiative PH',
                                            blog_active: true,
                                            blog_info: blogArray,
                                            current: page,
                                            pages: Math.ceil(count / perPage),
                                            home_content: home,
                                            count: count,
                                            sort_string: sort_string,
                                            if_search: if_search,
                                            if_sort: if_sort,
                                        });
                                    });
                                });

                            });
                    }
                });
            }
        });
    },

    getBlogsSearch: function (req, res) {
        Blog.countDocuments({}, function (err, count) {
            if (count == 0) {
                database.findOne(Home, {}, {}, function (home) {
                    res.render('blog', {
                        layout: '/layouts/main',
                        title: 'Blogs | The Initiative PH',
                        blog_active: true,
                        home_content: home,
                    })
                });
            }
            else {
                var search = req.params.string;
                Blog.countDocuments({ blog_published: true, blog_title: { $regex: new RegExp(".*" + search + ".*", "i") } }, function (err, count) {
                    if (count == 0) {
                        database.findOne(Home, {}, {}, function (home) {
                            res.render('blog', {
                                layout: '/layouts/main',
                                title: 'Blogs | The Initiative PH',
                                blog_active: true,
                                home_content: home,
                                blogMessage: 'There are currently no blog entries published.',
                                count: count,
                            })
                        });
                    }
                    else {
                        var perPage = 5;
                        var page = req.params.page || 1;
                        var sort_by = { blog_date: -1 };
                        var sort_string = 'ddate';
                        var if_search = true;

                        blog_sort = req.body.blog_sort_by;

                        switch (blog_sort) {
                            case 'adate':
                                sort_by = { blog_date: 1 };
                                sort_string = 'adate';
                                break;
                            case 'ddate':
                                sort_by = { blog_date: -1 };
                                sort_string = 'ddate';
                                break;
                            case 'atitle':
                                sort_by = { blog_title: 1 };
                                sort_string = 'atitle';
                                break;
                            case 'dtitle':
                                sort_by = { blog_title: -1 };
                                sort_string = 'dtitle';
                                break;
                        }

                        Blog
                            .find({ blog_published: true, blog_title: { $regex: new RegExp(".*" + search + ".*", "i") } })
                            .sort(sort_by)
                            .skip((perPage * page) - perPage)
                            .limit(perPage)
                            .exec(function (err, blogArray) {
                                Blog.countDocuments({ blog_published: true, blog_title: { $regex: new RegExp(".*" + search + ".*", "i") } }).exec(function (err, count) {
                                    if (err) return next(err)
                                    database.findOne(Home, {}, {}, function (home) {
                                        res.render('blog', {
                                            layout: '/layouts/main',
                                            title: 'Blogs | The Initiative PH',
                                            blog_active: true,
                                            blog_info: blogArray,
                                            current: page,
                                            pages: Math.ceil(count / perPage),
                                            home_content: home,
                                            count: count,
                                            sort_string: sort_string,
                                            search: search,
                                            if_search: if_search,
                                        });
                                    });
                                });

                            });
                    }
                });
            }
        });
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
        database.findOne(Home, {}, {}, function (home) {
            res.render('contact-us', {
                layout: '/layouts/main',
                title: 'Contact Us | The Initiative PH',
                contact_active: true,
                home_content: home,
            })
        });
    },

    getDonate: function (req, res) {
        Donate.countDocuments({ donate_visible: true }, function (err, count) {
            if (count == 0) {
                database.findOne(Home, {}, {}, function (home) {
                    res.render('donate', {
                        layout: '/layouts/main',
                        title: 'Donate | The Initiative PH',
                        donate_active: true,
                        donateMessage: 'There is currently no donation option available.',
                        home_content: home,
                    });
                });
            }
            else {
                database.findMany(Donate, {}, {}, function (donateArray) {
                    database.findOne(Home, {}, {}, function (home) {
                        res.render('donate', {
                            layout: '/layouts/main',
                            title: 'Donate | The Initiative PH',
                            donate_active: true,
                            donate_info: donateArray,
                            home_content: home,
                        });
                    });
                });
            }
        })
    },

    get404: function (req, res) {
        database.findOne(Home, {}, {}, function (home) {
            res.render('404', {
                layout: '/layouts/main',
                title: '404 Not Found | The Initiative PH',
                title404: '404 Not Found',
                message: 'We couldn’t find the page you\'re looking for. It may have been moved or not exist entirely',
                links: [
                    { path: '/home', name: 'Home' },
                    { path: '/projects', name: 'Projects' },
                    { path: '/blog', name: 'Blogs' },
                ],
                home_content: home,
            })
        });
    },

    getcms404: function (req, res) {
        if (req.session.user && req.cookies.user_sid) {
            res.render('cms-404', {
                layout: '/layouts/cms-layout',
                title: 'CMS 404 Not Found | The Initiative PH',
                name: req.session.name,
                type: req.session.type,
                userid: req.session.userid,
            })
        }
        else {
            res.redirect('cms-login')
        }
    },

    getProjectNotFound(req, res) {
        database.findOne(Home, {}, {}, function (home) {
            res.render('404', {
                layout: '/layouts/main',
                title: 'Project Not Found | The Initiative PH',
                title404: 'Project not Found',
                message: 'We couldn’t find the project you\'re looking for. It may have been been unpublished, deleted, or not exist entirely',
                links: [
                    { path: '/projects', name: 'Projects' },
                    { path: '/home', name: 'Home' },
                ],
                home_content: home,
            })
        });
    },

    getBlogNotFound(req, res) {
        database.findOne(Home, {}, {}, function (home) {
            res.render('404', {
                layout: '/layouts/main',
                title: 'Blog Not Found | The Initiative PH',
                title404: 'Blog not Found',
                message: 'We couldn’t find the blog you\'re looking for. It may have been unpublished, deleted, or not exist entirely',
                links: [
                    { path: '/blog', name: 'Blogs' },
                    { path: '/home', name: 'Home' },
                ],
                home_content: home,
            })
        });
    },

    getUnavailable(req, res) {
        database.findOne(Home, {}, {}, function (home) {
            var type, link, retype, relink;
            if (home.home_preapp_button) {
                type = "Applications";
                link = "/application";
                retype = "Pre Applications";
                relink = "/pre-application";
            }
            else {
                type = "Pre Applications";
                link = "/pre-application";
                retype = "Applications";
                relink = "/application";
            }

            res.render('404', {
                layout: '/layouts/main',
                title: 'Unavailable | The Initiative PH',
                title404: 'Unavailable',
                message: type + ' are unavailable at the moment.',
                links: [
                    { path: relink, name: retype },
                    { path: '/home', name: 'Home' },
                ],
                home_content: home,
            })
        });
    },

    getCMSLogin: function (req, res) {
        database.findOne(Home, {}, {}, function (home) {
            res.render('cms-login', {
                layout: '/layouts/main',
                title: 'Login | The Initiative PH',
                home_content: home
            })
        });
    },

    getCMSLogout: function (req, res) {
        req.logout;
        req.session.destroy(function (err) { });
        res.redirect('cms-login')
    },

    getCMSHome: function (req, res) {
        if (req.session.user && req.cookies.user_sid) {
            database.findOne(Home, {}, {}, function (home) {
                res.render('cms-home', {
                    layout: '/layouts/cms-layout',
                    title: 'CMS Home | The Initiative PH',
                    home_active: true,
                    name: req.session.name,
                    type: req.session.type,
                    userid: req.session.userid,
                    home_content: home,
                })
            });
        }
        else {
            res.redirect('cms-login')
        }
    },

    getCMSAbout: function (req, res) {
        if (req.session.user && req.cookies.user_sid) {
            About.countDocuments({}, function (err, count) {
                if (count == 0) {
                    res.render('cms-about', {
                        layout: '/layouts/cms-layout',
                        title: 'CMS About Page | The Initiative PH',
                        about_active: true,
                        about_page_active: true,
                        name: req.session.name,
                        type: req.session.type,
                        userid: req.session.userid,
                    })
                } else {
                    database.findOne(About, {}, {}, function (aboutContent) {
                        res.render('cms-about', {
                            layout: '/layouts/cms-layout',
                            title: 'CMS About Page | The Initiative PH',
                            about_active: true,
                            about_page_active: true,
                            name: req.session.name,
                            type: req.session.type,
                            userid: req.session.userid,
                            about_content: aboutContent,
                        })
                    });
                }
            });
        }
        else {
            res.redirect('cms-login')
        }
    },

    getCMSDepartment: function (req, res) {
        if (req.session.user && req.cookies.user_sid) {
            Department.countDocuments({}, function (err, count) {
                if (count == 0) {
                    res.render('cms-department', {
                        layout: '/layouts/cms-layout',
                        title: 'CMS Departments | The Initiative PH',
                        about_active: true,
                        department_active: true,
                        name: req.session.name,
                        type: req.session.type,
                        userid: req.session.userid,
                    })
                } else {
                    database.findMany(Department, {}, {}, function (departmentArray) {
                        res.render('cms-department', {
                            layout: '/layouts/cms-layout',
                            title: 'CMS Departments | The Initiative PH',
                            about_active: true,
                            department_active: true,
                            name: req.session.name,
                            type: req.session.type,
                            userid: req.session.userid,
                            department_info: departmentArray,
                        })
                    });
                }
            });
        }
        else {
            res.redirect('cms-login')
        }
    },

    getCMSDepartmentNew: function (req, res) {
        if (req.session.user && req.cookies.user_sid) {
            res.render('cms-department-new', {
                layout: '/layouts/cms-layout',
                title: 'CMS New Department | The Initiative PH',
                about_active: true,
                department_active: true,
                name: req.session.name,
                type: req.session.type,
                userid: req.session.userid,
            })
        }
        else {
            res.redirect('cms-login')
        }
    },

    getCMSDepartmentEdit: function (req, res) {
        if (req.session.user && req.cookies.user_sid) {
            var query = req.query.id;
            database.findOne(Department, { _id: query }, {}, function (departmentContent) {
                res.render('cms-department-edit', {
                    layout: '/layouts/cms-layout',
                    title: 'CMS Edit Department | The Initiative PH',
                    about_active: true,
                    department_active: true,
                    name: req.session.name,
                    type: req.session.type,
                    userid: req.session.userid,
                    department_content: departmentContent,
                });
            });
        }
        else {
            res.redirect('cms-login')
        }
    },

    getCMSApplication: function (req, res) {
        if (req.session.user && req.cookies.user_sid) {
            database.findOne(PreAppForm, {}, {}, function (preappsform) {
                database.findOne(AppForm, {}, {}, function (appsform) {
                    res.render('cms-application', {
                        layout: '/layouts/cms-layout',
                        title: 'Manage Forms | The Initiative PH',
                        application_active: true,
                        forms_active: true,
                        name: req.session.name,
                        type: req.session.type,
                        userid: req.session.userid,
                        preappsform_id: preappsform._id,
                        appsform_id: appsform._id,
                    })
                })

            });
        }
        else {
            res.redirect('cms-login')
        }
    },

    //Replace department with Positions
    getCMSPositions: function (req, res) {
        if (req.session.user && req.cookies.user_sid) {
            Position.countDocuments({}, function (err, count) {
                if (count == 0) {
                    res.render('cms-positions', {
                        layout: '/layouts/cms-layout',
                        title: 'Manage Positions | The Initiative PH',
                        application_active: true,
                        positions_active: true,
                        name: req.session.name,
                        type: req.session.type,
                        userid: req.session.userid,
                    })
                }
                else {
                    var positionArray = [];
                    Position.distinct('position_name')
                        .then(docs => {
                            docs.forEach(
                                pos_name => positionArray.push({ pos_name })
                            )
                            res.render('cms-positions', {
                                layout: '/layouts/cms-layout',
                                title: 'Manage Positions | The Initiative PH',
                                application_active: true,
                                positions_active: true,
                                name: req.session.name,
                                type: req.session.type,
                                userid: req.session.userid,
                                position_info: positionArray,
                            })
                        })
                }
            });
        }
        else {
            res.redirect('cms-login')
        }
    },

    getCMSPositionNew: function (req, res) {
        if (req.session.user && req.cookies.user_sid) {
            res.render('cms-position-new', {
                layout: '/layouts/cms-layout',
                title: 'Add New Position | The Initiative PH',
                application_active: true,
                positions_active: true,
                name: req.session.name,
                type: req.session.type,
                userid: req.session.userid,
            })
        }
        else {
            res.redirect('cms-login')
        }
    },

    getCMSEditApplication: function (req, res) {
        var query = req.query.id;
        if (req.session.user && req.cookies.user_sid) {
            database.findOne(AppForm, { _id: query }, {}, function (app) {
                database.findMany(Department, {}, {}, function (departments) {
                    database.findMany(Position, {}, {}, function (positions) {
                        res.render('cms-edit-application', {
                            layout: '/layouts/cms-layout',
                            title: 'CMS Application Form Edit | The Initiative PH',
                            application_active: true,
                            name: req.session.name,
                            type: req.session.type,
                            userid: req.session.userid,
                            appform_year: app.appform_year,
                            appform_desc: app.appform_desc,
                            department_info: departments,
                            position_info: positions,
                        })
                    })
                })
            })
        }
        else {
            res.redirect('cms-login')
        }
    },

    getCMSEditPreApplication: function (req, res) {
        var query = req.query.id;
        if (req.session.user && req.cookies.user_sid) {
            database.findOne(PreAppForm, { _id: query }, {}, function (preapp) {
                res.render('cms-edit-pre-application', {
                    layout: '/layouts/cms-layout',
                    title: 'CMS Pre-Application Form Edit | The Initiative PH',
                    application_active: true,
                    name: req.session.name,
                    type: req.session.type,
                    userid: req.session.userid,
                    preform_year: preapp.preform_year,
                    preform_desc: preapp.preform_desc,
                })
            });
        }
        else {
            res.redirect('cms-login')
        }
    },

    getCMSApplicantPreOverview: function (req, res) {
        if (req.session.user && req.cookies.user_sid) {
            res.render('cms-applicant-pre-overview', {
                layout: '/layouts/cms-layout',
                title: 'CMS Volunteer Pre-Applicants | The Initiative PH',
                applicant_active: true,
                pre_app_active: true,
                name: req.session.name,
                type: req.session.type,
                userid: req.session.userid,
            })
        }
        else {
            res.redirect('cms-login')
        }
    },

    getCMSApplicantAppOverview: function (req, res) {
        if (req.session.user && req.cookies.user_sid) {
            res.render('cms-applicant-app-overview', {
                layout: '/layouts/cms-layout',
                title: 'CMS Volunteer Applicants | The Initiative PH',
                applicant_active: true,
                app_active: true,
                name: req.session.name,
                type: req.session.type,
                userid: req.session.userid,
            })
        }
        else {
            res.redirect('cms-login')
        }
    },

    getCMSApplicantPre: function (req, res) {
        if (req.session.user && req.cookies.user_sid) {
            PreApp.countDocuments({}, function (err, count) {
                if (count == 0) {
                    database.findMany(PreApp, {}, {}, function (preappArray) {
                        res.render('cms-applicant-pre', {
                            layout: '/layouts/cms-layout',
                            title: 'CMS Applicants | The Initiative PH',
                            applicant_active: true,
                            pre_app_active: true,
                            name: req.session.name,
                            type: req.session.type,
                            userid: req.session.userid,
                            preapp_info: preappArray,
                        })
                    });
                } else {
                    database.findMany(PreApp, {}, {}, function (preappArray) {
                        res.render('cms-applicant-pre', {
                            layout: '/layouts/cms-layout',
                            title: 'CMS Applicants | The Initiative PH',
                            applicant_active: true,
                            pre_app_active: true,
                            name: req.session.name,
                            type: req.session.type,
                            userid: req.session.userid,
                            preapp_info: preappArray,
                        })
                    });
                }
            });
        } else {
            res.redirect('cms-login')
        }
    },

    getCMSApplicantPreAccepted: function (req, res) {
        if (req.session.user && req.cookies.user_sid) {
            PreApp.countDocuments({}, function (err, count) {
                if (count == 0) {
                    database.findMany(PreApp, {}, {}, function (preappArray) {
                        res.render('cms-applicant-pre-accepted', {
                            layout: '/layouts/cms-layout',
                            title: 'CMS Applicants | The Initiative PH',
                            applicant_active: true,
                            pre_app_active: true,
                            name: req.session.name,
                            type: req.session.type,
                            userid: req.session.userid,
                            preapp_info: preappArray,
                        })
                    });
                } else {
                    database.findMany(PreApp, {}, {}, function (preappArray) {
                        res.render('cms-applicant-pre-accepted', {
                            layout: '/layouts/cms-layout',
                            title: 'CMS Applicants | The Initiative PH',
                            applicant_active: true,
                            pre_app_active: true,
                            name: req.session.name,
                            type: req.session.type,
                            userid: req.session.userid,
                            preapp_info: preappArray,
                        })
                    });
                }
            });
        } else {
            res.redirect('cms-login')
        }
    },

    getCMSApplicantPreRejected: function (req, res) {
        if (req.session.user && req.cookies.user_sid) {
            PreApp.countDocuments({}, function (err, count) {
                if (count == 0) {
                    database.findMany(PreApp, {}, {}, function (preappArray) {
                        res.render('cms-applicant-pre-rejected', {
                            layout: '/layouts/cms-layout',
                            title: 'CMS Applicants | The Initiative PH',
                            applicant_active: true,
                            pre_app_active: true,
                            name: req.session.name,
                            type: req.session.type,
                            userid: req.session.userid,
                            preapp_info: preappArray,
                        })
                    });
                } else {
                    database.findMany(PreApp, {}, {}, function (preappArray) {
                        res.render('cms-applicant-pre-rejected', {
                            layout: '/layouts/cms-layout',
                            title: 'CMS Applicants | The Initiative PH',
                            applicant_active: true,
                            pre_app_active: true,
                            name: req.session.name,
                            type: req.session.type,
                            userid: req.session.userid,
                            preapp_info: preappArray,
                        })
                    });
                }
            });
        } else {
            res.redirect('cms-login')
        }
    },

    getCMSApplicantPrePending: function (req, res) {
        if (req.session.user && req.cookies.user_sid) {
            PreApp.countDocuments({}, function (err, count) {
                if (count == 0) {
                    database.findMany(PreApp, {}, {}, function (preappArray) {
                        res.render('cms-applicant-pre-pending', {
                            layout: '/layouts/cms-layout',
                            title: 'CMS Applicants | The Initiative PH',
                            applicant_active: true,
                            pre_app_active: true,
                            name: req.session.name,
                            type: req.session.type,
                            userid: req.session.userid,
                            preapp_info: preappArray,
                        })
                    });
                } else {
                    database.findMany(PreApp, {}, {}, function (preappArray) {
                        res.render('cms-applicant-pre-pending', {
                            layout: '/layouts/cms-layout',
                            title: 'CMS Applicants | The Initiative PH',
                            applicant_active: true,
                            pre_app_active: true,
                            name: req.session.name,
                            type: req.session.type,
                            userid: req.session.userid,
                            preapp_info: preappArray,
                        })
                    });
                }
            });
        } else {
            res.redirect('cms-login')
        }
    },

    getCMSApplicantPreProf: function (req, res) {
        if (req.session.user && req.cookies.user_sid) {
            var query = req.query.id;
            database.findOne(PreApp, { _id: query }, {}, function (prof) {
                res.render('cms-pre-app-profile', {
                    layout: '/layouts/cms-layout',
                    title: prof.pre_firstname + ' ' + prof.pre_lastname + ' | The Initiative PH',
                    pre_id: prof._id,
                    pre_firstname: prof.pre_firstname,
                    pre_lastname: prof.pre_lastname,
                    pre_age: prof.pre_age,
                    pre_number: prof.pre_number,
                    pre_email: prof.pre_email,
                    pre_schoolcompany: prof.pre_schoolcompany,
                    pre_affiliation: prof.pre_affiliation,
                    pre_facebook: prof.pre_facebook,
                    pre_notify: prof.pre_notify,
                    pre_comments: prof.pre_comments,
                    pre_status: prof.pre_status,
                    pre_status_reason: prof.pre_status_reason,
                    applicant_active: true,
                    pre_app_active: true,
                    name: req.session.name,
                    type: req.session.type,
                    userid: req.session.userid,
                });
            });
        }
        else {
            res.redirect('cms-login')
        }
    },

    getCMSApplicantApp: function (req, res) {
        if (req.session.user && req.cookies.user_sid) {
            App.countDocuments({}, function (err, count) {
                if (count == 0) {
                    database.findMany(App, {}, {}, function (appArray) {
                        res.render('cms-applicant-app', {
                            layout: '/layouts/cms-layout',
                            title: 'CMS Applicants | The Initiative PH',
                            applicant_active: true,
                            app_active: true,
                            name: req.session.name,
                            type: req.session.type,
                            userid: req.session.userid,
                            app_info: appArray,
                        })
                    });
                } else {
                    database.findMany(App, {}, {}, function (appArray) {
                        res.render('cms-applicant-app', {
                            layout: '/layouts/cms-layout',
                            title: 'CMS Applicants | The Initiative PH',
                            applicant_active: true,
                            app_active: true,
                            name: req.session.name,
                            type: req.session.type,
                            userid: req.session.userid,
                            app_info: appArray,
                        })
                    });
                }
            });
        } else {
            res.redirect('cms-login')
        }
    },

    getCMSApplicantAppAccepted: function (req, res) {
        if (req.session.user && req.cookies.user_sid) {
            App.countDocuments({}, function (err, count) {
                if (count == 0) {
                    database.findMany(App, {}, {}, function (appArray) {
                        res.render('cms-applicant-app-accepted', {
                            layout: '/layouts/cms-layout',
                            title: 'CMS Applicants | The Initiative PH',
                            applicant_active: true,
                            app_active: true,
                            name: req.session.name,
                            type: req.session.type,
                            userid: req.session.userid,
                            app_info: appArray,
                        })
                    });
                } else {
                    database.findMany(App, {}, {}, function (appArray) {
                        res.render('cms-applicant-app-accepted', {
                            layout: '/layouts/cms-layout',
                            title: 'CMS Applicants | The Initiative PH',
                            applicant_active: true,
                            app_active: true,
                            name: req.session.name,
                            type: req.session.type,
                            userid: req.session.userid,
                            app_info: appArray,
                        })
                    });
                }
            });
        } else {
            res.redirect('cms-login')
        }
    },

    getCMSApplicantAppRejected: function (req, res) {
        if (req.session.user && req.cookies.user_sid) {
            App.countDocuments({}, function (err, count) {
                if (count == 0) {
                    database.findMany(App, {}, {}, function (appArray) {
                        res.render('cms-applicant-app-rejected', {
                            layout: '/layouts/cms-layout',
                            title: 'CMS Applicants | The Initiative PH',
                            applicant_active: true,
                            app_active: true,
                            name: req.session.name,
                            type: req.session.type,
                            userid: req.session.userid,
                            app_info: appArray,
                        })
                    });
                } else {
                    database.findMany(App, {}, {}, function (appArray) {
                        res.render('cms-applicant-app-rejected', {
                            layout: '/layouts/cms-layout',
                            title: 'CMS Applicants | The Initiative PH',
                            applicant_active: true,
                            app_active: true,
                            name: req.session.name,
                            type: req.session.type,
                            userid: req.session.userid,
                            app_info: appArray,
                        })
                    });
                }
            });
        } else {
            res.redirect('cms-login')
        }
    },

    getCMSApplicantAppPending: function (req, res) {
        if (req.session.user && req.cookies.user_sid) {
            App.countDocuments({}, function (err, count) {
                if (count == 0) {
                    database.findMany(App, {}, {}, function (appArray) {
                        res.render('cms-applicant-app-pending', {
                            layout: '/layouts/cms-layout',
                            title: 'CMS Applicants | The Initiative PH',
                            applicant_active: true,
                            app_active: true,
                            name: req.session.name,
                            type: req.session.type,
                            userid: req.session.userid,
                            app_info: appArray,
                        })
                    });
                } else {
                    database.findMany(App, {}, {}, function (appArray) {
                        res.render('cms-applicant-app-pending', {
                            layout: '/layouts/cms-layout',
                            title: 'CMS Applicants | The Initiative PH',
                            applicant_active: true,
                            app_active: true,
                            name: req.session.name,
                            type: req.session.type,
                            userid: req.session.userid,
                            app_info: appArray,
                        })
                    });
                }
            });
        } else {
            res.redirect('cms-login')
        }
    },

    getCMSApplicantProf: function (req, res) {
        if (req.session.user && req.cookies.user_sid) {
            var query = req.query.id;
            database.findOne(App, { _id: query }, {}, function (prof) {
                res.render('cms-app-profile', {
                    layout: '/layouts/cms-layout',
                    title: prof.app_firstname + ' ' + prof.app_lastname + ' | The Initiative PH',
                    app_id: prof._id,
                    app_firstname: prof.app_firstname,
                    app_lastname: prof.app_lastname,
                    app_nickname: prof.app_nickname,
                    app_email: prof.app_email,
                    app_bday: prof.app_bday,
                    app_cResidence: prof.app_cResidence,
                    app_schoolcompany: prof.app_schoolcompany,
                    app_number: prof.app_number,
                    app_facebook: prof.app_facebook,
                    app_twitter: prof.app_twitter,
                    app_findout: prof.app_findout,
                    app_expertise: prof.app_expertise,
                    app_dept1: prof.app_dept1,
                    app_position1: prof.app_position1,
                    app_dept2: prof.app_dept2,
                    app_position2: prof.app_position2,
                    app_reason: prof.app_reason,
                    app_portfolio: prof.app_portfolio,
                    app_status: prof.app_status,
                    app_status_reason: prof.app_status_reason,
                    applicant_active: true,
                    app_active: true,
                    name: req.session.name,
                    type: req.session.type,
                    userid: req.session.userid,
                });
            });
        }
        else {
            res.redirect('cms-login')
        }
    },

    getCMSAdmin: function (req, res) {
        var MongoClient = require('mongodb').MongoClient;
        MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
            if (err) throw err;
            var resultArray = [];
            var dbo = db.db("tiph");
            var cursor = dbo.collection("users").find();
            cursor.forEach(function (doc, err) {
                if (doc._id != req.session.userid) {
                    var converted = {
                        _id: doc._id,
                        name: doc.name,
                        username: doc.username,
                        password: doc.password,
                        userDepartment: doc.userDepartment,
                        userTypeMain: doc.userTypeMain ? "Yes" : "No"
                    }

                    resultArray.push(converted);
                }
            },
                function () {
                    if (req.session.user && req.cookies.user_sid && req.session.type) {
                        res.render('cms-admin', {
                            layout: '/layouts/cms-layout',
                            title: 'CMS Admin | The Initiative PH',
                            admin_active: true,
                            type: req.session.type,
                            name: req.session.name,
                            userid: req.session.userid,
                            admin_info: resultArray,
                        });
                    }
                    else if (!req.session.type) {
                        res.redirect('cms-home')
                    }
                    else {
                        res.redirect('cms-login')
                    }
                    db.close();
                });

        });
    },

    getCMSNewAdmin: function (req, res) {
        if (req.session.user && req.cookies.user_sid && req.session.type) {
            database.findMany(Department, {}, {}, function (departmentArray) {
                res.render('cms-admin-new', {
                    layout: '/layouts/cms-layout',
                    title: 'CMS Add Admin | The Initiative PH',
                    admin_active: true,
                    type: req.session.type,
                    name: req.session.name,
                    userid: req.session.userid,
                    department_info: departmentArray,
                })
            });

        }
        else if (!req.session.type) {
            res.redirect('cms-home')
        }
        else {
            res.redirect('cms-login')
        }
    },

    getCMSEditAdmin: function (req, res) {
        if (req.session.user && req.cookies.user_sid) {
            var query = req.session.userid;
            database.findOne(User, { _id: query }, {}, function (admin) {
                database.findMany(Department, {}, {}, function (departmentArray) {
                    res.render('cms-admin-edit', {
                        layout: '/layouts/cms-layout',
                        title: 'CMS Edit Admin | The Initiative PH',
                        admin_name: admin.name,
                        admin_username: admin.username,
                        admin_dept: admin.userDepartment,
                        type: req.session.type,
                        name: req.session.name,
                        userid: req.session.userid,
                        department_info: departmentArray,
                    });
                })
            });
        }
        else {
            res.redirect('cms-login')
        }
    },

    getCMSBlog: function (req, res) {
        if (req.session.user && req.cookies.user_sid) {
            Blog.countDocuments({}, function (err, count) {
                if (count == 0) {
                    database.findMany(Blog, {}, {}, function (blogArray) {
                        res.render('cms-blog', {
                            layout: '/layouts/cms-layout',
                            title: 'CMS Blog | The Initiative PH',
                            blog_active: true,
                            type: req.session.type,
                            name: req.session.name,
                            userid: req.session.userid,
                            blog_info: blogArray,
                        })
                    });
                } else {
                    database.findMany(Blog, {}, {}, function (blogArray) {
                        res.render('cms-blog', {
                            layout: '/layouts/cms-layout',
                            title: 'CMS Blog | The Initiative PH',
                            blog_active: true,
                            type: req.session.type,
                            name: req.session.name,
                            userid: req.session.userid,
                            blog_info: blogArray,
                        })
                    });
                }
            });
        } else {
            res.redirect('cms-login')
        }
    },

    getCMSBlogPage: function (req, res) {
        if (req.session.user && req.cookies.user_sid) {
            var query = req.query.id;
            database.findOne(Blog, { _id: query }, {}, function (blog) {
                res.render('cms-blog-page', {
                    layout: '/layouts/cms-layout',
                    title: 'CMS Blog Edit | The Initiative PH',
                    blog_content: blog,
                    blog_active: true,
                    name: req.session.name,
                    type: req.session.type,
                    userid: req.session.userid,
                });
            });
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
                name: req.session.name,
                type: req.session.type,
                userid: req.session.userid,
            })
        }
        else {
            res.redirect('cms-login')
        }
    },

    getCMSProject: function (req, res) {
        if (req.session.user && req.cookies.user_sid) {
            Project.countDocuments({}, function (err, count) {
                if (count == 0) {
                    database.findMany(Project, {}, {}, function (projArray) {
                        res.render('cms-project', {
                            layout: '/layouts/cms-layout',
                            title: 'CMS Project | The Initiative PH',
                            project_active: true,
                            name: req.session.name,
                            type: req.session.type,
                            userid: req.session.userid,
                            proj_info: projArray,
                        })
                    });
                } else {
                    database.findMany(Project, {}, {}, function (projArray) {
                        res.render('cms-project', {
                            layout: '/layouts/cms-layout',
                            title: 'CMS Project | The Initiative PH',
                            project_active: true,
                            name: req.session.name,
                            type: req.session.type,
                            userid: req.session.userid,
                            proj_info: projArray,
                        })
                    });
                }
            });
        } else {
            res.redirect('cms-login')
        }
    },

    getCMSProjectPage: function (req, res) {
        if (req.session.user && req.cookies.user_sid) {
            var query = req.query.id;
            database.findOne(Project, { _id: query }, {}, function (proj) {
                res.render('cms-project-page', {
                    layout: '/layouts/cms-layout',
                    title: 'CMS Project Edit | The Initiative PH',
                    proj_content: proj,
                    project_active: true,
                    name: req.session.name,
                    type: req.session.type,
                    userid: req.session.userid,
                });
            });
        } else {
            res.redirect('cms-login')
        }
    },

    getCMSProjectNewPage: function (req, res) {
        if (req.session.user && req.cookies.user_sid) {
            res.render('cms-project-new-page', {
                layout: '/layouts/cms-layout',
                title: 'CMS New Project Page | The Initiative PH',
                project_active: true,
                name: req.session.name,
                type: req.session.type,
                userid: req.session.userid,
            })
        } else {
            res.redirect('cms-login')
        }
    },

    getCMSDonate: function (req, res) {
        if (req.session.user && req.cookies.user_sid) {
            Donate.countDocuments({}, function (err, count) {
                if (count == 0) {
                    database.findMany(Donate, {}, {}, function (resultArray) {
                        res.render('cms-donate', {
                            layout: '/layouts/cms-layout',
                            title: 'CMS Donate | The Initiative PH',
                            donate_active: true,
                            name: req.session.name,
                            type: req.session.type,
                            userid: req.session.userid,
                            donate_info: resultArray,
                        })
                    });
                } else {
                    database.findMany(Donate, {}, {}, function (resultArray) {
                        res.render('cms-donate', {
                            layout: '/layouts/cms-layout',
                            title: 'CMS Donate | The Initiative PH',
                            donate_active: true,
                            name: req.session.name,
                            type: req.session.type,
                            userid: req.session.userid,
                            donate_info: resultArray,
                        })
                    });
                }
            });
        } else {
            res.redirect('cms-login')
        }
    },

    getCMSNewDonate: function (req, res) {
        if (req.session.user && req.cookies.user_sid) {
            res.render('cms-donation-new-option', {
                layout: '/layouts/cms-layout',
                title: 'CMS Add Donation Option | The Initiative PH',
                donate_active: true,
                name: req.session.name,
                type: req.session.type,
                userid: req.session.userid,
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
                name: req.session.name,
                type: req.session.type,
                userid: req.session.userid,
            })
        }
        else {
            res.redirect('cms-login')
        }
    },
}

// enables to export controller object when called in another .js file
module.exports = controller;