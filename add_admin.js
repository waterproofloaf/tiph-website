const User = require('./models/UserModel.js');
const database = require('./models/db.js');
const bcrypt = require('bcrypt');

database.connect();

let username = 'admin1';
let password = 'root';

bcrypt.hash(password, 10, function(err, hash){
    let user = {
        name: 'Admin',
        username: username,
        password: hash,
        userDepartment: 'Operations',
        userTypeMain: true,
    }

    database.insertOne(User, user, (result) => {
        console.log(result);
    });
})