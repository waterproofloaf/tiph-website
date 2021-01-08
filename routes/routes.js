// import module `express`
const express = require('express');
const multer = require('multer');
const path = require('path');
const database = require('../models/db.js');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// import module `controller` from `../controllers/controller.js`
const controller = require('../controller/controller.js');
const logInController = require('../controller/logInController.js');
const donateController = require('../controller/donateController.js');
const donatemodeController = require('../controller/donatemodeController.js');
const formsController = require('../controller/formsController.js');
const blogController = require('../controller/blogController.js');
const projectController = require('../controller/projectController.js');
const adminController = require('../controller/adminController.js');
const applicationController = require('../controller/applicationController.js');
const preappformController = require('../controller/preappformController.js');
const homeController = require('../controller/homeController.js');
const aboutController = require('../controller/aboutController.js');
const departmentController = require('../controller/departmentController.js');
const appformController = require('../controller/appformController.js');
const positionController = require('../controller/positionController.js');
// const uploadController = require("../controller/uploadImgController.js");

// import module 'Validators' from '../validators/...'
const formsValidator = require("../validators/formsValidator.js");
const cmsValidator = require("../validators/cmsValidator.js");

const app = express();

// SET STORAGE FOR ATTACHMENT
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    // cb(null, file.originalname)
    // cb(null, file.fieldname + path.extname(file.originalname))
    cb(null, file.fieldname)
  }
})

var email_storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

// var home_storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'public/assets/img/')
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname)
//   }
// })

// var home_upload = multer({
//   dest: 'public/assets/img/',
//   rename: function (fieldname, filename) {
//     console.log("Rename...");
//     return 'homecover_' + fieldname;
//   },
//   onFileUploadStart: function () {
//     console.log("Upload is starting...");
//   },
//   onFileUploadComplete: function () {
//     console.log("File uploaded");
//   }
// });

var upload = multer({ storage: storage })
var email_upload = multer({ storage: email_storage })
// var home_upload = multer({ home_storage: home_storage })

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
// Views page
app.get('/', controller.getHomePage);
app.get('/home', controller.getHomePage);

app.get('/about', controller.getAboutUs);

app.get('/pre-application', controller.getPreApp);
app.post('/pre-application', formsValidator.preValidation(), formsController.postPreApp);

app.get('/application', controller.getApplication);
app.get('/application/positions', appformController.listPositions);
app.post('/application', upload.array('app_portfolio', 5), formsValidator.appValidation(), formsController.postAppForm);

app.get('/projects', controller.getProjects);
app.post('/projects', controller.getProjects);
app.get('/projects/search/', controller.getProjectsSearch);
app.get('/a-project/', projectController.findProject);
app.get('/projects-approved', controller.getProjectsApproved);
app.post('/projects-approved', controller.getProjectsApproved);
app.get('/projects-ongoing', controller.getProjectsOngoing);
app.post('/projects-ongoing', controller.getProjectsOngoing);
app.get('/projects-proposed', controller.getProjectsProposed);
app.post('/projects-proposed', controller.getProjectsProposed);

app.get('/blog', controller.getBlogs);
app.get('/blog/search', controller.getBlogsSearch);
app.post('/blog', blogController.postBlog);
app.get('/a-blog', blogController.findBlog);

app.get('/contact-us', controller.getContactUs);
app.post('/contact-us', email_upload.single('contact_upload'), formsValidator.contactValidation(), formsController.postContactUs);
app.get('/donate', controller.getDonate);

app.get('/404', controller.get404);
app.get('/cms-404', controller.getcms404);
app.get('/project-not-found', controller.getProjectNotFound);
app.get('/blog-not-found', controller.getBlogNotFound);
app.get('/unavailable', controller.getUnavailable);

// CMS Login
app.get('/cms-login', controller.getCMSLogin);
app.post('/cms-login', logInController.postLogIn);
app.get('/cms-logout', controller.getCMSLogout);

// CMS Home and Application
app.get('/cms-home', controller.getCMSHome);
app.post('/cms-home', upload.any('home_cover_upload', 'home_one_pic', 'home_two_pic', 'home_three_pic', 'home_four_pic'), homeController.editHome);
app.get('/cms-home/toggle/', homeController.homeToggle);

app.get('/cms-about', controller.getCMSAbout);
app.post('/cms-about', upload.any(), cmsValidator.AboutValidation(), aboutController.editAbout);

app.get('/cms-department', controller.getCMSDepartment);
app.get('/cms-department-new', controller.getCMSDepartmentNew);
app.post('/cms-department-new', cmsValidator.DepartmentValidation(), departmentController.newDepartment);
app.get('/cms-department-edit', controller.getCMSDepartmentEdit);
app.post('/cms-department-edit', cmsValidator.DepartmentValidation(), departmentController.editDepartment);
app.get('/cms-department/delete/', departmentController.deleteDepartment);

app.get('/cms-application', controller.getCMSApplication);
app.get('/cms-edit-application', controller.getCMSEditApplication);
app.post('/cms-edit-application', appformController.editAppForm);
app.get('/cms-edit-application/toggle/', departmentController.departmentToggle);
app.get('/cms-edit-application/pos-toggle/', positionController.positionToggle);
app.get('/cms-edit-pre-application', controller.getCMSEditPreApplication);
app.post('/cms-edit-pre-application', preappformController.editPreAppForm);

app.get('/cms-positions', controller.getCMSPositions);
app.get('/cms-position-new', controller.getCMSPositionNew);
app.post('/cms-position-new', cmsValidator.PositionValidation(), positionController.newPosition);
app.get('/cms-positions/delete/', positionController.deletePosition);

// CMS Applicant
app.get('/cms-applicant-pre-overview', controller.getCMSApplicantPreOverview);
app.get('/cms-applicant-app-overview', controller.getCMSApplicantAppOverview);
// CMS Pre-Applicant
app.get('/cms-applicant-pre', controller.getCMSApplicantPre);
app.get('/cms-applicant-pre-accepted', controller.getCMSApplicantPreAccepted);
app.get('/cms-applicant-pre-rejected', controller.getCMSApplicantPreRejected);
app.get('/cms-applicant-pre-pending', controller.getCMSApplicantPrePending);
app.get('/cms-pre-app-profile', controller.getCMSApplicantPreProf);
app.post('/cms-pre-app-profile', cmsValidator.ApplicantValidation(), applicationController.EditPreApplicant);
app.get('/cms-applicant-pre/delete/', applicationController.deletePreApplicant);
// CMS App-Applicant
app.get('/cms-applicant-app', controller.getCMSApplicantApp);
app.get('/cms-applicant-app-accepted', controller.getCMSApplicantAppAccepted);
app.get('/cms-applicant-app-rejected', controller.getCMSApplicantAppRejected);
app.get('/cms-applicant-app-pending', controller.getCMSApplicantAppPending);
app.get('/cms-app-profile', controller.getCMSApplicantProf);
app.post('/cms-app-profile', cmsValidator.ApplicantValidation(), applicationController.EditAppApplicant);
app.get('/cms-applicant-app/delete/', applicationController.deleteAppApplicant);

// CMS Admins
app.get('/cms-admin', controller.getCMSAdmin);
app.get('/cms-admin-new', controller.getCMSNewAdmin);
app.post('/cms-admin-new', cmsValidator.addAdminValidation(), adminController.postAdmin);
app.get('/cms-admin-edit', controller.getCMSEditAdmin);
app.post('/cms-admin-edit', cmsValidator.editAdminValidation(), adminController.editAdmin);
app.get('/cms-admin/delete/', adminController.deleteAdmin);

// CMS Blog
app.get('/cms-blog', controller.getCMSBlog);
app.get('/cms-blog/delete/', blogController.deleteBlog);
app.get('/cms-blog/toggle/', blogController.blogToggle);
app.get('/cms-blog-page', controller.getCMSBlogPage);
app.post('/cms-blog-page', upload.any(), cmsValidator.editBlogValidation(), blogController.editBlog);
app.get('/cms-blog-new-page', controller.getCMSBlogNewPage);
app.post('/cms-blog-new-page', upload.any(), cmsValidator.addBlogValidation(), blogController.postBlog);

// CMS Project
app.get('/cms-project', controller.getCMSProject);
app.get('/cms-project/delete/', projectController.deleteProject);
app.get('/cms-project/toggle/', projectController.projToggle);
app.get('/cms-project/showcase/', projectController.projShowcase);
app.get('/cms-project-page', controller.getCMSProjectPage);
app.post('/cms-project-page', upload.any(), cmsValidator.editProjectValidation(), projectController.editProject);
app.get('/cms-project-new-page', controller.getCMSProjectNewPage);
app.post('/cms-project-new-page', upload.any(), cmsValidator.addProjectValidation(), projectController.postProject);

// CMS Donate
app.get('/cms-donate', controller.getCMSDonate);
app.get('/cms-donate/delete/', donateController.deleteDonate);
app.get('/cms-donate/toggle/', donateController.donateToggle);
app.get('/cms-donation-new-option', controller.getCMSNewDonate);
app.post('/cms-donation-new-option', cmsValidator.DonateValidation(), donateController.postDonate);
app.get('/cms-edit-donation', controller.getCMSEditDonate);
app.post('/cms-edit-donation', cmsValidator.DonateValidation(), donateController.editDonate);

app.get('/cms-donate-mode', controller.getCMSDonateMode);
app.get('/cms-donate-mode/toggle/', donatemodeController.donateToggle);
app.get('/cms-donate-mode/delete/', donatemodeController.deleteDonate);
app.get('/cms-donate-mode-new-option', controller.getCMSDonateModeNew);
app.post('/cms-donate-mode-new-option', upload.any(), cmsValidator.DonateModeValidation(), donatemodeController.postDonate);
app.get('/cms-donate-mode-edit-option', controller.getCMSDonateModeEdit);
app.post('/cms-donate-mode-edit-option', upload.any(), cmsValidator.DonateModeValidation(), donatemodeController.editDonate);


app.use((req, res, next) => {
  if (req.session.user) {
    res.status(404).redirect('cms-404');
  }
  else {
    res.status(404).redirect('404');
  }
});

// enables to export app object when called in another .js file
module.exports = app;
