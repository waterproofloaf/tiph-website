const { check } = require('express-validator');

const cmsValidator = {
    editAdminValidation: function() {
        var validation = [
            check('admin_name').notEmpty().withMessage('Full Name is required!'),
            check('admin_username').notEmpty().withMessage('Username is required!'),
            check('admin_password').notEmpty().withMessage('Old Password is required!'),
            check('admin_new_password').notEmpty().withMessage('New Password is required!'),
            check('admin_confirm_password').notEmpty().withMessage('Confirm Password is required!'),
        ];

        return validation
    },

    addAdminValidation: function() {
        var validation = [
            check('admin_name').notEmpty().withMessage('Full Name is required!'),
            check('admin_username').notEmpty().withMessage('Username is required!'),
            check('admin_password').notEmpty().withMessage('Password is required!'),
        ];

        return validation
    },
}

module.exports = cmsValidator;