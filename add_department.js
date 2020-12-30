const Department = require('./models/DepartmentModel.js');
const database = require('./models/db.js');

database.connect();

var department = [
    {
        department_title: "Department of Administrative Affairs",
        department_description: "<p>The Department of Administrative Affairs concerns itself with the executive functions of the organization. They also enforce bylaws, manage human resources, administer general task assignments, and preside over organization-wide decision making.</p>",
        department_category: "Management",
        department_contact: "theinitiativeph@gmail.com",
        department_available: true,
    },

    {
        department_title: "Department of Publications and Communications",
        department_description: "<p>The Department of Publications and Communications curates the organization's publicly published content.</p>",
        department_category: "Management",
        department_contact: "theinitiativeph@gmail.com",
        department_available: true,
    },

    {
        department_title: "Department of Marketing, Finance and Logistics",
        department_description: "<p>The Department of Marketing, Finance, and Logistics handles the finances and logistics of the organization and monitors cash and kind donations.</p>",
        department_category: "Management",
        department_contact: "theinitiativeph@gmail.com",
        department_available: true,
    },

    {
        department_title: "Department of Disaster Mitigation and Recovery",
        department_description: "<p>DDMR works towards responding to areas and communities affected by natural calamity or catastrophic accidents.</p>",
        department_category: "Operations",
        department_contact: "theinitiativeph@gmail.com",
        department_available: true,
    },

    {
        department_title: "Department of Animal and Environmental Welfare",
        department_description: "<p>DAEW works towards responding to issues affecting animals and natural resources.</p>",
        department_category: "Operations",
        department_contact: "theinitiativeph@gmail.com",
        department_available: true,
    },

    {
        department_title: "Department of Marginalized Community Action",
        department_description: "<p>DMCA works towards responding to areas and communities affected by violence and other forms of oppression. They also oversee any events, projects, partnerships, and sponsorships formed by the organization for the benefit of these areas and communities.</p>",
        department_category: "Operations",
        department_contact: "theinitiativeph@gmail.com",
        department_available: true,
    },

    {
        department_title: "Department of SOGIE Rights",
        department_description: "<p>DSR works towards responding to the conditions arising from SOGIE inequality and gender discrimination.</p>",
        department_category: "Operations",
        department_contact: "theinitiativeph@gmail.com",
        department_available: true,
    },

    {
        department_title: "Department of Mental Health",
        department_description: "<p>DMH focuses on alleviating areas and communities affected by terminal illness and mental health issues.</p>",
        department_category: "Operations",
        department_contact: "theinitiativeph@gmail.com",
        department_available: true,
    },

    {
        department_title: "Project Taft",
        department_description: "<p>Lorem ipsum dolor sit amet.</p>",
        department_category: "Operations",
        department_contact: "theinitiativeph@gmail.com",
        department_available: true,
    },

    {
        department_title: "Project España",
        department_description: "<p>Lorem ipsum dolor sit amet.</p>",
        department_category: "Operations",
        department_contact: "theinitiativeph@gmail.com",
        department_available: true,
    },

    {
        department_title: "Project Katipunan",
        department_description: "<p>Lorem ipsum dolor sit amet.</p>",
        department_category: "Operations",
        department_contact: "theinitiativeph@gmail.com",
        department_available: true,
    },
];

database.insertMany(Department, department);