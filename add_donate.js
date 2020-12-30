const Donate = require('./models/DonateModel.js');
const database = require('./models/db.js');

database.connect();

var donates = [
    {
        donate_type: "BPI",
        donate_name: "Man",
        donate_number: 901,
        donate_visible: true,
    },

    {
        donate_type: "BDO",
        donate_name: "Man",
        donate_number: 901,
        donate_visible: true,
    },

    {
        donate_type: "GCash",
        donate_name: "Man",
        donate_number: 901,
        donate_visible: true,
    },
];

database.insertMany(Donate, donates);

