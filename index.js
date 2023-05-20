// ---------------------------------------------------------------------------------------------
// Navigation Bar Section








// ---------------------------------------------------------------------------------------------
// Home Section

// Scroll Transitions, using IntersectionObserver API

const onScroll = document.querySelectorAll(".on-scroll")

// This function will run whenever the visibility of each element changes
const observer = new IntersectionObserver((i) => {
    i.forEach((item) => {
        if (item.isIntersecting) {
            item.target.classList.add('show')
        }
        // else {
        //     item.target.classList.remove('show')
        // }
    })
})

onScroll.forEach((i) => {
    return observer.observe(i)
})