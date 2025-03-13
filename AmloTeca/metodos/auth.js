/* Este código es utilizado por googlelogin para iniciar sesión con Google y aquí se guardan
   variables importantes como las claves de Google.
   Utiliza login.js para buscar o crear un usuario en nuestra base de datos (findOrCreate).
   Redirige a googlelogin/auth/google/callback
   NO TOCAR */

// Declaración de una variable para almacenar el token de acceso de Google
let GOOGLE_ACCESS_TOKEN;

require('dotenv').config(); 

// Importación de módulos necesarios
const passport = require('passport'); 
const GoogleStrategy = require('passport-google-oauth2').Strategy;

// Importación de función findOrCreate desde el archivo login.js
const { findOrCreate } = require('./login');

// Definición de claves de Google y otras constantes relacionadas con la API de Google Books
global.GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
global.GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
global.API_URL = 'https://www.googleapis.com/books/v1/mylibrary/bookshelves';
global.API_KEY = process.env.GOOGLE_API_KEY;

// Configuración de la estrategia de autenticación de Google con Passport.js
passport.use(new GoogleStrategy({
  clientID: global.GOOGLE_CLIENT_ID,
  clientSecret: global.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/googlelogin/auth/google/callback",
  passReqToCallback: true,
},
function(request, accessToken, refreshToken, profile, done) {
  // Función para encontrar o crear un usuario en la base de datos usando la función findOrCreate
  findOrCreate({ googleID: profile.id }, function (err, user) {
    // Almacenamiento del token de acceso de Google
    global.GOOGLE_ACCESS_TOKEN = accessToken;
    return done(err, profile);
  });
}));

// Serialización y deserialización de usuarios para mantener el estado de autenticación con Passport
passport.serializeUser(function(user, done) {
  done(null, user);
}); 

passport.deserializeUser(function(user, done) {
  done(null, user);
});
