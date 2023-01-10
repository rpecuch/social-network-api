const { connect, connection } = require('mongoose');
// connect to MongoDB
connect('mongodb://localhost/socialNetwork', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;