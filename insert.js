const db = require('./models/db.js')

const userProfile = 'userProfile';
 
// The database to use
const dbName = "TIPH";

// db.createDatabase();

// db.createCollection(userProfile);
                      
// create/populate userProfile objects containing fields such as Username, Email, Password, DisplayPicture, CreditScore, SavedPostID, University, Bio
var user = {
    Username: 'admin',
    Password: 'root',
}

// insert object user to collection 'userProfile'
db.insertOne(userProfile, user, function(){});