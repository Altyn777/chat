const mongoose = require('mongoose');
config = require('../config');
//mongoose.set('useNewUrlParser', true);
mongoose.connect(config.get('mongoose:uri'),  {keepAlive: 1, useNewUrlParser: true });

module.exports = mongoose;