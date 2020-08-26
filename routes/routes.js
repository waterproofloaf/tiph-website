// import module `express`
const express = require('express');

const multer = require('multer');

// import module `controller` from `../controllers/controller.js`
const controller = require('../controller/controller.js');
const logInController = require('../controller/logInController.js');
const donateController = require('../controller/donateController.js');
const formsController = require('../controller/formsController.js');
const blogController = require('../controller/blogController.js');
const projectController = require('../controller/projectController.js');

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

// call function getIndex when client sends a request for '/' defined in routes.js
// controller
app.get('/', controller.getHomePage);
app.get('/home', controller.getHomePage);
app.get('/about', controller.getAboutUs);
app.get('/pre-application', controller.getPreApp);
app.get('/application', controller.getApplication);
app.get('/projects', controller.getProjects);
app.get('/a-project', controller.getAProject);
app.get('/blog', controller.getBlogs);
app.get('/a-blog', controller.getABlog);
app.get('/contact-us', controller.getContactUs);
app.post('/contact-us', upload.single('contact_upload'), formsController.postContactUs);
app.get('/donate', controller.getDonate);

app.get('/cms-login', logInController.getLogin);
app.post('/cms-login', logInController.postLogIn);

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
app.post('/cms-donate', donateController.deleteDonate);
app.get('/cms-donation-new-option', controller.getCMSNewDonate);
app.post('/cms-donation-new-option', donateController.postDonate);
app.get('/cms-edit-donation', controller.getCMSEditDonate);

// enables to export app object when called in another .js file
module.exports = app;
