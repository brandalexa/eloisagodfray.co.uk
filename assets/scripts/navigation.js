function toggleMobileMenu() {
    let expandedNav = document.getElementById("expanded-nav");
    let displayStyle = window.getComputedStyle(expandedNav).display;
    let navBar = document.getElementById("mobile-nav-bar");
    let body = document.getElementsByTagName("body")[0];
    if (displayStyle === "flex") {
        expandedNav.style.display = "none";
        expandedNav.style.height = "0";
        body.setAttribute("class", "");
        body.removeAttribute("class");
    } else {
        expandedNav.style.display = "flex";
        expandedNav.style.height = "100vh";
        body.setAttribute("class", "disable-scroll");
    }
}

function disableMobileMenu() {
    document.getElementById("expanded-nav").style.display = "none";
}

function handleDesktopResize() {
    if (window.matchMedia("(min-width: 769px)").matches) {
        disableMobileMenu();
    }
}

// windowSize.addEventListener("change") => handleDesktopResize;