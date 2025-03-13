/* Aquí es donde se inicia el servidor y redirige las solicitudes al lugar correspondiente
   NO TOCAR */

// Importación de módulos necesarios
const morgan = require('morgan'); // Un middleware para registrar las solicitudes HTTP en la consola
const express = require('express'); // Un marco de aplicación web para Node.js
const path = require('path'); // Para manipular rutas de archivos y directorios

// Creación de una aplicación Express
const app = express();

// Importación de métodos
const googlelogin = require('./metodos/googlelogin'); // Importa métodos relacionados con la autenticación de Google
const searchbook = require('./metodos/searchbook'); // Importa métodos relacionados con la búsqueda de libros
const bookshelves = require('./metodos/bookshelves'); // Importa métodos relacionados con estanterías de libros

// Importación de middlewares
const notFound = require('./middleware/notFound'); // Middleware para manejar rutas no encontradas
const cors = require('./middleware/cors'); // Middleware para manejar el intercambio de recursos de origen cruzado (CORS)

// Configuración de middlewares en la aplicación Express
app.use(cors); // Usa el middleware de CORS para permitir el intercambio de recursos de origen cruzado

app.use(morgan('dev')); // Usa el middleware Morgan en modo 'dev' para registrar las solicitudes HTTP en la consola
app.use(express.json()); // Middleware para analizar los cuerpos de las solicitudes entrantes en formato JSON
app.use(express.urlencoded({ extended: true })); // Middleware para analizar los cuerpos de las solicitudes entrantes codificadas en URL

// Configuración de rutas estáticas para archivos HTML, CSS, JavaScript e imágenes
app.use('/pagina/html', express.static(path.join(__dirname, './pagina/html')));
app.use('/pagina/css', express.static(path.join(__dirname, './pagina/css')));
app.use('/pagina/js', express.static(path.join(__dirname, './pagina/js')));
app.use('/pagina/img', express.static(path.join(__dirname, './pagina/img')));

// Redirección de la raíz '/' a '/pagina/html/login.html'
app.get("/", (req, res) => {
    res.redirect("/pagina/html/login.html");
});

// Configuración de rutas para los diferentes métodos relacionados con la autenticación, búsqueda y estanterías de libros
app.use("/googlelogin", googlelogin);
app.use("/searchbook", searchbook);
app.use("/bookshelves", bookshelves);

// Middleware para manejar rutas no encontradas
app.use(notFound);

// Inicio del servidor Express en un puerto específico (3000 por defecto o el indicado por el entorno)
app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running..."); // Muestra un mensaje en la consola cuando el servidor se inicia correctamente
});
