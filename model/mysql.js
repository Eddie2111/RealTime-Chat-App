const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'testing'
});

connection.connect((err) => {
  if (err) {
    console.error(err.message);
    return;
  }
  console.log('mysql → 200');
});

module.exports = connection;