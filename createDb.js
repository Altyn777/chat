const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const format = require('util').format;

const url = 'mongodb://localhost:27017'; // Connection URL

const dbName = 'myproject'; // Database Name

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    client.close();
});