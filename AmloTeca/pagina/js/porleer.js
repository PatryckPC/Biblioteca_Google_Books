window.onload = init;

function init() {
    isloggedin();
    getbookshelf();
}

function isloggedin() {
    // Realiza una solicitud al servidor para verificar el estado de autenticación
    axios({
        method: 'get',
        url: 'http://localhost:3000/googlelogin/isloggedin',
    })
        .then(response => {
            // Si no está autenticado, redirige a login.html
            if (!response.data.isAuthenticated) {
                window.location.href = 'login.html';
            }
        })
        .catch(error => {
            console.error('Error en isloggedin:', error);  // Agrega este mensaje de consola para verificar si hay errores
        });
}

function getbookshelf() {
    axios({
        method: 'get',
        url: 'http://localhost:3000/bookshelves/porleer',
    })
        .then(response => {
            // Hacer algo con los resultados obtenidos
            displayBooks(response.data.items);
        })
        .catch(error => {
            console.error('Error en getbookshelf:', error);  // Agrega este mensaje de consola para verificar si hay errores
        });
}

// LISTA DE LIBROS
function displayBooks(books) {
    const bookListContainer = document.getElementById('book-list');
    
    books.forEach(book => {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book');

        const bookImage = document.createElement('img');
        if (book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail) {
            bookImage.src = book.volumeInfo.imageLinks.thumbnail;
        } else {
            // SI NO HAY IMAGEN PONE ESTA
            bookImage.src = '../img/verguisas.jpeg'; 
        }
        bookImage.alt = 'Portada del libro';

        const bookInfo = document.createElement('div');
        bookInfo.classList.add('book-info');

        const bookTitle = document.createElement('div');
        bookTitle.classList.add('book-title');
        if (book.volumeInfo.title) {
            bookTitle.textContent = book.volumeInfo.title;
        } else {
            bookTitle.textContent = 'Título no disponible';
        }

        const bookAuthor = document.createElement('div');
        bookAuthor.classList.add('book-author');
        if (book.volumeInfo.authors && book.volumeInfo.authors.length > 0) {
            bookAuthor.textContent = `Autor: ${book.volumeInfo.authors.join(', ')}`;
        } else {
            bookAuthor.textContent = 'Autor no disponible';
        }

        const bookDescription = document.createElement('div');
        bookDescription.classList.add('book-description');
        if (book.volumeInfo.description) {
            bookDescription.textContent = book.volumeInfo.description;
        } else {
            bookDescription.textContent = 'Descripción no disponible';
        }

        const bookPublishedDate = document.createElement('p');
        bookPublishedDate.classList.add('book-published-date');
        if (book.volumeInfo.publishedDate) {
            bookPublishedDate.textContent = " DATE: " + book.volumeInfo.publishedDate;
        } else {
            bookPublishedDate.textContent = 'Fecha de publicación no disponible';
        }

        const bookPageCount = document.createElement('p');
        bookPageCount.classList.add('book-page-count');
        if (book.volumeInfo.pageCount) {
            bookPageCount.innerHTML = `<strong>Número de páginas:</strong> ${book.volumeInfo.pageCount}`;
        } else {
            bookPageCount.textContent = 'Número de páginas no disponible';
        }

        const bookCategories = document.createElement('p');
        bookCategories.classList.add('book-categories');
        if (book.volumeInfo.categories && book.volumeInfo.categories.length > 0) {
            bookCategories.innerHTML = `<strong>Categorías:</strong> ${book.volumeInfo.categories.join(', ')}`;
        } else {
            bookCategories.textContent = 'Categorías no disponibles';
        }

        const bookPreviewLink = document.createElement('p');
        bookPreviewLink.classList.add('book-preview-link');
        if (book.volumeInfo.previewLink) {
            bookPreviewLink.innerHTML = `<strong>Enlace de vista previa:</strong> <a href="${book.volumeInfo.previewLink}" target="_blank">Vista previa del libro</a>`;
        } else {
            bookPreviewLink.textContent = 'Enlace de vista previa no disponible';
        }

        const bookBuyLink = document.createElement('p');
        bookBuyLink.classList.add('book-buy-link');
        if (book.saleInfo && book.saleInfo.buyLink) {
            bookBuyLink.innerHTML = `<strong>Enlace de compra:</strong> <a href="${book.saleInfo.buyLink}" target="_blank">Comprar el libro</a>`;
        } else {
            bookBuyLink.textContent = 'Enlace de compra no disponible';
        }

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.addEventListener('click', () => deleteBook(book.id));  // Asocia la función de eliminación al botón


        
        bookInfo.appendChild(bookTitle);
        bookInfo.appendChild(bookAuthor);
        bookInfo.appendChild(bookDescription);

        bookInfo.appendChild(bookPublishedDate);
        bookInfo.appendChild(bookPageCount);
        bookInfo.appendChild(bookCategories);
        bookInfo.appendChild(bookPreviewLink);
        bookInfo.appendChild(bookBuyLink);

        bookInfo.appendChild(deleteButton);

        bookDiv.appendChild(bookImage);
        bookDiv.appendChild(bookInfo);

        bookListContainer.appendChild(bookDiv);
    });
}
// FIN LISTA LIBROS

//ELIMINAR LIBRO
function deleteBook(bookId) {

    if (bookId.trim() !== '') {
        axios({
            method: 'post',
            url: `http://localhost:3000/bookshelves/eliminar/porleer?id=${encodeURIComponent(bookId)}`,
        })
        .then(response => {
            // Recarga la página después de eliminar el libro
            location.reload();
        })
        .catch(error => {
            console.error('Error al eliminar libro:', error);
        });
    }
}
