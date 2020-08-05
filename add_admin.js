const User = require('./models/UserModel.js');
const database = require('./models/db.js');
const bcrypt = require('bcrypt');

database.connect();

let username = 'admin';
let password = 'root';

bcrypt.hash(password, 10, function(err, hash){
    let user = {
        username: username,
        password: hash
    }

    database.insertOne(User, user, (result) => {
        console.log(result);
    });
})