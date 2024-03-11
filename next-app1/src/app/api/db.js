import mysql from 'mysql';
//var Net = require('net');
const db = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'users'
})

module.exports = db;