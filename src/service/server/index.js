if (process.env.API === 'prod') {
  module.exports = require('./server.prod')
} else {
  module.exports = require('./server.test')
}
