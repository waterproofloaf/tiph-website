const database = require('../models/db.js');
const User = require('../models/UserModel.js');
const sanitize = require('mongo-sanitize');

const helper = {

    sanitize: function(query) {
        return sanitize(query);
    }
}

module.exports = helper;