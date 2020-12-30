const AppForm = require('./models/AppFormModel.js');
const database = require('./models/db.js');

database.connect();

var appsform = [
    {
        appform_year: 2020,
        appform_desc: `<p>The Initiative PH (TIPH) is a youth-run volunteer organization that coordinates
        relief efforts and organizes sustainable programs for poverty-, calamity-, and
        conflict- ridden areas
        and communities in the Philippines. By spearheading youth volunteer efforts, we
        build solidarity and
        social consciousness among the youth regardless of school or social background. <br>
        Note that by
        completing this form, you are giving The Initiative PH (TIPH) the rights to hold
        onto your information
        for profiling during your membership. You may rest assured that your information
        will remain protected
        as per the Data Privacy Act.

        <br><br><strong>PURPOSE</strong><br>
        This registration form shall only be used to gather personal information of
        interested applicants for
        The Initiative PH to contact all applicants for the potential dissemination of
        additional information or
        updates regarding their status of application for TIPH and nothing else.

        <br><br><strong>CONFIDENTIALITY</strong><br>
        In accordance with RA 10173 or the Data Privacy Act of 2012, all personal
        information gathered from this
        registration form shall be kept CONFIDENTIAL and will only be accessed by TIPH's
        Human Resources (HR)
        Department Heads and Officers.

        <br><br><strong>DISPOSAL OF DATA</strong><br>
        All data gathered through this registration form will be disposed of by the end of
        the duration of
        TIPH's July application season. This concerns the permanent deletion of all data
        collected.

        <br><br><strong>YOUR RESPONSIBILITY</strong><br>
        Should you realize that your data privacy is being breached or not handled properly,
        you may send a
        complaint to the National Privacy Commission through an email to
        complaints@privacy.gov.ph, and our
        organization will be responsible for handling such cases regarding potential
        violations of RA 10173 or
        the Data Privacy Act of 2012.</p>`,
    },
];

database.insertMany(AppForm, appsform);