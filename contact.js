// ---------------------------------------------------------------------------------------------
// Navigation Bar Section








// ---------------------------------------------------------------------------------------------
// Contact Section

let formEl = document.getElementById("form-el")
    firstName = document.getElementById("first-name"), 
    lastName = document.getElementById("last-name"),
    messageEl = document.getElementById("message-el"),
    submitBtn = document.getElementById("submit-btn")
    btnLocation = document.getElementById("btn-location")

// ES6 Class to run Function upon Submission Button Click
class ContactForm {
    static submitForm() {
        // Temporarily add a 'display-none' class to Submit Btn, to remove it
        submitBtn.setAttribute("class", "d-none")
        // Create a new Element with Bootstrap 'Loading...' Classes attached to it
        let btnLoading = document.createElement("div")
        btnLoading.setAttribute("class", "btn btn-dark")
        btnLoading.innerHTML = `
            <span class="spinner-border spinner-border-sm"></span>
            Loading..`
        // Append Loading Button below the feedback text area
        btnLocation.appendChild(btnLoading)
        // after 1.5 seconds, do the following:
        setTimeout(() => {
            // remove Loading Button element
            btnLoading.remove()
            // remove display-none class from Submit button, and replace it with standard button classes
            submitBtn.classList.remove("d-none")
            submitBtn.setAttribute("class", "btn btn-dark")
            // Erase text from the form
            firstName.value = ""
            lastName.value = ""
            messageEl.value = ""
            // Alert to show submission has been successful
            alert("Thank You! Your Feedback has been sent!")
        }, 1500)
    }
}

submitBtn.addEventListener("click", (event) => {
    ContactForm.submitForm()
    event.preventDefault()
})

