const Home = require('./models/HomeModel.js');
const database = require('./models/db.js');

database.connect();

var home = [
    {
        home_title: "THE INITIATIVE PH",
        home_subtitle: "Since 2016",
        home_one_title: "What we do",
        home_one_content: "<p>The Initiative PH (TIPH) is a youth-run, non-profit volunteer organization that coordinates relief efforts and organizes sustainable programs for poverty-, calamity-, and conflict- ridden areas and communities in the Philippines.</p>",
        home_two_title: "Our Objectives",
        home_two_content: "<ol><li>Coordinate relief efforts for those in immediate need</li><li>Organize sustainable programs for vulnerable communities in the Philippines</li><li>Promote timely advocacies in constant pursuit of development through pertinent projects and policies</li><li>Enable the youth by giving them opportunities to realize their potential through formative training and active response to Philippine realities</li></ol>",
        home_three_title: "Our Goals",
        home_three_content: "<p>Our short term goal is to assist poverty-, calamity-, and conflict- affected Filipino areas and communities, envisioning an entire organization of Filipino youth who are driven towards awareness and action and who know how to aid their fellow countrymen.</p><p>For our long term goal, we want to be a contributor in making youth volunteerism and social involvement a norm for all youth nationwide, aiming to shape generation after generation of initiative, collaborative, compassionate, empathetic, honest, and open individuals.</p>",
        home_four_title: "Volunteer Applications",
        home_four_content: "<p>Want to make a change? TIPH is looking for more volunteers that will help our cause on building sustainable projects that will aid communities facing different challenges across the country.</p>",
        home_preapp_button: true,
        home_app_button: true,
    },
];

database.insertMany(Home, home);