const env = process.env.BUILD_ENV || 'development';
const ENV = require('./env/' + env + '.json');

module.exports.CONST = {
    PORT_VALUE: ENV.PORT_VALUE,
    DASHBOT_API_KEY: '***************************',
    SERVER_START_TEXT: 'App is running on port %d in %s mode',
    ACCESS_CONTROL_HEADERS: {
        ALLOW_ORIGIN: {
            NAME: 'Access-Control-Allow-Origin',
            VALUE: '*'
        },
        ALLOW_METHODS: {
            NAME: 'Access-Control-Allow-Methods',
            VALUE: 'GET,PUT,POST,DELETE,OPTIONS'
        },
        ALLOW_HEADERS: {
            NAME: 'Access-Control-Allow-Headers',
            VALUE: 'Origin, X-Requested-With, Content-Type, Accept'
        }
    }
}
