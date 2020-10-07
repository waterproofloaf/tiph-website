const { check } = require('express-validator');

const formsValidator = {
    contactValidation: function() {
        var validation = [
            check('contact_subject').notEmpty().withMessage('Subject is required!'),
            check('contact_email').notEmpty().withMessage('Email is required!').isEmail().withMessage('Invalid Email!'),
            check('contact_inquiry').notEmpty().withMessage('Message/Inquiry is required!'),
        ];

        return validation
    },

    preValidation: function() {
        var validation = [
            check('pre_lastname').notEmpty().withMessage('Lastname is required!'),
            check('pre_firstname').notEmpty().withMessage('Firstname is required!'),
            check('pre_age').notEmpty().withMessage('Age is required!').isNumeric().withMessage('Invalid Age!'),
            check('pre_number').notEmpty().withMessage('Number is required!').isNumeric().withMessage('Invalid Number!').isLength({min: 11, max:11}).withMessage('Invalid Number!'),
            check('pre_email').notEmpty().withMessage('Email is required!').isEmail().withMessage('Invalid Email!'),
            check('pre_schoolcompany').notEmpty().withMessage('School/Company is required!'),
            check('pre_affiliation').notEmpty().withMessage('Affiliation with School/Company is required!'),
            check('pre_facebook').notEmpty().withMessage('Facebook URL is required!'),
            check('pre_notify').notEmpty().withMessage('Need to select where to notify!'),
        ];

        return validation
    },

    appValidation: function() {
        var validation = [
            check('form_agree').isIn(['Agree']).withMessage('Must agree to the Terms and Conditions of TIPH!'),
            check('app_lastname').notEmpty().withMessage('Lastname is required!'),
            check('app_firstname').notEmpty().withMessage('Firstname is required!'),
            check('app_nickname').notEmpty().withMessage('Nickname is required!'),
            check('app_email').notEmpty().withMessage('Email is required!').isEmail().withMessage('Invalid Email!'),
            check('app_bday').notEmpty().withMessage('Birthday is required!'),
            check('app_cResidence').notEmpty().withMessage('City of Residence is required!'),
            check('app_schoolcompany').notEmpty().withMessage('School/Company is required!'),
            check('app_number').notEmpty().withMessage('Number is required!').isNumeric().withMessage('Invalid Number!').isLength({min: 11, max:11}).withMessage('Invalid Number!'),
            check('app_facebook').notEmpty().withMessage('Facebook URL is required!'),
            check('app_findout').notEmpty().withMessage('Where you found out TIPH is required!')
            .custom((value, {req}) => {
                if (value == "other"){
                    if(req.body.app_others == ''){
                        return Promise.reject('Where you found out TIPH is required!');
                    }
                }
                return true;
            }),
            check('app_expertise').isIn(['Legal Matters','File Organization','Minute-Taking','Human Resource Management','Project Management',
            'Data-driven Marketing and Analysis (Social Media Engagement)', 'Content Curation (Social Media Management)', 'Website Design and Development',
            'Content Creation (Text)', 'Content Creation (Multimedia)', 'Photography and Videography', 'Accounting', 'External Relations', 'Logistics']).
            withMessage('Areas of Expertise is required!'),
            check('app_dept1').notEmpty().withMessage('1st Department Choice is required!'),
            check('app_position1').notEmpty().withMessage('1st Desired Position Choice is required!'),
            check('app_dept2').notEmpty().withMessage('2nd Department Choice is required!'),
            check('app_position2').notEmpty().withMessage('2nd Desired Position Choice is required!'),
            check('app_reason').notEmpty().withMessage('Reason for Volunteering is required!').isLength({max:140}).withMessage('Answer Reason for Volunteering in 140 characters or less!'),
        ];

        return validation
    }
}

module.exports = formsValidator;