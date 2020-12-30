const PreAppForm = require('./models/PreAppFormModel.js');
const database = require('./models/db.js');

database.connect();

var preappsform = [
    {
        preform_year: 2020,
        preform_desc: '<p><strong>Thank you for showing interest!</strong></p><p><br></p><p>The Initiative PH (TIPH) is a youth-run volunteer organization that coordinates relief efforts and organizes sustainable programs for poverty-, calamity, and conflict-ridden areas and communities in the Philippines. By spearheading youth volunteer efforts, we build solidarity and social consciousness among the youth regardless of school or social background.</p><p><br></p><p>Volunteer applications are currently closed until next year, however if you would like us to notify you immediately when applications will open, you may leave your details here. Signing up here does not confirm your application to the organization.</p><p><br></p><p>By filling up this form, you are subscribing to updates regarding when the applications will be open. Rest assured that your information will be kept confidential in compliance to the Data Privacy Act of 2012.</p>',
    },
];

database.insertMany(PreAppForm, preappsform);