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
        <div class="col-lg-4 ms-auto me-auto">
            <div class="d-flex">
                <div class="img-el">${img}</div>
                <div class="book-info p-3">
                    <h4 class="title-el">${title}</h4>
                    <p class="author-el text-muted">${author}</p>
                    <p class="publish-el text-muted mt-5 mb-1">Published in: ${publish}</p>
                    <p class="versions-el text-muted">Versions: ${versions}</p>
                    <button class="btn btn-lg btn-dark">Save</button>
                </div>
            </div>
        </div>
        `)
        bookResults.innerHTML = bookDetails
    }
}


// Event Listener to listen for Search Button Click
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
        }
        // Store the Book Content valiues in variables
        {   
            let title = result.docs[0].title
            let author = result.docs[0].author_name
            let publish = result.docs[0].publish_year[0]
            // Here, I'm getting the Image of the book. to find it, I need to:
            // 1a. find the Works of the book, which is located in the 'key'.
            let bookWorks = result.docs[0].key
            // 2. use the Works, and execute a 2nd fetch, to find the cover ID of the book, withinthe Works.
            return fetch(`https://openlibrary.org${bookWorks}.json`)
            .then((response2) => {
                return response2.json()
            })
            .then((response2) => {
                
                // This is where the cover ID is located in the Works Object/File.
                let coverID = response2.covers[0]
                // This is the format if the image Cover Links, in OpenLibrary:
                let img = `<img src="https://covers.openlibrary.org/b/id/${response2.covers[0]}-M.jpg">`
                let versions = response2.revision
                //  Run a function that Creates HTML Elements for each result
                BookTile.showDetails(title, author, publish, img, versions)
            })
        }
})


 
// Function to create a new tile when function is searched

