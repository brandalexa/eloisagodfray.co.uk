const projectLinks = document.querySelectorAll(".project-link");
const projectCards = document.querySelectorAll(".work-card");

projectLinks.forEach(projectLink => {
    projectLink.addEventListener("mouseenter", () => {
        console.log(`Mouse entered ${projectLink.dataset.card}`)
        const cardId = projectLink.dataset.card;
        projectCards.forEach(projectCard => {
            projectCard.classList.remove("active");
        });
        const cards = document.querySelectorAll(`.work-card[data-card="${projectLink.dataset.card}"]`);
        if (cards.length > 1) {
            console.warn(`data-card ${projectLink.dataset.card} is referred to by more than one work card.`);
        }
        cards[0].classList.add("active");
    });

    projectLink.addEventListener("mouseleave", () => {
        console.log(`Mouse left ${projectLink.dataset.card}`);
        projectCards.forEach(projectCard => {
            projectCard.classList.remove("active");
        });
    });
});