libraryForm = document.getElementById("library-form")
bookTitleEl = document.getElementById("book-title-el")
authorEl = document.getElementById("author-el")
isbnEl = document.getElementById("isbn-el")
submitBtn = document.getElementById("submit-btn")
libraryList = document.getElementById("library-list")

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
        console.log("Function Ran successfully!")
        if (event.target.className = 'delete-book') {
            event.target.parentElement.parentElement.remove()
        }
    }
}

class localStorage {
    static getBooks() {

    }

    static showBooks() {

    }

}

// Initialise Instance by setting variable equal to Instance
const createBook = new CreateBook();

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
    const book = new Book(bookTitle, author, isbn, dateAdded)
    // Run a prototype function to add Book to Library
    createBook.addBookToLibrary(book)
    
    // clear the book input fields
    bookTitleEl.value = ""
    authorEl.value = ""
    isbnEl.value = ""

    event.preventDefault() // Stop form from auto-firing when clicked
})

// Event Listener for Deleting Book from Library
libraryList.addEventListener("click", function(event, target) {

    console.log("Clicked!")
    createBook.deleteBook(event, target)

    event.preventDefault() // Stop form from auto-firing
})



