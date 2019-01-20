express = require('express');
router = express.Router();

const createError = require('http-errors');
require('http-errors');
User = require('../models/user').User;
ObjectID = require('mongodb').ObjectID;

/* GET users listing. */
router.get('/:id', function (req, res, next) {
    try {
        id = new ObjectID(req.params.id);
    } catch (e) {
        return next(createError(404, "Invalid ID"));
    }

    User.findById(id, function (err, user) {
        if (err) return next(err);
        if (!user) {
            return next(createError(404, "User Not Found"));
        }
        res.json(user);
    });
});

module.exports = router;
