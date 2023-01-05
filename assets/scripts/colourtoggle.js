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
    document.getElementById("toggle-image").setAttribute("src", "../assets/images/icons/toggle-".concat(mode).concat(".svg"));
}

function toggleAll(mode) {
    toggleName(mode, "h1");
    toggleName(mode, "h2");
    toggleName(mode, "h3");
    toggleName(mode, "h4");
    toggleName(mode, "h5");
    toggleName(mode, "h6");
    toggleName(mode, "li");
    toggleName(mode, "p");
    toggleName(mode, "html");
    toggleName(mode, "body");
    toggleName(mode, "button");
    toggleName(mode, "th");
    toggleName(mode, "td");
    toggleName(mode, "tr");
    toggleName(mode, "a");
    toggleID(mode, "star");
    toggleID(mode, "toggle-image");
    toggleID(mode, "light-icon");
    toggleID(mode, "dark-icon");
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
    }
    else if (colourMode == "dark") {
        toggleAll("dark");
        changeIcon("dark");
    }

    else if (colourMode == "auto") {
        let mode = window.matchMedia("(prefers-color-scheme: light)");
        if (mode.matches) {
            toggleAll("light");
            changeIcon("light");
        }
        else if (!mode.matches) {
            toggleAll("dark");
            changeIcon("dark");
        }
    }

    else {
        toggleAll("light");
        changeIcon("light");
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
        setCookie("colourMode", "light", 365);
    }
    checkColourMode();
}

let deviceMode = window.matchMedia("(prefers-color-scheme: light)");

if (getCookie("colourMode") == null) {
    setCookie("colourMode", "auto", 365);
    console.log("Auto cookie set.");
}

checkColourMode();

deviceMode.addEventListener("change", () => { checkColourMode(); });

document.getElementById("colour-toggle").addEventListener("click", () => { overrideColourMode(); });