document.querySelectorAll(".accordion-header").forEach(button => {
    button.addEventListener("click", () => {
        const body = button.nextElementSibling;
        body.style.display = body.style.display === "block" ? "none" : "block";
    });
});