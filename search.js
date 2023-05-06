// ---------------------------------------------------------------------------------------------
// Navigation Bar Section








// ---------------------------------------------------------------------------------------------
// Search Section

// Taking in all inputs & buttons
const searchInput = document.querySelector(".search-input"),
    searchBtn = document.querySelector(".search-btn"),
    imgEl = document.querySelector(".img-el"),
    titleEl = document.querySelector(".title-el"),
    authorEl = document.querySelector(".author-el"),
    publishEl = document.querySelector(".publish-el"),
    versionsEl = document.querySelector(".versions-el"),
    bookResults = document.querySelector("#book-results")
    saveBtn = document.querySelector("save-btn")
let bookWorks,
    bookDetails; //This variable is to allow for innerHTML Concatenation inside bookTile function


// ES6 Classes 

class BookTile {
    // Async/await function to fetch server details from OpenLibrary API
    static async getBooks(searchValue) {
        // Fetch the OpenBook API. the 'q=' refers to the search result
        let response = await fetch(`https://openlibrary.org/search.json?q=${searchValue}`)
        response = await response.json()
        return response;
    }

    // Create variable for Book Tile
    static showDetails(title, author, publish, img, versions) {
        bookDetails = (`
        <div class="col-lg-6 ms-auto me-auto p-2">
            <div class="d-flex">
                <div class="img-el">${img}</div>
                <div class="book-info p-3">
                    <h4 class="title-el">${title}</h4>
                    <p class="author-el text-muted">${author}</p>
                    <p class="text-muted mt-5 mb-1">Published in: ${publish}</p>
                    <p class="versions-el text-muted">Versions: ${versions}</p>
                    <button class="btn btn-pink save-btn">More Info</button>
                </div>
            </div>
        </div>
        `)
        bookResults.innerHTML = bookDetails
    }
}


// Event Listener to search OpenLibrary API for a book
searchBtn.addEventListener("click", async function() {
    // Initially creating an empty array
    let result = []
    // Setting the input value equal to a variable
    let searchValue = searchInput.value 
    // use 'try' to get the Promise response from getBooks()
        try {
            result = await BookTile.getBooks(searchValue)
        }
        // catch an error
        catch (error) {
            console.log("Error!")
            console.log(error)
            alert("ERROR: Book cannot be found. Please try again.")
        }
        // Store the Book Content valiues in variables
        try {   
            let title = result.docs[0].title,
                author = result.docs[0].author_name,
                publish = result.docs[0].publish_year[0];
            // Error Checks
            if (title == 'undefined' || author == 'undefined') {
                alert("ERROR: Book cannot be found. Please try again.")
                return;
            }
            // Here, I'm getting the Image of the book. to find it, I need to:
            // 1a. find the Works of the book, which is located in the 'key'.
            let bookWorks = result.docs[0].key
            // Error Checks
            if (!bookWorks) {
                alert("ERROR: Book cannot be found. Please try again.")
                return;
            }
            // 2. use the Works, and execute a 2nd fetch, to find the cover ID of the book, withinthe Works.
            return fetch(`https://openlibrary.org${bookWorks}.json`)
            .then((response2) => {
                return response2.json()
            })
            .then((response2) => {
                
                // This is where the cover ID is located in the Works Object/File.
                let coverID = response2.covers[0]
                                // Error Checks
                if (!bookWorks) {
                    alert("ERROR: Book cannot be found. Please try again.")
                    return;
                }
                // This is the format if the image Cover Links, in OpenLibrary:
                let img = `<img src="https://covers.openlibrary.org/b/id/${response2.covers[0]}-M.jpg">`
                let versions = response2.revision
                //  Run a function that Creates HTML Elements for each result
                BookTile.showDetails(title, author, publish, img, versions)
            })
            // Error Checks
            .catch((error) => {
                console.log(error)
                alert("ERROR: Book cannot be found. Please try again.")
                return;
            })
        }
        // Error Checks
        catch(error) {
            console.log(error)
            alert("ERROR: Book cannot be found; Please try again.")
            return;
        }
})

// Event Listener to Open new OpenLibrary tab with user input search results
bookResults.addEventListener("click", (event, target) => {
    if ((event.target.classList.contains("save-btn"))) {
        window.open(`https://openlibrary.org/search?q=${searchInput.value}`, '_blank')
    }
})

