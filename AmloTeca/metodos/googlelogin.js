/* Aqui se encuentra todo lo necesario para iniciar sesión con google
Usa auth.js que a su vez usa login.js
utilizando la libreria de passport para manejar el inicio de sesion y
express-session para guardarlas y poder usarlas para autenticar en las 
demas paginas (como el jwt que usamos en el taller) 
NO TOCAR */ 

const express = require('express');
const session = require('express-session');
const passport = require('passport');
require('./auth');

const googlelogin = express.Router();


function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

//
googlelogin.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
googlelogin.use(passport.initialize());
googlelogin.use(passport.session());

//Requerimientos del correo
googlelogin.get('/auth/google',
  passport.authenticate('google', { scope: [ 'email', 'profile', 'https://www.googleapis.com/auth/books' ] }
));

//Autentificacion
googlelogin.get( '/auth/google/callback',
  passport.authenticate( 'google', {
    successRedirect: '/pagina/html/lobby.html', // A donde va despues de iniciar sesion
    failureRedirect: '/googlelogin/auth/google/failure' // A donde si da ERROR
  }), 
);

//Si el usuario ya esta autenticado 
googlelogin.get('/isloggedin', (req, res) => {
  // Devuelve un objeto que indica si el usuario está autenticado
  console.log(req.isAuthenticated());
  res.json({ isAuthenticated: req.isAuthenticated() });
});

//Cierre de sesion
googlelogin.get('/logout', (req, res) => {
  req.session.destroy();
  req.logout(() => {
    res.send('Goodbye!');
  });
});

//Autentificacion incorrecta
googlelogin.get('/auth/google/failure', (req, res) => {
  res.send('Failed to authenticate..');
});

//Info del usuario
googlelogin.get('/userinfo', isLoggedIn, (req, res) => {
  // Devuelve la información del usuario
  res.json({
    displayName: req.user.displayName,
    email: req.user.email,
  });
});


module.exports = googlelogin;