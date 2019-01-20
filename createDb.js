/*const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/chat', {useNewUrlParser: true});

schema = mongoose.Schema({
    name: String
});
schema.methods.meow = () => {
    console.log(this.get('name'));
};

const Cat = mongoose.model('Cat', schema);

const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then(() => kitty.meow()); // сохр в бд
*/
/*
const User = require('./models/user').User;

const user = new User({
    username: "Tester",
    password: "secret"
});

user.save((err, user, affected) => {
    if (err) throw err;

    User.findOne({username: "Tester"}, (err, tester) => {
        console.log(tester);
    })
});
*/

const mongoose = require('./libs/mongoose');
// mongoose.set('debug', true);
const async = require('async');

async.series([
    open, //undefined
    dropDatabase, //true
    requireModels,
    createUsers, // users
], function (err) {
    console.log(arguments);
    mongoose.disconnect();
    // process.exit(err ? 255 : 0);
});

function open(callback) {
    mongoose.connection.on('open', callback);
}

function dropDatabase(callback) {
    db = mongoose.connection.db;
    /*
    console.log(mongoose.connection.readyState);
    0 = disconnected
    1 = connected
    2 = connecting <-----
    3 = disconnecting
    */
    db.dropDatabase(callback);
}

function requireModels(callback) {
    require('./models/user');

    async.each(Object.keys(mongoose.models), function (modelName, callback) {
        mongoose.models[modelName].ensureIndexes(callback);
    }, callback);
}

function createUsers(callback) {

    users = [
        {username: 'Nastya', password: 'supernastya'},
        {username: 'Kika', password: '123'},
        {username: 'admin', password: 'thetruehero'}
    ];

    async.each(users, function (userData, callback) {
        user = new mongoose.models.User(userData);
        user.save(callback);
    }, callback);
    /*
    async.parallel([
        function (callback) {
            nastya = new User({username: 'Nastya', password: 'supernastya'});
            nastya.save(function (err) {
                callback(err, nastya); // save(function(err, vasya, affected)
            })
        },
        function (callback) {
            kika = new User({username: 'Kika', password: '123'});
            kika.save(function (err) {
                callback(err, kika);
            })
        },
        function (callback) {
            admin = new User({username: 'admin', password: 'thetruehero'});
            admin.save(function (err) {
                callback(err, admin);
            })
        }
    ], callback);
*/
}


