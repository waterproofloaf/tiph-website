
//import mongodb module
const mongodb = require('mongodb');

// mongodb client (connection of mongodb server)
const client = mongodb.MongoClient;
const url = "mongodb://localhost:27017"; 

// additional options to prevent warnings when we run the code
const options = {useUnifiedTopology: true,  useNewUrlParser: true};

// name of database
const dbName = 'Big4FW_database';

// database functions (CRUD functions)
const database = {

    // CREATE a database
    createDatabase: function() {
        client.connect(url, options, function(err,db) {
            if(err) throw err;
            console.log('Database created!');
            db.close();
        });
    },

    // CREATE collection (collection = table in RDBMS)
    createCollection: function(collection) {
        client.connect(url, options, function(err, db) {
            if(err) throw err;
            var database = db.db(dbName);
            database.createCollection(collection, function(err,result) {
                if(err) throw err;
                console.log('Collection ' + collection + ' created!');
                db.close();
            });
        });
    },

    // CREATE/insert a document in a collection
    insertOne: function(collection,doc, retrieve) {
        client.connect(url, options, function(err, db) {
            if(err) throw err;
            var database = db.db(dbName);
            database.collection(collection).insertOne(doc, function (err, result) {
                if(err) throw err;
                //console.log(result);
                console.log('1 document successfuly inserted!');
                db.close();
                return retrieve(result);
            });
        });
    },

    // CREATE/insert arrays of document in a collection
    insertMany: function(collection, docs) {
        client.connect(url, options, function(err, db) {
            if(err) throw err;
            var database = db.db(dbName);
            database.collection(collection).insertMany(docs, function(err, result) {
                if(err) throw err;
                //console.log(result);
                console.log('Documents inserted: ' + result.insertedCount);
                db.close();
            });
        });
    },


    // RETRIEVE a specific document in a collection based on query
    findOne: function(collection, query, retrieve) {
        client.connect(url, options, function(err, db) {
            if(err) throw err;
            var database = db.db(dbName);
            database.collection(collection).findOne(query, function(err, result) {
                if(err) throw err;
                db.close();
                return retrieve(result);
            });
        });
    },

    find: function(collection, query, projection = null, retrieve) {
        client.connect(url, options, function(err, db) {
            if(err) throw err;
            var database = db.db(dbName);
            database.collection(collection).findOne(query, {projection: projection}, function(err, result) {
                if(err) throw err;
                db.close();
                return retrieve(result);
            });
        });
    },

    findManyP: function(collection, query, projection = null, retrieve) {
        client.connect(url, options, function(err, db) {
            if(err) throw err;
            var database = db.db(dbName);
            database.collection(collection).find(query,{projection: projection}).toArray(function (err,result){
                if(err) throw err;
                db.close();
                return retrieve(result);
            });
        });
    },

    // RETRIEVE multiple documents in a collection based on query
    // projection - to show columns in your database or returns specific fields in the result; filter query using projection
    findMany: function(collection, query, retrieve) {
        client.connect(url, options, function(err, db) {
            if(err) throw err;
            var database = db.db(dbName);
            database.collection(collection).find(query).toArray(function (err,result){
                if(err) throw err;
                console.log(result);
                console.log('Documents retrieved: ' + result.insertedCount);
                db.close();
                return retrieve(result);
            });
        });
    },

    // UPDATE the value defined in object update based on the object query in a document
    updateOne: function(collection, query, update) {
        client.connect(url, options, function (err, db) {
            if(err) throw err;
            var database = db.db(dbName);
            database.collection(collection).updateOne(query, update, function(err, result) {
                if(err) throw err;
                console.log('1 document updated!');
                db.close();
            });
        });
    },

    // UPDATE the value defined in object update based on the object query in multiple documents
    updateMany: function(collection, query, update) {
        client.connect(url, options, function(err, db) {
            if(err) throw err;
            var database = db.db(dbName);
            database.collection(collection).updateMany(query, update, function(err, result) {
                if(err) throw err;
                console.log('Documents updated: ' + result.modifiedCount);
                db.close();
            });
        });
    },

    // DELETE a specific document in a collection based on the object query
    deleteOne: function(collection, query) {
        client.connect(url, options, function(err, db) {
            if(err) throw err;
            var database = db.db(dbName);
            database.collection(collection).deleteOne(query, function(err, result) {
                if(err) throw err;
                console.log('1 document deleted :(');
                db.close();
            });
        });
    },

    // DELETE multiple documents in a collection based on the object query
    deleteMany: function(collection, query) {
        client.connect(url, options, function(err, db) {
            if(err) throw err;
            var database = db.db(dbName);
            database.collection(collection).deleteMany(query, function(err, result) {
                if(err) throw err;
                console.log('Documents deleted: ' + result.deletedCount);
                db.close();
            });
        });
    },

    // DROP a collection
    dropCollection: function(collection) {
        client.connect(url, options, function(err, db) {
            if(err) throw err;
            var database = db.db(dbName);
            database.collection(collection).drop(function(err, res) {
                if(err) throw err;
                console.log('Collection ' + collection + ' deleted');
                db.close();
            });
        });
    }
}

    // enables to export datebase object when called in another .js file
    module.exports = database;