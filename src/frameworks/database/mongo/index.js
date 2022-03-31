const mongoose = require('mongoose');
const schemas = require('./schemas');

module.exports = {
  connect: () => {
    const db_conn_str = process.env.DB_CONNECTION_STRING
    mongoose.connect(db_conn_str, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useFindAndModify: false
    })

    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'Connection to MongoDB cluster has failed.'))
    db.once('open', () => {
      console.log('Successfully connected to MongoDB cluster')
    })

  },
  schemas
}