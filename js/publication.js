document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".publication-categories button");
    const rows = document.querySelectorAll(".publication-table tbody tr");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const filter = button.getAttribute("data-filter");

            /* Update active state */
            buttons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            /* Filter table rows */
            rows.forEach(row => {
                const type = row.getAttribute("data-type");

                if (filter === "all" || type === filter) {
                    row.style.display = "";
                } else {
                    row.style.display = "none";
                }
            });
        });
    });
});

