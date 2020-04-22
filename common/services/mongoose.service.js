const config   = require('../config/env.config.js');
const mongoose = require('mongoose');

let count = 0;

const options = {
    autoIndex: false,       // Do not build indexes
    reconnectTries: 30,     // Retry up to 30 times
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10,           // Maintain up to 10 socket connections
    bufferMaxEntries: 0,    // If not connected, return errors immediately rather than waiting for reconnect
    useNewUrlParser: true,  // Suppress depreciation errors
    useUnifiedTopology: true
};

const connectWithRetry = () => {
    mongoose.connect(config.mongo_str, options).then(()=>{
        console.log('MongoDB database is connected.')
    }).catch(err=>{
        console.log('MongoDB database connection failed, automatic retry ... ', ++count);
        setTimeout(connectWithRetry, 5000)
    })
};

connectWithRetry();

exports.mongoose = mongoose;