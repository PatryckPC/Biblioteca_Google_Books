/* Aqui solo se encuentra la funcion para buscar o crear un usuario en la base de datos que tenemos 
Es usado por auth.js 
NO TOCAR*/

const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Función para buscar o crear un usuario en la base de datos
function findOrCreate({ googleID }, done) {
  const query = 'SELECT * FROM users WHERE googleID = ?';
  db.query(query, [googleID], (err, rows) => {
    if (err) {
      return done(err, null);
    }

    if (rows.length > 0) {
      return done(null, rows[0]);
    }

    const insertQuery = 'INSERT INTO users (googleID) VALUES (?)';
    db.query(insertQuery, [googleID], (err, result) => {
      if (err) {
        return done(err, null);
      }

      const userID = result.insertId;
      const selectInsertedQuery = 'SELECT * FROM users WHERE userID = ?';
      db.query(selectInsertedQuery, [userID], (err, insertedUser) => {
        if (err) {
          return done(err, null);
        }
        return done(null, insertedUser[0]);
      });
    });
  });
}

module.exports = {
  findOrCreate,
};
