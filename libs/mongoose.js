const mongoose = require('mongoose');
config = require('../config');
//mongoose.set('useNewUrlParser', true);
mongoose.connect(config.get('mongoose:uri'),  {keepAlive: 1, useNewUrlParser: true });
//mongoose.connect( 'mongodb://localhost:3000/chat' ,
//    {keepAlive: 1, useNewUrlParser: true });  config.get('mongoose:keepAlive')
module.exports = mongoose;