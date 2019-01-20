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