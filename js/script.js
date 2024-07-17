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