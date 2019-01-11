winston1 = require('winston');
ENV = process.env.NODE_ENV;

function getLogger(module) {
    path = module.filename.split('/').slice(-2).join('/');
    return new winston1.Logger({
        transports: [
            new winston1.transports.Console({
                colorize: true,
                level: ENV == 'development' ? 'debug' : 'error',
                label: path
            })
        ]
    });
}

module.exports = getLogger;