const projectLinks = document.querySelectorAll(".project-link");
const projectCards = document.querySelectorAll(".work-card");
const projectNav = document.getElementById("nav-projects");
const projectCardContainer = document.getElementById("work-hover-images");

const INACTIVITY_PERIOD = 3000;
const CYCLE_INTERVAL = 3500;

let workInterval = null;
let idleTimer = null;
let projectIndex = 0;
let hasMouseleaveListener = false;


const rotate = () => {
    // Reset all project links and cards
    projectLinks.forEach(projectLink => {
        projectLink.classList.remove("force-active");
    });

    projectCards.forEach(projectCard => {
        projectCard.classList.remove("force-active");
    });

    // Link project link and card together for simultaneous force-active
    const cardId = projectLinks[projectIndex].dataset.card;

    // Select card-link pair
    const linkedCardsProjects = document.querySelectorAll(`[data-card="${cardId}"]`);

    if (linkedCardsProjects.length !== 2) {
        console.error(`No matching card and project pair was found for ${cardId}.`);
    }
    
    // Activate the selected card-link pair
    linkedCardsProjects.forEach(linkedCardProject => {
        linkedCardProject.classList.add("force-active");
    });

    projectIndex = ++projectIndex % projectLinks.length;
};


const startCycle = () => {
    // Start cycle immediately, then on interval
    rotate();
    workInterval = setInterval(rotate, CYCLE_INTERVAL);

    // Pause cycle when card is hovered
    projectCardContainer.addEventListener("mouseenter", () => stopCycle(true), {once: true});
};


const onCardContainerLeave = () => {
    console.info("Card container left.");
    hasMouseleaveListener = false;
    stopCycle();
    resetIdleTimer();
};


const stopCycle = (cardHover = false) => {
    clearInterval(workInterval);
    workInterval = null;

    if (cardHover === true) {
        if (!hasMouseleaveListener) {
            hasMouseleaveListener = true;
            projectCardContainer.addEventListener("mouseleave", onCardContainerLeave, {once: true});
            return;
        }
    }; 
    
    projectLinks.forEach(projectLink => projectLink.classList.remove("force-active"));
    projectCards.forEach(projectCard => projectCard.classList.remove("force-active"));
};


const resetIdleTimer = () => {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
        if (!workInterval) startCycle();
    }, INACTIVITY_PERIOD);
};


projectLinks.forEach(projectLink => {
    projectLink.addEventListener("mouseenter", () => {
        const cardId = projectLink.dataset.card;

        projectCards.forEach(projectCard => {
            projectCard.classList.remove("active");
        });

        // Select matching card. Should never be more than 1
        const cards = document.querySelectorAll(`.work-card[data-card="${projectLink.dataset.card}"]`);
        if (cards.length > 1) {
            console.warn(`data-card ${projectLink.dataset.card} is referred to by more than one work card.`);
        }

        cards[0].classList.add("active");
    });

    projectLink.addEventListener("mouseleave", () => {
        projectCards.forEach(projectCard => {
            projectCard.classList.remove("active");
        });
    });
});


addEventListener("load", startCycle, {once: true});

projectNav.addEventListener("mouseenter", () => {
    stopCycle();
    clearTimeout(idleTimer);
});

projectNav.addEventListener("mouseleave", resetIdleTimer);
