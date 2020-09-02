const Project = require('./models/ProjectModel.js');
const database = require('./models/db.js');

database.connect();

var projects = [
    {
        proj_title: 'Project Lumad',
        proj_content: '<p>Project Lumad aims to raise funds to procure food and care packages for the Bakwit Lumad students in the University of the Philippines-Diliman, under the Department of Marginalized Community Action of The Initiative PH. Project Lumad advocates for the Lumad students’ right to claim education by supporting their Bakwit school through fundraising money to provide food packages and hygiene kits to the 111 student and teacher residents safe inside the University of the Philippines Diliman. With the pandemic depleting their already limited resources, threatening the students and teachers with hunger and disease, Project Lumad asks you to help save the school by sharing aid.<p>',
        proj_date: '03/07/2020',
        proj_keywords: 'Lumad',
        proj_status: 'Approved',
        proj_preview: 'Project Lumad aims to raise funds to procure food and care packages for the Bakwit Lumad students in the University of the Philippines-Diliman, under the Department of Marginalized Community Action of The Initiative PH.',
        proj_published: true,
    },

    {
        proj_title: 'Hatid Kapatid',
        proj_content: '<p>Hatid Kapatid is an independent youth volunteer effort organized to provide financial and information aid to taxi and ride-hailing app drivers in Metro Manila affected by the COVID-19 pandemic.<p>',
        proj_date: '03/30/2020',
        proj_keywords: 'Kapatid',
        proj_status: 'Approved',
        proj_preview: 'Hatid Kapatid is an independent youth volunteer effort organized to provide financial and information aid to taxi and ride-hailing app drivers in Metro Manila affected by the COVID-19 pandemic.',
        proj_published: true,
    },

    {
        proj_title: 'Project Pagsibol',
        proj_content: '<p>Project Pagsibol is a donation drive by The Scarecrow PH, in partnership with The Initiative PH, to help farmers who are affected by the COVID-19 crisis. Through donations, Project Pagsibol aims to procure relief packages to upland farmers.<p>',
        proj_date: '04/08/2020',
        proj_keywords: 'Pagsibol',
        proj_status: 'Approved',
        proj_preview: 'Project Pagsibol is a donation drive by The Scarecrow PH, in partnership with The Initiative PH.',
        proj_published: true,
    },
];

database.insertMany(Project, projects);