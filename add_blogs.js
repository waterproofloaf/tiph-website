const Blog = require('./models/BlogModel.js');
const database = require('./models/db.js');

database.connect();

var blogs = [
    {
        blog_title: 'Blog Project Lumad',
        blog_content: 'Project Lumad aims to raise funds to procure food and care packages for the Bakwit Lumad students in the University of the Philippines-Diliman, under the Department of Marginalized Community Action of The Initiative PH. Project Lumad advocates for the Lumad students’ right to claim education by supporting their Bakwit school through fundraising money to provide food packages and hygiene kits to the 111 student and teacher residents safe inside the University of the Philippines Diliman. With the pandemic depleting their already limited resources, threatening the students and teachers with hunger and disease, Project Lumad asks you to help save the school by sharing aid.',
        blog_date: '3/07/2020',
        blog_author: 'Juan Dela Cruz',
        blog_keywords: 'Lumad',
        blog_published: true,
    },

    {
        blog_title: 'Blog Hatid Kapatid',
        blog_content: 'Hatid Kapatid is an independent youth volunteer effort organized to provide financial and information aid to taxi and ride-hailing app drivers in Metro Manila affected by the COVID-19 pandemic.',
        blog_date: '3/30/2020',
        blog_author: 'Juan Dela Cruz',
        blog_keywords: 'Kapatid',
        blog_published: true,
    },

    {
        blog_title: 'Blog Pagsibol',
        blog_content: 'Project Pagsibol is a donation drive by The Scarecrow PH, in partnership with The Initiative PH, to help farmers who are affected by the COVID-19 crisis. Through donations, Project Pagsibol aims to procure relief packages to upland farmers.',
        blog_date: '4/08/2020',
        blog_author: 'Anton Rodriguez',
        blog_keywords: 'Pagsibol',
        blog_published: true,
    },

    {
        blog_title: 'Blog Example 1',
        blog_content: 'Project Example 1 is a donation drive by The Scarecrow PH, in partnership with The Initiative PH, to help farmers who are affected by the COVID-19 crisis. Through donations, Project Pagsibol aims to procure relief packages to upland farmers.',
        blog_date: '6/17/2020',
        blog_author: 'Maria Tolentino',
        blog_keywords: 'Example',
        blog_published: true,
    },

    {
        blog_title: 'Blog 2 Example',
        blog_content: 'Project 2 Example is a donation drive by The Scarecrow PH, in partnership with The Initiative PH, to help farmers who are affected by the COVID-19 crisis. Through donations, Project Pagsibol aims to procure relief packages to upland farmers.',
        blog_date: '12/17/2020',
        blog_author: 'Anton Rodriguez',
        blog_keywords: 'Example',
        blog_published: true,
    },

];

database.insertMany(Blog, blogs);

