const rowsPerPage = 10;
const pagination = document.getElementById("pagination");

/* ===============================
   CASE 1: LIBRARY PERSONNEL
   (Single table, no toggle)
================================ */
const personnelTable = document.getElementById("personnelTable");

if (personnelTable) {
    const tbody = personnelTable.querySelector("tbody");
    const rows = Array.from(tbody.querySelectorAll("tr"));

    function displayPersonnelPage(page) {
        tbody.innerHTML = "";
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        rows.slice(start, end).forEach(row => tbody.appendChild(row));
    }

    function setupPersonnelPagination() {
        pagination.innerHTML = "";
        const pageCount = Math.ceil(rows.length / rowsPerPage);

        for (let i = 1; i <= pageCount; i++) {
            const btn = document.createElement("button");
            btn.textContent = i;

            btn.onclick = () => {
                pagination.querySelectorAll("button")
                    .forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                displayPersonnelPage(i);
            };

            if (i === 1) btn.classList.add("active");
            pagination.appendChild(btn);
        }
    }

    setupPersonnelPagination();
    displayPersonnelPage(1);
}

/* ==========================================
   CASE 2: MAGAZINES / NEWSPAPERS
   (Language toggle tables)
========================================== */
let currentTable = document.querySelector(".lang-table.active");

function setupPaginationForTable(table) {
    if (!table) return;

    const tbody = table.querySelector("tbody");
    const rows = Array.from(tbody.querySelectorAll("tr"));
    pagination.innerHTML = "";

    function displayPage(page) {
        tbody.innerHTML = "";
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        rows.slice(start, end).forEach(row => tbody.appendChild(row));
    }

    const pageCount = Math.ceil(rows.length / rowsPerPage);

    for (let i = 1; i <= pageCount; i++) {
        const btn = document.createElement("button");
        btn.textContent = i;

        btn.onclick = () => {
            pagination.querySelectorAll("button")
                .forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            displayPage(i);
        };

        if (i === 1) btn.classList.add("active");
        pagination.appendChild(btn);
    }

    displayPage(1);
}

/* INITIAL LOAD FOR MAGAZINES */
if (currentTable) {
    setupPaginationForTable(currentTable);
}

/* LANGUAGE TOGGLE HANDLER */
document.querySelectorAll(".toggle-btn").forEach(btn => {
    btn.addEventListener("click", () => {

        // Toggle buttons
        document.querySelectorAll(".toggle-btn")
            .forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        // Toggle tables
        document.querySelectorAll(".lang-table")
            .forEach(t => t.classList.remove("active"));

        currentTable = document.getElementById(btn.dataset.lang);
        if (currentTable) {
            currentTable.classList.add("active");
            setupPaginationForTable(currentTable);
        }
    });
});