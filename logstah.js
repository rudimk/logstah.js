
var moment = require('moment-timezone')

/*

This module exports a single function, that takes two arguments:
1. The actual log message;
2. A dictionary containing the RethinkDB host, port, and desired timezone:
{'host:' <HOST>, port: <PORT>, timezone: <TIMEZONE>, format: <FORMAT>}

*/

var log = function(message, config){
    var rethinkdb = require('rethinkdbdash')({port: config['port'], host: config['host']})
    console.log('hello')
    console.log(config)
    var timestamp = moment.tz(config['timezone']).format(config['format'])
    /*var connection = null
    rethinkdb.connect({host: config['host'], port: config['port']}, function(error, conn){
        connection = conn
    })*/
    payload = {message: message, timestamp: timestamp}
    var status = null
    rethinkdb.db('relogr').table('relogr_logs').insert(payload).run().then(function(logInsert){
        status = true
    })
    return status
}

exports.log = log