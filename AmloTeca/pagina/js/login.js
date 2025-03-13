window.onload = init;

function init() {
    isloggedin();
}

function isloggedin(){
    // Realiza una solicitud al servidor para verificar el estado de autenticación
    axios({
        method: 'get',
        url: 'http://localhost:3000/googlelogin/isloggedin',
    })
    .then(response => {
        // Si está autenticado, redirige a lobby.html
        if (response.data.isAuthenticated) {
            window.location.href = 'lobby.html';
        }
    })
    .catch(error => {
        console.error('Error en isloggedin:', error);  // Agrega este mensaje de consola para verificar si hay errores
    });
}


