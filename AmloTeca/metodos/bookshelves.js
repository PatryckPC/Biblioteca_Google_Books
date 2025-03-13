/* Aqui se encuentran todos los metodos y rutas para el manejo de las librerías del usuario
una vez que ya inicio sesion; los get son para obtener la librería completa y los post
son para agregar o eliminar un libro en especifico (/agregar o /eliminar) 
Saben de que libreria eliminar por la URL que tiene cada funcion 
NO TOCAR A MENOS QUE SEPAS LO QUE HACES */

const express = require('express');
const axios = require('axios'); // 'axios' es una biblioteca para realizar solicitudes HTTP desde el navegador o Node.js.

const bookshelves = express.Router();

bookshelves.get('/leidos', async (req, res) => {
    try {
        // URL de la API de Google Books para obtener la estantería de libros "Leídos"
        const apiUrl = 'https://www.googleapis.com/books/v1/mylibrary/bookshelves/4/volumes';

        // Clave de la API de Google 
        const apiKey = global.API_KEY;

        // Token de acceso OAuth 2.0
        const accessToken = global.GOOGLE_ACCESS_TOKEN;

        // Configuración de la solicitud con la clave de la API y el token de acceso
        const config = {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
            params: {
                'key': apiKey,
            },
        };

        // Realiza la solicitud GET a la API de Google Books
        const response = await axios.get(apiUrl, config);

        // Envía los resultados de la API de Google Books al cliente
        res.json(response.data);
    } catch (error) {
        // Maneja los errores y envía detalles del error al cliente
        console.error('Error al hacer la solicitud a la API:', error);
        res.status(500).json({ error: 'Error interno del servidor', details: error.message });
    }
});

// Resto de las rutas y métodos (favoritos, leyendo, porleer, agregar, eliminar) con comentarios similares...

bookshelves.get('/favoritos', async (req, res) => {
    try {
        // URL de la API de Google Books
        const apiUrl = 'https://www.googleapis.com/books/v1/mylibrary/bookshelves/0/volumes';

        // Clave de la API de Google 
        const apiKey = global.API_KEY;

        // Token de acceso OAuth 2.0 
        const accessToken = global.GOOGLE_ACCESS_TOKEN;

        // Configuración de la solicitud con la clave de la API y el token de acceso
        const config = {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
            params: {
                'key': apiKey,
            },
        };

        // Realiza la solicitud GET a la API de Google Books
        const response = await axios.get(apiUrl, config);

        // Envia los resultados de la API de Google Books al cliente
        res.json(response.data);
    } catch (error) {
        // Maneja los errores y envía detalles del error al cliente
        console.error('Error al hacer la solicitud a la API:', error);
        res.status(500).json({ error: 'Error interno del servidor', details: error.message });
    }
});


bookshelves.get('/leyendo', async (req, res) => {
    try {
        // URL de la API de Google Books
        const apiUrl = 'https://www.googleapis.com/books/v1/mylibrary/bookshelves/3/volumes';

        // Clave de la API de Google 
        const apiKey = global.API_KEY;

        // Token de acceso OAuth 2.0 
        const accessToken = global.GOOGLE_ACCESS_TOKEN;

        // Configuración de la solicitud con la clave de la API y el token de acceso
        const config = {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
            params: {
                'key': apiKey,
            },
        };

        // Realiza la solicitud GET a la API de Google Books
        const response = await axios.get(apiUrl, config);

        // Envia los resultados de la API de Google Books al cliente
        res.json(response.data);
    } catch (error) {
        // Maneja los errores y envía detalles del error al cliente
        console.error('Error al hacer la solicitud a la API:', error);
        res.status(500).json({ error: 'Error interno del servidor', details: error.message });
    }
});


bookshelves.get('/porleer', async (req, res) => {
    try {
        // URL de la API de Google Books
        const apiUrl = 'https://www.googleapis.com/books/v1/mylibrary/bookshelves/2/volumes';

        // Clave de la API de Google
        const apiKey = global.API_KEY;

        // Token de acceso OAuth 2.0 
        const accessToken = global.GOOGLE_ACCESS_TOKEN;

        // Configuración de la solicitud con la clave de la API y el token de acceso
        const config = {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
            params: {
                'key': apiKey,
            },
        };

        // Realiza la solicitud GET a la API de Google Books
        const response = await axios.get(apiUrl, config);

        // Envia los resultados de la API de Google Books al cliente
        res.json(response.data);
    } catch (error) {
        // Maneja los errores y envía detalles del error al cliente
        console.error('Error al hacer la solicitud a la API:', error);
        res.status(500).json({ error: 'Error interno del servidor', details: error.message });
    }
});


bookshelves.post('/agregar/leidos', async (req, res) => {
    try {

        const id = req.query.id;

        const apiUrl = 'https://www.googleapis.com/books/v1/mylibrary/bookshelves/4/addVolume';

        const apiKey = global.API_KEY;

        const authToken = global.GOOGLE_ACCESS_TOKEN;

        // ID del libro que deseas agregar a la estantería "Leídos"
        const volumeId = encodeURIComponent(id);  

        const config = {
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
            params: {
                'key':apiKey,
            },
        };

        // Cuerpo de la solicitud 
        const requestBody = {
            volumeId: volumeId,
        };

        // Realiza la solicitud POST a la API de Google Books para agregar a la estantería "Leídos"
        const response = await axios.post(apiUrl, requestBody, config);

        // Envia la respuesta de la API de Google Books al cliente
        res.json(response.data);
    } catch (error) {
        // Maneja los errores y envía detalles del error al cliente
        console.error('Error al hacer la solicitud a la API:', error);
        res.status(500).json({ error: 'Error interno del servidor', details: error.message });
    }
});

bookshelves.post('/agregar/favoritos', async (req, res) => {
    try {

        const id = req.query.id;

        const apiUrl = 'https://www.googleapis.com/books/v1/mylibrary/bookshelves/0/addVolume';

        const apiKey = global.API_KEY;

        const authToken = global.GOOGLE_ACCESS_TOKEN;

        // ID del libro que deseas agregar a la estantería "Leídos"
        const volumeId = encodeURIComponent(id);  

        const config = {
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
            params: {
                'key':apiKey,
            },
        };

        // Cuerpo de la solicitud (puede estar vacío si no necesitas enviar datos adicionales)
        const requestBody = {
            volumeId: volumeId,
        };

        // Realiza la solicitud POST a la API de Google Books para agregar a la estantería "Leídos"
        const response = await axios.post(apiUrl, requestBody, config);

        // Envia la respuesta de la API de Google Books al cliente
        res.json(response.data);
    } catch (error) {
        // Maneja los errores y envía detalles del error al cliente
        console.error('Error al hacer la solicitud a la API:', error);
        res.status(500).json({ error: 'Error interno del servidor', details: error.message });
    }
});

bookshelves.post('/agregar/leyendo', async (req, res) => {
    try {

        const id = req.query.id;

        const apiUrl = 'https://www.googleapis.com/books/v1/mylibrary/bookshelves/3/addVolume';

        const apiKey = global.API_KEY;

        const authToken = global.GOOGLE_ACCESS_TOKEN;

        // ID del libro que deseas agregar a la estantería "Leídos"
        const volumeId = encodeURIComponent(id);  

        const config = {
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
            params: {
                'key':apiKey,
            },
        };

        // Cuerpo de la solicitud 
        const requestBody = {
            volumeId: volumeId,
        };

        // Realiza la solicitud POST a la API de Google Books para agregar a la estantería "Leídos"
        const response = await axios.post(apiUrl, requestBody, config);

        // Envia la respuesta de la API de Google Books al cliente
        res.json(response.data);
    } catch (error) {
        // Maneja los errores y envía detalles del error al cliente
        console.error('Error al hacer la solicitud a la API:', error);
        res.status(500).json({ error: 'Error interno del servidor', details: error.message });
    }
});

bookshelves.post('/agregar/porleer', async (req, res) => {
    try {

        const id = req.query.id;

        const apiUrl = 'https://www.googleapis.com/books/v1/mylibrary/bookshelves/2/addVolume';

        const apiKey = global.API_KEY;

        const authToken = global.GOOGLE_ACCESS_TOKEN;

        // ID del libro que deseas agregar a la estantería "Leídos"
        const volumeId = encodeURIComponent(id);  

        const config = {
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
            params: {
                'key':apiKey,
            },
        };

        // Cuerpo de la solicitud 
        const requestBody = {
            volumeId: volumeId,
        };

        // Realiza la solicitud POST a la API de Google Books para agregar a la estantería "Leídos"
        const response = await axios.post(apiUrl, requestBody, config);

        // Envia la respuesta de la API de Google Books al cliente
        res.json(response.data);
    } catch (error) {
        // Maneja los errores y envía detalles del error al cliente
        console.error('Error al hacer la solicitud a la API:', error);
        res.status(500).json({ error: 'Error interno del servidor', details: error.message });
    }
});

bookshelves.post('/eliminar/leidos', async (req, res) => {
    try {

        const id = req.query.id;

        const apiUrl = 'https://www.googleapis.com/books/v1/mylibrary/bookshelves/4/removeVolume';

        const apiKey = global.API_KEY;

        const authToken = global.GOOGLE_ACCESS_TOKEN;

        // ID del libro que deseas agregar a la estantería "Leídos"
        const volumeId = encodeURIComponent(id);  

        const config = {
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
            params: {
                'key':apiKey,
            },
        };

        // Cuerpo de la solicitud 
        const requestBody = {
            volumeId: volumeId,
        };

        // Realiza la solicitud POST a la API de Google Books para agregar a la estantería "Leídos"
        const response = await axios.post(apiUrl, requestBody, config);

        // Envia la respuesta de la API de Google Books al cliente
        res.json(response.data);
    } catch (error) {
        // Maneja los errores y envía detalles del error al cliente
        console.error('Error al hacer la solicitud a la API:', error);
        res.status(500).json({ error: 'Error interno del servidor', details: error.message });
    }
});

bookshelves.post('/eliminar/favoritos', async (req, res) => {
    try {

        const id = req.query.id;

        const apiUrl = 'https://www.googleapis.com/books/v1/mylibrary/bookshelves/0/removeVolume';

        const apiKey = global.API_KEY;

        const authToken = global.GOOGLE_ACCESS_TOKEN;

        // ID del libro que deseas agregar a la estantería "Leídos"
        const volumeId = encodeURIComponent(id);  

        const config = {
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
            params: {
                'key':apiKey,
            },
        };

        // Cuerpo de la solicitud 
        const requestBody = {
            volumeId: volumeId,
        };

        // Realiza la solicitud POST a la API de Google Books para agregar a la estantería "Leídos"
        const response = await axios.post(apiUrl, requestBody, config);

        // Envia la respuesta de la API de Google Books al cliente
        res.json(response.data);
    } catch (error) {
        // Maneja los errores y envía detalles del error al cliente
        console.error('Error al hacer la solicitud a la API:', error);
        res.status(500).json({ error: 'Error interno del servidor', details: error.message });
    }
});

bookshelves.post('/eliminar/leyendo', async (req, res) => {
    try {

        const id = req.query.id;

        const apiUrl = 'https://www.googleapis.com/books/v1/mylibrary/bookshelves/3/removeVolume';

        const apiKey = global.API_KEY;

        const authToken = global.GOOGLE_ACCESS_TOKEN;

        // ID del libro que deseas agregar a la estantería "Leídos"
        const volumeId = encodeURIComponent(id);  

        const config = {
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
            params: {
                'key':apiKey,
            },
        };

        // Cuerpo de la solicitud 
        const requestBody = {
            volumeId: volumeId,
        };

        // Realiza la solicitud POST a la API de Google Books para agregar a la estantería "Leídos"
        const response = await axios.post(apiUrl, requestBody, config);

        // Envia la respuesta de la API de Google Books al cliente
        res.json(response.data);
    } catch (error) {
        // Maneja los errores y envía detalles del error al cliente
        console.error('Error al hacer la solicitud a la API:', error);
        res.status(500).json({ error: 'Error interno del servidor', details: error.message });
    }
});

bookshelves.post('/eliminar/porleer', async (req, res) => {
    try {

        const id = req.query.id;

        const apiUrl = 'https://www.googleapis.com/books/v1/mylibrary/bookshelves/2/removeVolume';

        const apiKey = global.API_KEY;

        const authToken = global.GOOGLE_ACCESS_TOKEN;

        // ID del libro que deseas agregar a la estantería "Leídos"
        const volumeId = encodeURIComponent(id);  

        const config = {
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
            params: {
                'key':apiKey,
            },
        };

        // Cuerpo de la solicitud 
        const requestBody = {
            volumeId: volumeId,
        };

        // Realiza la solicitud POST a la API de Google Books para agregar a la estantería "Leídos"
        const response = await axios.post(apiUrl, requestBody, config);

        // Envia la respuesta de la API de Google Books al cliente
        res.json(response.data);
    } catch (error) {
        // Maneja los errores y envía detalles del error al cliente
        console.error('Error al hacer la solicitud a la API:', error);
        res.status(500).json({ error: 'Error interno del servidor', details: error.message });
    }
});


module.exports = bookshelves;
