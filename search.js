// ---------------------------------------------------------------------------------------------
// Navigation Bar Section








// ---------------------------------------------------------------------------------------------
// Search Section

// Taking in all inputs & buttons
const searchInput = document.querySelector(".search-input")
const searchBtn = document.querySelector(".search-btn")
const imgEl = document.querySelector(".img-el")
const titleEl = document.querySelector(".title-el")
const authorEl = document.querySelector(".author-el")
const publishEl = document.querySelector(".publish-el")
const versionsEl = document.querySelector(".versions-el")
const bookResults = document.querySelector("#book-results")
let bookWorks,
    newBook; //This variable is to allow for innerHTML Concatenation inside bookTile function




// Function to search for the Book Title

async function getBooks() {
    // Fetch the OpenBook API. the 'q=' refers to the search result
    let response = await fetch(`https://openlibrary.org/search.json?q=${searchInput.value}`)
    response = await response.json()
    return response;
}



// Event Listener to listen for Search Button Click
searchBtn.addEventListener("click", async function() {
    // Initially creating an empty array
    let resultArray1 = []
    // use 'try' to get the Promise response from getBooks()
    for (let i=0;i<3;i++) {

   
        try {
            resultArray1 = await getBooks()
            
        }
        // catch an error
        catch (error) {
            console.log("Error!")
            console.log(error)
        }
        // Print the response
        {   
            let title = resultArray1.docs[0].title
            let author = resultArray1.docs[0].author_name
            let publish = resultArray1.docs[0].publish_year[0]
            // Here, I'm getting the Image of the book. to find it, I need to:
            // 1a. find the Works of the book, which is located in the 'key'.
            let bookWorks = resultArray1.docs[0].key
            // 2. use the Works, and execute a 2nd fetch, to find the cover ID of the book, withinthe Works.
            return fetch(`https://openlibrary.org${bookWorks}.json`)
            .then(function(response2) {
                return response2.json()
            })
            .then(function(response2) {
                
                // This is where the cover ID is located in the Works Object/File.
                let coverID = response2.covers[0]
                // This is the format if the image Cover Links, in OpenLibrary:
                let img = `<img src="https://covers.openlibrary.org/b/id/${response2.covers[0]}-M.jpg">`
                let versions = response2.revision
                //  Run a function that Creates HTML Elements for each result
                bookTile(title, author, publish, img, versions)
            })
        }
    }
})
 
// Function to create a new tile when function is searched
function bookTile(title, author, publish, img, versions) {
    // Create Book Tile
    newBook = (`
    <div class="col-lg-4">
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
    bookResults.innerHTML += newBook
     
}
