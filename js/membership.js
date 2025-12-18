
document.querySelectorAll(".membership-toggle").forEach(btn => {
    btn.addEventListener("click", () => {
        const item = btn.parentElement;

        document.querySelectorAll(".membership-item").forEach(i => {
            if (i !== item) {
                i.classList.remove("active");
                i.querySelector(".membership-icon").textContent = "+";
            }
        });

        const icon = btn.querySelector(".membership-icon");
        item.classList.toggle("active");
        icon.textContent = item.classList.contains("active") ? "−" : "+";
    });
});

