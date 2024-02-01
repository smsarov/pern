const Pool = require('pg').Pool;
const pool = new Pool({
    user: "postgres",
    password: "admin",
    host: 'localhost',
    port: 5430,
    //database: 'postgres'
    database: 'smsarov'
})

module.exports = pool;