const MAX_NAME_LENGTH = 30
const MAX_EMAIL_LENGTH = 50
const MAX_PHONE_NUMBER_LENGTH = 20
const MAX_SUBJECT_LENGTH = 50
const MAX_MESSAGE_LENGTH = 5000

const MIN_NAME_LENGTH = 2
const MIN_EMAIL_LENGTH = 5
const MIN_PHONE_NUMBER_LENGTH = 9
const MIN_SUBJECT_LENGTH = 3
const MIN_MESSAGE_LENGTH = 10


// toggle icon navbar
let menuIcon = document.querySelector("#menu-icon")
let navbar = document.querySelector(".navbar")

menuIcon.onclick = () => {
    menuIcon.classList.toggle("bx-x")
    navbar.classList.toggle("active")
}


// scroll sections
let sections = document.querySelectorAll("section")
let navLinks = document.querySelectorAll("header nav a")

window.onscroll = () => {
    sections.forEach(section => {
        let top = window.scrollY
        let offset = section.offsetTop - 80
        let height = section.offsetHeight
        let id = section.getAttribute("id")

        if (top >= offset && top < offset + height) {
            //active navbar links
            navLinks.forEach(link => {
                link.classList.remove("active")
                document.querySelector("header nav a[href*=" + id + "]").classList.add("active")
            })
            //active sections for animation on scroll
            section.classList.add("show-animate")
        }
        //if want to use animation that repeats on scroll use this
        else {
            section.classList.remove("show-animate")
        }
    })

    // sticky header
    let header = document.querySelector("header")
    header.classList.toggle("sticky", window.scrollY > 100)

    // remove toggle icon and navbar when click navbar links (scroll)
    menuIcon.classList.remove("bx-x")
    navbar.classList.remove("active")
    
    //animation footer on scroll
    let footer = document.querySelector("footer")
    footer.classList.toggle("show-animate", this.innerHeight + this.scrollY >= document.scrollingElement.scrollHeight)
}

//EmailJS function to send the message via email
function sendEmail(params) {
    emailjs.send("service_d3xft8g", "template_j6qhgkw", params).then(alert("Your message has been sent!"))
}

//limitations
document.getElementById("name").addEventListener("input", function(e) {
    if (this.value.length > MAX_NAME_LENGTH) {
        this.value = this.value.slice(0, MAX_NAME_LENGTH)
    }
})

document.getElementById('name').addEventListener('input', function (e) {
    e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
});

document.getElementById("email").addEventListener("input", function(e) {
    if (this.value.length > MAX_EMAIL_LENGTH) {
        this.value = this.value.slice(0, MAX_EMAIL_LENGTH)
    }
})

document.getElementById("phone-number").addEventListener("input", function(e) {
    if (this.value.length > MAX_PHONE_NUMBER_LENGTH) {
        this.value = this.value.slice(0, MAX_PHONE_NUMBER_LENGTH)
    }
})

document.getElementById("phone-number").addEventListener("keydown", function(e) {
    if (e.key === "e" || e.key === "E" || e.key === "+" || e.key === "-") {
        e.preventDefault()
    }
})

document.getElementById("subject").addEventListener("input", function(e) {
    if (this.value.length > MAX_SUBJECT_LENGTH) {
        this.value = this.value.slice(0, MAX_SUBJECT_LENGTH)
    }
})

document.getElementById("message").addEventListener("input", function(e) {
    if (this.value.length > MAX_MESSAGE_LENGTH) {
        this.value = this.value.slice(0, MAX_MESSAGE_LENGTH)
    }
})

//validations
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
}

function isValidInformation(params) {
    if (params.name.trim().length < MIN_NAME_LENGTH || params.name.trim() === "") {
        alert("Name must be at least " + MIN_NAME_LENGTH + " characters long.")
        return false
    }

    if (params.email.trim().length < MIN_EMAIL_LENGTH || !isValidEmail(params.email)|| params.email.trim() === "") {
        alert("Please enter a valid email address.")
        return false
    }

    if (params.phoneNumber.trim().length < MIN_PHONE_NUMBER_LENGTH || params.phoneNumber.trim() === "") {
        alert("Phone number must be between " + MIN_PHONE_NUMBER_LENGTH + " and " + MAX_PHONE_NUMBER_LENGTH + " digits long.")
        return false
    }

    if (params.subject.trim().length < MIN_SUBJECT_LENGTH || params.subject.trim() === "") {
        alert("Subject must be at least " + MIN_SUBJECT_LENGTH + " characters long.")
        return false
    }

    if (params.message.trim().length < MIN_MESSAGE_LENGTH || params.message.trim() === "") {
        alert("Message must be at least " + MIN_MESSAGE_LENGTH + " characters long.")
        return false
    }

    return true
}

document.getElementById("contact-form").addEventListener("submit", function(e) {
    e.preventDefault() 

    let params = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phoneNumber: document.getElementById("phone-number").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value
    }

    if (isValidInformation(params)) {
        sendEmail(params)
    }
})