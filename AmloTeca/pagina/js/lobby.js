window.onload = init;


function init() {
    isloggedin();
    document.querySelector('.btn-primary').addEventListener('click', logout);

    // obtener la información del usuario al cargar la página
    getUserInfo();
}

// función para obtener la información del usuario
function getUserInfo() {
    axios({
        method: 'get',
        url: 'http://localhost:3000/googlelogin/userinfo',
    })
    .then(response => {
        
        const userNameElement = document.getElementById('userName');
        const userEmailElement = document.getElementById('userEmail');
        userEmailElement.textContent = `${response.data.email}.`;
    })
    .catch(error => {
        console.error('Error al obtener la información del usuario:', error);
    });
}


// VERIFICAR QUE INICIO SESIÓN (QUE ESTA VERIFICADO)
function isloggedin(){
    // Realiza una solicitud al servidor para verificar el estado de autenticación
    axios({
        method: 'get',
        url: 'http://localhost:3000/googlelogin/isloggedin',
    })
    .then(response => {
        // Si está autenticado, no hace nada
        if (!response.data.isAuthenticated) {
            window.location.href = 'login.html';
        }
    })
    .catch(error => {
        console.error('Error en isloggedin:', error);  // Agrega este mensaje de consola para verificar si hay errores
    });
}

// CERRAR SESIÓN
function logout() {
    // Realiza una solicitud al servidor para hacer logout utilizando Axios
    axios({
        method: 'get',
        url: 'http://localhost:3000/googlelogin/logout',
        withCredentials: true
    })
    .then(response => {
        window.location.href = 'login.html';
    })
    .catch(error => {
        console.error('Error al hacer logout', error);
    });
}

// BUSQUEDA DE LIBROS
function search() {
    const searchInput = document.getElementById('bookSearchInput').value;

    if (searchInput.trim() !== '') {
        // Realiza una solicitud al servidor para buscar libros utilizando Axios
        axios({
            method: 'get',
            url: `http://localhost:3000/searchbook/search?title=${encodeURIComponent(searchInput)}`,
        })
        .then(response => {
            displaySearchResults(response.data.items);  // Modificado para usar solo response.data.items
        })
        .catch(error => {
            console.error('Error al buscar libros:', error);
        });
    }
}

// TABLA LIBROS RESULTADO DE BUSQUEDA
function displaySearchResults(results) {
    const searchResultsContainer = document.getElementById('searchResultsContainer');
    searchResultsContainer.innerHTML = '';  // Limpia el contenedor antes de agregar nuevos resultados

    if (results.length > 0) {
        const table = document.createElement('table');
        table.classList.add('search-results-table');

        let currentRow;
        let count = 0;

        results.forEach(result => {
            if (count % 4 === 0) {
                currentRow = document.createElement('tr');
                table.appendChild(currentRow);
            }

            const cell = document.createElement('td');
            const listItem = document.createElement('div');
            
            // Extrae el título
            const title = result.volumeInfo.title;
            listItem.textContent = title;

            // Extrae la portada
            if (result.volumeInfo.imageLinks && result.volumeInfo.imageLinks.thumbnail) {
                const thumbnail = document.createElement('img');
                thumbnail.src = result.volumeInfo.imageLinks.thumbnail;
                listItem.appendChild(thumbnail);
            }

            cell.addEventListener('click', () => showBookDetails(result));  // Agrega el evento de clic

            cell.appendChild(listItem);
            currentRow.appendChild(cell);
            
            count++;
        });

        searchResultsContainer.appendChild(table);
    } else {
        searchResultsContainer.textContent = 'No se encontraron resultados';
    }
}

// OVERLAY DE DETALLES
function showBookDetails(book) {
    const modalOverlay = document.createElement('div');
    modalOverlay.classList.add('modal-overlay');

    const modalContent = `
        <div class="book-details-modal">
            <h2>${book.volumeInfo.title}</h2>
            <p><strong>Categorías:</strong> ${book.volumeInfo.categories ? book.volumeInfo.categories.join(', ') : 'No disponible'}</p>
            <p><strong>Número de páginas:</strong> ${book.volumeInfo.pageCount ? book.volumeInfo.pageCount : 'No disponible'}</p>
            <p><strong>Fecha de publicación:</strong> ${book.volumeInfo.publishedDate ? book.volumeInfo.publishedDate : 'No disponible'}</p>
            <p><strong>Descripción:</strong> ${book.volumeInfo.description ? book.volumeInfo.description : 'No disponible'}</p>
            <div class="buttons-container2">
                <button onclick="openPreview('${book.volumeInfo.previewLink}')">Vista previa del libro</button>
                <button onclick="openBuyLink('${book.saleInfo.buyLink}')">Comprar el libro</button>
                <button onclick="addToLibrary('${book.id}')">Agregar a biblioteca</button>
                <button onclick="closeModal()">Cerrar</button>
            </div>
        </div>
    `;

    modalOverlay.innerHTML = modalContent;

    document.body.appendChild(modalOverlay);
}

// CERRAR OVERLAY
function closeModal() {
    const modalOverlay = document.querySelector('.modal-overlay');
    modalOverlay.remove();
}

// BOTONES COMPRAR Y VISTA PREVIA
function openPreview(previewLink) {
    window.open(previewLink, '_blank');
}
function openBuyLink(buyLink) {
    window.open(buyLink, '_blank');
}


// AGREGAR A LIBRERIA
function addToLibrary(bookId) {
    const libraryOverlay = document.createElement('div');
    libraryOverlay.classList.add('library-overlay');

    const libraryButtons = `
        <div class="library-buttons">
            <button onclick="addleidos('${bookId}')">Agregar a Leídos</button>
            <button onclick="addfavoritos('${bookId}')">Agregar a Favoritos</button>
            <button onclick="addleyendo('${bookId}')">Agregar a Leyendo</button>
            <button onclick="addporleer('${bookId}')">Agregar a Por Leer</button>
            <br></br>
            <br></br>
            <button onclick="lobby()">Volver</button>
        </div>
    `;

    libraryOverlay.innerHTML = libraryButtons;

    document.body.appendChild(libraryOverlay);
}

function lobby() {
    const libraryOverlay = document.querySelector('.library-overlay');
    libraryOverlay.remove();
}

// AGREGAR A LIBRERIA (BOTONES)
function addleidos(bookId){

    closeLibraryOverlay();
    showToast('Libro agregado a Leidos correctamente');

    console.log('Agregando a la biblioteca de leidos:', bookId);

    if (bookId.trim() !== '') {

        axios({
            method: 'post',
            url: `http://localhost:3000/bookshelves/agregar/leidos?id=${encodeURIComponent(bookId)}`,
        })
        .then(response => {

            console.log(response.data); 

        })
        .catch(error => {
            console.error('Error al agregar libro:', error);
        });
    }

}
function addfavoritos(bookId){

    closeLibraryOverlay();
    showToast('Libro agregado a Favoritos correctamente');

    console.log('Agregando a la biblioteca de favoritos:', bookId);

    if (bookId.trim() !== '') {

        axios({
            method: 'post',
            url: `http://localhost:3000/bookshelves/agregar/favoritos?id=${encodeURIComponent(bookId)}`,
        })
        .then(response => {

            console.log(response.data); 

        })
        .catch(error => {
            console.error('Error al agregar libro:', error);
        });
    }

}
function addleyendo(bookId){

    closeLibraryOverlay();
    showToast('Libro agregado a Leyendo correctamente');

    console.log('Agregando a la biblioteca de leyendo:', bookId);

    if (bookId.trim() !== '') {

        axios({
            method: 'post',
            url: `http://localhost:3000/bookshelves/agregar/leyendo?id=${encodeURIComponent(bookId)}`,
        })
        .then(response => {

            console.log(response.data); 

        })
        .catch(error => {
            console.error('Error al agregar libro:', error);
        });
    }

}
function addporleer(bookId){

    closeLibraryOverlay();
    showToast('Libro agregado a Por Leer correctamente');

    console.log('Agregando a la biblioteca de Por Leer:', bookId);

    if (bookId.trim() !== '') {

        axios({
            method: 'post',
            url: `http://localhost:3000/bookshelves/agregar/porleer?id=${encodeURIComponent(bookId)}`,
        })
        .then(response => {

            console.log(response.data); 

        })
        .catch(error => {
            console.error('Error al agregar libro:', error);
        });
    }

}

// CERRAR OVERLAY DE AGREGAR A LIBRERIA
function closeLibraryOverlay() {
    const libraryOverlay = document.querySelector('.library-overlay');
    libraryOverlay.remove();
}

// MOSTRAR NOTIFICACIÓN
function showToast(message) {
    const toast = document.createElement('div');
    toast.classList.add('toast');
    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000); // Desaparecerá después de 3 segundos, puedes ajustar este valor según tus preferencias.
}
// FIN AGREGAR LIBRERIA -------------------------------------------------------------------//

// PARA MENU DE LIBRERIAS
function redirectTo(page) {
    // Redirige a la página especificada
    window.location.href = page;
}

