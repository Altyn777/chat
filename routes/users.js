express = require('express');
router = express.Router();

require('http-errors');
User = require('../models/user').User;

/* GET users listing. */
router.get('/',  function (req, res, next) {
  User.find({}, function (err, users) {
    if (err) return next(err);
    res.json(users);
  });
});

module.exports = router;
