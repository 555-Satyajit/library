document.querySelectorAll(".share-btn").forEach(button => {
    button.addEventListener("click", function (e) {
        e.stopPropagation();

        const card = this.closest(".member-card");

        // Close others
        document.querySelectorAll(".member-card").forEach(c => {
            if (c !== card) c.classList.remove("show-socials");
        });

        // Toggle current
        card.classList.toggle("show-socials");
    });
});

// Close on outside click
document.addEventListener("click", () => {
    document.querySelectorAll(".member-card").forEach(card => {
        card.classList.remove("show-socials");
    });
});

