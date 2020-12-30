const About = require('./models/AboutModel.js');
const database = require('./models/db.js');

database.connect();

var about = [
    {
        about_title: "How TIPH was founded",
        about_description: "<p>TIPH was established by De La Salle University - Senior High School (DLSU - SHS) Taft Campus students After that, it slowly expanded to other schools across Metro Manila.</p> ",
    },
];

database.insertMany(About, about);