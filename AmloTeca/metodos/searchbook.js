/* Aqui se encuentra el metodo o ruta para cuando buscas un titulo en el buscador general
Regresa el resultado a lobby.js
NO TOCAR A MENOS QUE SEPAS LO QUE HACES */

const express = require('express');
const axios = require('axios');

const searchbook = express.Router();

searchbook.get('/search', async (req, res) => {
    try {
        const title = req.query.title;

        // Realiza la solicitud a la API
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(title)}&key=AIzaSyA6SaT23KNiiA6DnUfUQTvFeyAcQEkwnSU`+`&maxResults=40`);

        res.json(response.data);
        
    } catch (error) {
        console.error('Error al hacer la solicitud a la API:', error);
        res.status(500).json({ error: 'Error interno del servidor', details: error.message });
    }
});

module.exports = searchbook;