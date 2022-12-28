
function hideImage() {
    let img = document.getElementById("image");
    img.style.opacity = "0";
}

function showImage(id) {
    let img = document.getElementById("image");
    img.setAttribute("src", "assets/images/hover/hover_".concat(id).concat(".webp"));
    img.style.opacity = "1";

}

function desktopViewport(tableElements) {
    if (window.matchMedia("(min-width: 1181px)").matches) {
        for (let i = 0; i < NUMBER_OF_PAGES; i++) {
            tableElements[i] = document.getElementById(i)
            tableElements[i].addEventListener("mouseenter", () => { showImage(i) });
            tableElements[i].addEventListener("mouseleave", hideImage);    
        }
    }
    else {
        for (let i = 0; i < NUMBER_OF_PAGES; i++) {
            tableElements[i].replaceWith(tableElements[i].cloneNode(true));
        }
    }
}

const NUMBER_OF_PAGES = 8;
const tableElements = [];
const windowSize = window.matchMedia("(min-width: 1181px)");

if (windowSize.matches) {desktopViewport(tableElements);}

windowSize.addEventListener("change", () => { desktopViewport(tableElements); });
