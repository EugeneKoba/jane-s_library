libraryForm = document.getElementById("library-form")
bookTitleEl = document.getElementById("book-title-el")
authorEl = document.getElementById("author-el")
isbnEl = document.getElementById("isbn-el")
submitBtn = document.getElementById("submit-btn")
libraryList = document.getElementById("library-list")

// let noOfBooks = 0 This indicates how many books are in the library
let noOfBooks = 0 
let storedBooks;

// ES6 Book Class Constructor
class Book {
    constructor(bookTitle, author, isbn, dateAdded) {
        this.bookTitle = bookTitle
        this.author = author
        this.isbn = isbn
        this.dateAdded = new Date().toLocaleDateString() // Today's Date
    }
}

// Function Classes
class CreateBook {
    // Create a Table Row
    addBookToLibrary(book) {
        let row = document.createElement("tr")
        // fill the table row with the object elements
        row.innerHTML = `<td>${book.bookTitle}</td><td>${book.author}</td><td>${book.isbn}</td><td>${book.dateAdded}</td><td><i class="bi bi-x delete-book"></i></td>`
        // append the table row to the original Library
        libraryList.appendChild(row)
    }
    // Function to Delete book from Library
    deleteBook(event, target) {
        if (event.target.className.includes('delete-book')) {
            event.target.parentElement.parentElement.remove()
        }
    }
}

// LocalStorage Classes
class localStore {
    // Retrieve Stored Book Array from Local Storage
    static getBooks() {
        if (localStorage.getItem('storedBooks') === null) {
            storedBooks = [];
            console.log("New Array Created!")
        }
        else {
            storedBooks = JSON.parse(localStorage.getItem('storedBooks'))
        }
        return storedBooks;
    }

    static showBooks() {
        // Show available books in Local Storage
        const storedBooks = localStore.getBooks()
        storedBooks.forEach(function(book){
            const createBook = new CreateBook
            createBook.addBookToLibrary(book)
        })
    }
    // Add Book to Book Array
    static addBook(book) {
        
        let storedBooks = localStore.getBooks()
        noOfBooks++
        storedBooks.push(book)
        localStorage.setItem('storedBooks', JSON.stringify(storedBooks))
    }

    static deleteBook(event, target) {
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

// Event Listener to load Local Storage data (Previous Books Stored) when page is loaded

document.addEventListener("DOMContentLoaded", localStore.showBooks)


// Event Listener for Adding Book to Library
submitBtn.addEventListener("click", function(event) {
    
    // Store book values into variables
    let bookTitle = bookTitleEl.value
    let author = authorEl.value
    let isbn = isbnEl.value
    let dateAdded = ''

    // Validate/Check if user inputs are valid
    if (bookTitle == "" || author == "" || isbn == "") {
        alert("Please enter a valid Book Title, Author Name & ISBN.")
        return;
    }

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
libraryList.addEventListener("click", function(event, target) {

    createBook.deleteBook(event, target)
    localStore.deleteBook(event, target)

    event.preventDefault() // Stop form from auto-firing
})



