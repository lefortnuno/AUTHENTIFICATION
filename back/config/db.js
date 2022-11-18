"use strict"
const mysql = require('mysql')

const dbConn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "LOGIN_UTILISATEUR"
})

dbConn.connect( function (err) {
    if (err) throw err
    console.log('Connection a la base de donnee reussi !');
})

module.exports = dbConn
