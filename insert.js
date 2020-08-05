const User = require('./models/UserModel.js');
const database = require('./models/db.js');

database.connect();

let user = {
    username: 'admin',
    password: 'root'
};

database.insertOne(User, user, (result) => {
    console.log(result);
});