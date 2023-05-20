// ---------------------------------------------------------------------------------------------
// Navigation Bar Section








// ---------------------------------------------------------------------------------------------
// Library Section

// Taking in .html inputs & buttons
libraryForm = document.getElementById("library-form")
bookTitleEl = document.getElementById("book-title-el")
authorEl = document.getElementById("author-el")
isbnEl = document.getElementById("isbn-el")
submitBtn = document.getElementById("submit-btn")
libraryList = document.getElementById("library-list")


let isBookInvalid = false,
    isAuthorInvalid = false,
    isIsbnInvalid = false,
    storedBooks,
    regExp;

// ES6 Book Class Constructor
class Book {
    constructor(bookTitle, author, isbn, dateAdded) {
        this.bookTitle = bookTitle
        this.author = author
        this.isbn = isbn
        this.dateAdded = new Date().toLocaleDateString() // Today's Date
    }
}

// Classes
class CreateBook {
    // Create a Table Row
    addBookToLibrary(book) {
        let row = document.createElement("tr")
        // fill the table row with the object elements
        row.innerHTML = `<td>${book.bookTitle}</td><td>${book.author}</td><td>${book.isbn}</td><td class="date">${book.dateAdded}</td><td><i class="bi bi-x delete-book"></i></td>`
        // append the table row to the original Library
        libraryList.appendChild(row)
    }
    // Function to Delete book from Library
    deleteBook(event) {
        if (event.target.className.includes('delete-book')) {
            event.target.parentElement.parentElement.remove()
        }
    }

     // Function to check if Author Name is valid
     static validateBook() {
        // Function used to check if Name is valid 
        if (bookTitleEl.value === '') {
            CreateBook.showAlert("Book Name")
            bookTitleEl.value = ""
            isBookInvalid = true
            return;
        } else {
            isBookInvalid = false
        }
    }
 
    // Function to check if Author Name is valid
    static validateAuthor() {
        // Regular Expressions used to check if Name is 2-50 normal letters long, incl. spacebar. 
        let regExp = /^[a-zA-Z .-]{2,50}$/
        if (!regExp.test(authorEl.value) || authorEl.value == '') {
            CreateBook.showAlert("Author Name")
            authorEl.value = ""
            isAuthorInvalid = true
            return;
        } else {
            isAuthorInvalid = false
        }
        regExp = ""; // Reset RegExp variable
    }

    // Function to check if ISBN is valid
    static validateIsbn() {
        // Regular Expressions used to ensure no invalid characters are entered. American Library Standard states that Every ISBN can either be 10 or 13 digits long, with  max. 4 hyphens.
        let regExp = /^[0-9 -]{10,17}/
        if (!regExp.test(isbnEl.value) || isbnEl.value == '') {
            CreateBook.showAlert("ISBN (in the Following Format: xxx-x-xx-xxxxxx-x)")
            isbnEl.value = ""
            isIsbnInvalid = true
            return;
        } else {
            isIsbnInvalid = false
        }
        regExp = ""; // Reset RegExp variable
    }

    static showAlert(incorrect) {
        alert(`Error: Please enter a valid ${incorrect}.`)
        return;
    }
}

class localStore {
    // Retrieve Stored Book Array from Local Storage
    static getBooks() {
        if (localStorage.getItem('storedBooks') === null) {
            storedBooks = [];
        }
        else {
            storedBooks = JSON.parse(localStorage.getItem('storedBooks'))
        }
        return storedBooks;
    }

    static showBooks() {
        // Show available books in Local Storage
        const storedBooks = localStore.getBooks()
        storedBooks.forEach(book => {
            const createBook = new CreateBook
            createBook.addBookToLibrary(book)
        })
    }
    // Add Book to Book Array
    static addBook(book) {
        let storedBooks = localStore.getBooks()
        storedBooks.push(book)
        localStorage.setItem('storedBooks', JSON.stringify(storedBooks))
    }

    static deleteBook(event) {
        // Delete the First Row from Library
        let storedBooks = localStore.getBooks()
            if (event.target.className.includes('delete-book')) {
                storedBooks.shift()
        }
        localStorage.setItem('storedBooks', JSON.stringify(storedBooks))
    }
}

// Initialise Instances here
const createBook = new CreateBook();
function makeBook() {
    const book = new Book(bookTitleEl.value, authorEl.value, isbnEl.value)
    return book;
}

// EVENT LISTENERS

// Event Listener to load Local Storage data (Previous Books Stored) when page is loaded
document.addEventListener("DOMContentLoaded", localStore.showBooks)

// Event Listener for Adding Book to Library
submitBtn.addEventListener("click", event => {
    // Run functions to check if Book Title, Author Name & ISBN is valid
    CreateBook.validateBook()
    CreateBook.validateAuthor()
    CreateBook.validateIsbn()
    // Stop book from being added if values are invalid
    if (isBookInvalid == true || isAuthorInvalid == true || isIsbnInvalid == true) {
        return;
    } 
    // Store book values into variables
    let bookTitle = bookTitleEl.value,
        author = authorEl.value,
        isbn = isbnEl.value,
        dateAdded = ''
    // Create new book
    let book = makeBook()
    // Run a prototype function to add Book to Library
    createBook.addBookToLibrary(book)

    // Add book to LocalStorage
    localStore.addBook(book)
    
    // clear the book input fields
    bookTitleEl.value = ""
    authorEl.value = ""
    isbnEl.value = ""

    event.preventDefault() // Stop form from auto-firing when clicked
})

// Event Listener for Deleting Book from Library
libraryList.addEventListener("click", (event) => {
    createBook.deleteBook(event)
    localStore.deleteBook(event)
    event.preventDefault() // Stop form from auto-firing
})

