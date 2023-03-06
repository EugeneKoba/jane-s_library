// ---------------------------------------------------------------------------------------------
// Navigation Bar Section








// ---------------------------------------------------------------------------------------------
// Search Section

// Taking in all inputs & buttons
searchInput = document.querySelector(".search-input")
searchBtn = document.querySelector(".search-btn")
searchImgEl = document.querySelector(".search-img-el")
searchTitleEl = document.querySelector(".search-title-el")
searchAuthorEl = document.querySelector(".search-author-el")




// Function to search for the Book Title

async function searchTitle() {
    // Fetch the OpenBook API. the 'q=' refers to the search result
    let response = await fetch(`https://openlibrary.org/search.json?q=${searchInput.value}`)
    response = await response.json()
    return response;
}

// Event Listener to listen for Search Button Click
searchBtn.addEventListener("click", async function() {
    // Initially creating an empty array
    let resultArray = []
    // use 'try' to get the Promise response from searchTitle()
    try {
        resultArray = await searchTitle()
    }
    // catch an error
    catch (error) {
        console.log("Error!")
        console.log(error)
    }
    // Print the response
    for(let i=0;i<2;i++) {
        searchTitleEl.innerHTML = `
        Title: ${resultArray.docs[i].title}
        Author: ${resultArray.docs[i].author_name}
        Work: ${resultArray.docs[i].key}`
    }
})