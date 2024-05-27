function getCookie(cname) {
    let name = cname + "=";
    let cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];

        while (cookie.charAt(0) == ' ') {
        cookie = cookie.substring(1);
        }

        if (cookie.indexOf(name) == 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    
    return null;
}

function changeWorkpageBackground() {
    let mode = getCookie("colourMode");
    let workpageBackground = document.getElementById("work-bg");

    if (workpageBackground != null) {
        workpageBackground.setAttribute("src", `../assets/images/background/empty.webp`)
    }
}

function hideAllImages() {
    let placement = document.getElementById("work-bg");
    
    placement.style.visibility = "visible";
    placement.className = "active";

    for (let i = 0; i < allImages.length; i++) {
        let currentImage = allImages[i];
        currentImage.classList.remove("active");
        currentImage.className = "inactive";
        currentImage.style.visibility = "hidden";
    }
}

function showImage(tableRowId) {
    for (let i = 0; i < allImages.length; i++) {
        let currentImage = allImages[i];

        if (i === tableRowId) {
            let placement = document.getElementById("work-bg")
            currentImage.style.visibility = "visible";
            currentImage.className = "active";

            placement.style.visibility = "hidden";
            placement.classList.remove("active");
            placement.className = "inactive";
        }
        else {
            currentImage.style.visibility = "hidden";
            currentImage.classList.remove("active");
            currentImage.className = "inactive";
        }
    }
}

function loadImages() {
    var mode = getCookie("colourMode");
    if (mode == "auto") {
        let preference = window.matchMedia("(prefers-color-scheme: light)");
        if (preference.matches) {
            mode = "light";
        }
        else if (!preference.matches) {
            mode = "dark";
        }
        else {
            mode = "light";
        }
    }

    document.getElementById("hover-images").insertAdjacentHTML("afterbegin", `
    <img alt="" id="work-bg" class="active" loading="eager" src="../assets/images/background/empty.webp">`);

    let images = [];

    for (let i = 0; i < NUMBER_OF_PAGES; i++) {
        document.getElementById("hover-images").insertAdjacentHTML("beforeend", `<img alt="" id="i${i}" class="inactive" loading="eager" src="../assets/images/hover/hover_${i}.webp">`);
        let currentImage = document.querySelector(`#i${i}`);
        images.push(currentImage);
        currentImage.style.animation = "ease-in 0.3s ease-in";
    }
    document.getElementById("work-bg").style.animation = "ease-in 0.3s ease-in";

    return images;
}

function desktopViewport(tableElements) {
    if (window.matchMedia("(min-width: 1181px)").matches) {
        if (!imagesLoaded) { 
            allImages = loadImages();
            imagesLoaded = true; 
        }

        for (let i = 0; i < NUMBER_OF_PAGES; i++) {
            tableElements[i] = document.getElementById(i)
            tableElements[i].addEventListener("mouseenter", () => { showImage(i); });
            tableElements[i].addEventListener("mouseleave", hideAllImages);    
        }

        document.getElementById("work-bg").classList.replace("inactive", "active")
    }
    else {
        for (let i = 0; i < NUMBER_OF_PAGES; i++) {
            tableElements[i].replaceWith(tableElements[i].cloneNode(true));
        }
        document.getElementById("work-bg").classList.replace("active", "inactive")
    }
}

const NUMBER_OF_PAGES = 8;
const tableElements = [];
const windowSize = window.matchMedia("(min-width: 1181px)");
let allImages = [];
let imagesLoaded = false;

if (windowSize.matches) {
    allImages = loadImages();
    imagesLoaded = true;
    desktopViewport(tableElements);
}

windowSize.addEventListener("change", () => { desktopViewport(tableElements); });
