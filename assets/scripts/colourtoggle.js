function setCookie(name, value, expiryDays) {
    const date = new Date();
    date.setTime(date.getTime() + (expiryDays * 24 * 60 * 60 * 1000));
    let expires = "expires="+date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

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

function changeIcon(mode) {
    let toggleImg = document.getElementById("toggle-image");
    if (toggleImg != null) {
        toggleImg.setAttribute("src", "/assets/images/icons/toggle-".concat(mode).concat(".svg"));
    }
}

function changeFavicon(mode) {
    document.querySelector("link[rel='icon']").setAttribute("href", "/assets/images/icons/favicon-".concat(mode).concat(".png"));
}

function toggleAll(mode) {
    let names = ["h1", "h2", "h3", "h4", "h5", "h6", "li", "p", "html", "body", "button", "th", "td", "tr", "a"];
    let ids = ["star", "toggle-image", "light-icon", "dark-icon"];

    for (let i = 0; i < names.length; i++)
        toggleName(mode, names[i]);

    for (let i = 0; i < ids.length; i++)
        toggleID(mode, ids[i]);
}

function toggleName(mode, name) {
    elements = document.getElementsByTagName(name);
    for (let i = 0; i < elements.length; i++) {
        elements[i].setAttribute("class", mode.concat("-mode"));
    }
}

function toggleID(mode, id) {
    let element = document.getElementById(id);
    if (element != null){
        element.setAttribute("class", mode.concat("-mode"));
    }
}

function checkColourMode() {
    let colourMode = getCookie("colourMode");

    if (colourMode == "light") {
        toggleAll("light");
        changeIcon("light");
        changeFavicon("light");
    }
    else if (colourMode == "dark") {
        toggleAll("dark");
        changeIcon("dark");
        changeFavicon("dark");
    }

    else if (colourMode == "auto") {
        let mode = window.matchMedia("(prefers-color-scheme: light)");
        if (mode.matches) {
            toggleAll("light");
            changeIcon("light");
            changeFavicon("light");
        }
        else if (!mode.matches) {
            toggleAll("dark");
            changeIcon("dark");
            changeFavicon("dark");
        }
    }

    else {
        toggleAll("light");
        changeIcon("light");
        changeFavicon("light");
    }
}

function overrideColourMode() {
    let colourMode = getCookie("colourMode");

    if (colourMode === "light") {
        setCookie("colourMode", "dark", 365);
    }
    else if (colourMode === "dark") {
        setCookie("colourMode", "light", 365);
    }
    else {
        if (window.matchMedia("(prefers-color-scheme: dark)").matches)
            setCookie("colourMode", "light", 365);
        else if (window.matchMedia("(prefers-color-scheme: light)").matches)
        setCookie("colourMode", "dark", 365);
    }
    checkColourMode();
}

let deviceMode = window.matchMedia("(prefers-color-scheme: light)");
let colourToggle = document.getElementById("colour-toggle");

if (getCookie("colourMode") == null) {
    setCookie("colourMode", "auto", 365);
}

checkColourMode();

deviceMode.addEventListener("change", () => { checkColourMode(); });

if (colourToggle != null) {
    colourToggle.addEventListener("click", () => { overrideColourMode(); });
}