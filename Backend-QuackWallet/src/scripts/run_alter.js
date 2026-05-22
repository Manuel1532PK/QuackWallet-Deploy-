const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORT,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0
});

const sql = `ALTER TABLE Notificaciones ADD COLUMN ID_Usuario INT NOT NULL,
ADD FOREIGN KEY (ID_Usuario) REFERENCES Usuarios(ID_Usuarios);`;

connection.promise().execute(sql)
  .then(() => {
    console.log('Columna ID_Usuario agregada exitosamente a Notificaciones');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Error:', err.message);
    process.exit(1);
  });
