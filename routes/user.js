express = require('express');
router = express.Router();

const createError = require('http-errors');
require('http-errors');
User = require('../models/user').User;

/* GET users listing. */
router.get('/:id', function (req, res, next) {
    User.findById(req.params.id, function (err, user) {
        if (err) return next(err);
        if (!user) {
            next(createError(404, "User Not Found"));
        }
        res.json(user);
    });
});
/*
router.use((err, req, res, next) => { // length - кол-во арг функции; 4 - обработчик ош error handler
    res.locals.message = err.message;
    log.info(res.locals.message);
    res.locals.error = req.app.get('env') === 'development' ? err : {}; // true : false
    res.status(err.status || 500);
    res.render('error');
});
*/
module.exports = router;
