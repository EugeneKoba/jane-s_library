// ---------------------------------------------------------------------------------------------
// Navigation Bar Section








// ---------------------------------------------------------------------------------------------
// Search Section

// Taking in all inputs & buttons
searchInput = document.querySelector(".search-input")
searchBtn = document.querySelector(".search-btn")
imgEl = document.querySelector(".img-el")
titleEl = document.querySelector(".title-el")
authorEl = document.querySelector(".author-el")
let bookWorks;



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
        titleEl.innerHTML = `Title: ${resultArray1.docs[0].title}`
        authorEl.innerHTML = `Author: ${resultArray1.docs[0].author_name}`
        // Here, I'm getting the Image of the book. to find it, I need to:
        // 1a. find the Works of the book, which is located in the 'key'.
        let bookWorks = resultArray1.docs[0].key
        // 2. use the Works, and execute a 2nd fetch, to find the cover ID of the book, within the Works.
        return fetch(`https://openlibrary.org${bookWorks}.json`)
        .then(function(response2) {
            return response2.json()
        })
        .then(function(response2) {
            // This is where the cover ID is located in the Works Object/File.
            let coverID = response2.covers[0]
            // This is the format if the image Cover Links, in OpenLibrary:
            imgEl.innerHTML = `<img src="https://covers.openlibrary.org/b/id/${response2.covers[0]}-M.jpg">`
        })
    }
})


