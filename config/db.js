
const mysql = require('mysql2');
//Completar los campos... CONEXION LOCAL

//  const connection = mysql.createConnection({
//    host: 'localhost',
//    user: 'root',
//    password: 'antony24',
//    database: 'dsi'
//  });

//Completar los campos... CONEXION REMOTA
const connection = mysql.createConnection({
    host: 'roundhouse.proxy.rlwy.net',
    port: 27314,
    user: 'root',
    password: 'ocfQxpjVBKcxlTTWigpRTNYdnTZzorSK',
    database: 'railway'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to the MySQL server.');
});

module.exports = connection;
