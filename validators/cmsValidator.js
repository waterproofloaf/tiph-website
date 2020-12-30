const { check } = require('express-validator');
const User = require('../models/UserModel.js');
const Position = require('../models/PositionModel.js');
const bcrypt = require('bcrypt');
const helper = require('../controller/helper.js')

const cmsValidator = {
    editAdminValidation: function () {
        var validation = [
            check('admin_name').notEmpty().withMessage('Full Name is required!'),
            check('admin_username').notEmpty().withMessage('Username is required!')
                .custom((value, { req }) => {
                    return User.findOne({ username: value }).then(user => {
                        if (user) {
                            if (req.session.userid == user._id) {
                                return true;
                            }
                            throw new Error('Username is already taken!');
                        }
                    })
                }),
            check('admin_password').notEmpty().withMessage('Old Password is required!'),
            check('admin_new_password').notEmpty().withMessage('New Password is required!')
                .custom((value, { req }) => {
                    if (value !== req.body.admin_confirm_password) {
                        throw new Error('New Password and Confirm Password do not match!');
                    }
                    return true;
                }),
            check('admin_confirm_password').notEmpty().withMessage('Confirm Password is required!'),
        ];

        return validation
    },

    addAdminValidation: function () {
        var validation = [
            check('admin_name').notEmpty().withMessage('Full Name is required!'),
            check('admin_username').notEmpty().withMessage('Username is required!')
                .custom(value => {
                    return User.findOne({ username: value }).then(user => {
                        if (user) {
                            return Promise.reject('Username is already taken!');
                        }
                    })
                }),
            check('admin_password').notEmpty().withMessage('Password is required!'),
        ];

        return validation
    },

    addBlogValidation: function () {
        var validation = [
            check('blog_title').notEmpty().withMessage('Blog Title is required!'),
            check('blog_author').notEmpty().withMessage('Blog Author is required!'),
            check('blog_content').notEmpty().withMessage('Blog Content is required!'),
            // check('blog_preview').notEmpty().withMessage('Blog Preview is required!'),
            check('blog_keywords').notEmpty().withMessage('Blog Keywords is required!'),
        ];

        return validation
    },

    editBlogValidation: function () {
        var validation = [
            check('blog_title').notEmpty().withMessage('Blog Title is required!'),
            check('blog_author').notEmpty().withMessage('Blog Author is required!'),
            check('blog_content').notEmpty().withMessage('Blog Content is required!'),
            // check('blog_preview').notEmpty().withMessage('Blog Preview is required!'),
            check('blog_keywords').notEmpty().withMessage('Blog Keywords is required!'),
            check('blog_date').notEmpty().withMessage('Blog Date is required!'),
        ];

        return validation
    },

    addProjectValidation: function () {
        var validation = [
            check('proj_title').notEmpty().withMessage('Project Title is required!'),
            check('proj_content').notEmpty().withMessage('Project Content is required!'),
            // check('proj_preview').notEmpty().withMessage('Project Preview is required!'),
            check('proj_keywords').notEmpty().withMessage('Project Keywords is required!'),
        ];

        return validation
    },

    editProjectValidation: function () {
        var validation = [
            check('proj_title').notEmpty().withMessage('Project Title is required!'),
            check('proj_content').notEmpty().withMessage('Project Content is required!'),
            // check('proj_preview').notEmpty().withMessage('Project Preview is required!'),
            check('proj_keywords').notEmpty().withMessage('Project Keywords is required!'),
            check('proj_date').notEmpty().withMessage('Project Date is required!'),
        ];

        return validation
    },

    DonateValidation: function () {
        var validation = [
            check('donate_name').notEmpty().withMessage('Account Name is required!'),
            check('donate_number').notEmpty().withMessage('Account Number is required!'),
        ];

        return validation
    },

    DonateModeValidation: function () {
        var validation = [
            check('donatemode_name').notEmpty().withMessage('Name of Mode is required!'),
            check('donatemode_color').notEmpty().withMessage('Background color is required!'),
        ];

        return validation
    },

    ApplicantValidation: function () {
        var validation = [
            check('pre_status_reason').notEmpty().withMessage('Reason for changing status of applicant is required!'),
        ];

        return validation
    },

    AboutValidation: function () {
        var validation = [
            check('about_title').notEmpty().withMessage('About Title is required!'),
            check('about_description').notEmpty().withMessage('About Content is required!'),
        ];

        return validation
    },

    DepartmentValidation: function () {
        var validation = [
            check('department_title').notEmpty().withMessage('Department Title is required!'),
            check('department_description').notEmpty().withMessage('Department Description is required!'),
            check('department_contact').notEmpty().withMessage('Department Contact is required!'),
        ];

        return validation
    },

    PositionValidation: function () {
        var validation = [
            check('position_name').notEmpty().withMessage('Position Name is required!')
                .custom(value => {
                    return Position.findOne({ position_name: value }).then(pos => {
                        if (pos) {
                            return Promise.reject('Position Name is already taken!');
                        }
                    })
                })
        ];

        return validation
    },
}

module.exports = cmsValidator;