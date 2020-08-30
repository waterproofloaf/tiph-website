// import module `express`
const express = require('express');

const multer = require('multer');

const database = require('../models/db.js');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// import module `controller` from `../controllers/controller.js`
const controller = require('../controller/controller.js');
const logIncontroller = require('../controller/logIncontroller.js');
const donateController = require('../controller/donateController.js');
const formsController = require('../controller/formsController.js');
const blogController = require('../controller/blogController.js');
const projectController = require('../controller/projectController.js');
const preAppController = require('../controller/preAppController.js');

const app = express();

// SET STORAGE FOR ATTACHMENT
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

var upload = multer({ storage: storage })

//Init Cookie and Body Parser

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//Init Sessions
app.use(session({
  key: 'user_sid', //user session id
  secret: 'initative',
  resave: false,
  saveUninitialized: true,
  store: database.sessionStore,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // 1 Day.
  }
}));

app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie('user_sid');
  }
  next();
});

// Donates Routes
app.delete('/donates/:id', (req, res) => {
  db.collection('donates').remove({ _id: mongodb.ObjectID(req.params.id) }, (err, result) => {
    if (err) return console.log(err)
    console.log(req.body)
    res.redirect('/cms-donate')
  })
})

// call function getIndex when client sends a request for '/' defined in routes.js
// controller
app.get('/', controller.getHomePage);
app.get('/home', controller.getHomePage);
app.get('/about', controller.getAboutUs);
app.get('/pre-application', controller.getPreApp);
app.post('/pre-application', preAppController.postPreApp);
app.get('/application', controller.getApplication);

app.get('/projects', controller.getProjects);
app.post('/projects', projectController.postProject);
app.get('/a-project', controller.getAProject);

app.get('/blog', controller.getBlogs);
app.get('/blog', blogController.findBlog);
app.post('/blog', blogController.postBlog);

app.get('/a-blog', controller.getABlog);
app.get('/contact-us', controller.getContactUs);
app.post('/contact-us', upload.single('contact_upload'), formsController.postContactUs);
app.get('/donate', controller.getDonate);

app.get('/cms-login', controller.getCMSLogin);
app.post('/cms-login', logIncontroller.postLogIn);
app.get('/cms-logout', controller.getCMSLogout);

app.get('/cms-home', controller.getCMSHome);
app.get('/cms-application', controller.getCMSApplication);
app.get('/cms-edit-application', controller.getCMSEditApplication);
app.get('/cms-edit-pre-application', controller.getCMSEditPreApplication);
app.get('/cms-applicant', controller.getCMSApplicant);
app.get('/cms-admin', controller.getCMSAdmin);
app.get('/cms-admin-new', controller.getCMSNewAdmin);
app.get('/cms-admin-edit', controller.getCMSEditAdmin);

app.get('/cms-blog', controller.getCMSBlog);
app.post('/cms-blog', blogController.deleteBlog);
app.get('/cms-blog-page', controller.getCMSBlogPage);
app.get('/cms-blog-new-page', controller.getCMSBlogNewPage);
app.post('/cms-blog-new-page', blogController.postBlog);

app.get('/cms-project', controller.getCMSProject);
app.post('/cms-project', projectController.deleteProject);
app.get('/cms-project-page', controller.getCMSProjectPage);
app.get('/cms-project-new-page', controller.getCMSProjectNewPage);
app.post('/cms-project-new-page', projectController.postProject);

app.get('/cms-donate', controller.getCMSDonate);
app.get('/cms-donate/delete/', donateController.deleteDonate);
app.get('/cms-donate/toggle/', donateController.donateToggle);
app.get('/cms-donation-new-option', controller.getCMSNewDonate);
app.post('/cms-donation-new-option', donateController.postDonate);
app.get('/cms-edit-donation', controller.getCMSEditDonate);
app.post('/cms-edit-donation', donateController.editDonate);

// enables to export app object when called in another .js file
module.exports = app;
