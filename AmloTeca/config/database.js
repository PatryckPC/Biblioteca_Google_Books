/* Aquí se encuentra la conexión con la base de datos llamada 'amloteca' */

// Importación de módulos necesarios
const mysql = require('mysql'); // Módulo para interactuar con bases de datos MySQL
const util = require('util'); // Módulo utilitario de Node.js

// Creación del pool de conexiones a la base de datos
const pool = mysql.createPool({
    connectionLimit: 10, // Número máximo de conexiones en el pool
    host: 'localhost', // Dirección del servidor de la base de datos
    user: 'root', // Nombre de usuario para acceder a la base de datos
    password: '', // Contraseña para acceder a la base de datos
    database: 'amloteca' // Nombre de la base de datos a la que se conectará
});

// Promisify the query method to allow using async/await with database queries
// Convierte la función pool.query en una función que devuelve una promesa
pool.query = util.promisify(pool.query);

// Exportación del pool de conexiones para ser utilizado en otros archivos
module.exports = pool;
