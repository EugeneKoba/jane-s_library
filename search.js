// ---------------------------------------------------------------------------------------------
// Navigation Bar Section








// ---------------------------------------------------------------------------------------------
// Search Section

// Taking in all inputs & buttons
searchInput = document.querySelector(".search-input")
searchBtn = document.querySelector(".search-btn")
isbnEl = document.querySelector(".isbn-el")
titleEl = document.querySelector(".title-el")
authorEl = document.querySelector(".author-el")
let bookWorks;



// Function to search for the Book Title

async function getBooks() {
    // Fetch the OpenBook API. the 'q=' refers to the search result
    let response = await fetch(`https://openlibrary.org/search.json?q=${searchInput.value}`)
    response = await response.json()
    console.log(response)
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
        // Here, I'm getting the isbn of the book. to find it, I need to:
        // 1a. find the Works of the book, which is located in the 'seed'.
        let bookWorks = resultArray1.docs[0].seed[0]
        console.log(bookWorks)
        // 2. use the result, and execute a 2nd fetch, to get the isbn using the book works.
        return fetch(`https://openlibrary.org${bookWorks}.json`)
        .then(function(response2) {
            return response2.json()
        })
        .then(function(response2) {
            console.log(response2)
            isbnEl.innerHTML = `
            ISBN: ${response2.isbn_13}`
        })
    }
})


