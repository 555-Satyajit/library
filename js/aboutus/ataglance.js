const cards = document.querySelectorAll(".card");
    const details = document.querySelectorAll(".detail");

    cards.forEach(card => {
        card.addEventListener("click", () => {
            cards.forEach(c => c.classList.remove("active"));
            details.forEach(d => d.classList.remove("active"));

            card.classList.add("active");
            document.getElementById(card.dataset.target).classList.add("active");
        });
    });