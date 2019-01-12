const winston = require('winston');
ENV = process.env.NODE_ENV;

function getLogger(module) {

    path = module.filename.split('/').slice(-2).join('/');

    return winston.createLogger({
        transports: [
            new winston.transports.Console({
                colorize: true,
                level: (ENV == 'development') ? 'debug' : 'error',
                label: path
            })
        ]
    });
}

module.exports = getLogger;