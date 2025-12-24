const magazineButtons = document.querySelectorAll('.magazine-toggle-btn');
const magazineTables = document.querySelectorAll('.magazine-lang-table');

magazineButtons.forEach(btn => {
    btn.addEventListener('click', () => {

        // Remove active state from all buttons & tables
        magazineButtons.forEach(b => b.classList.remove('active'));
        magazineTables.forEach(t => t.classList.remove('active'));

        // Activate clicked button
        btn.classList.add('active');

        // Show corresponding table
        const targetTable = document.getElementById(btn.dataset.lang);
        if (targetTable) {
            targetTable.classList.add('active');
        }
    });
});
const rowsPerPage = 10;

/* ===============================
   CASE 1: LIBRARY PERSONNEL
   (UNCHANGED – already isolated)
================================ */

const personnelTable = document.getElementById("personnelTable");
const personnelPagination = document.getElementById("pagination");

if (personnelTable && personnelPagination) {

    const tbody = personnelTable.querySelector("tbody");
    const rows = Array.from(tbody.querySelectorAll("tr"));

    function displayPersonnelPage(page) {
        tbody.innerHTML = "";
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        rows.slice(start, end).forEach(row => tbody.appendChild(row));
    }

    function setupPersonnelPagination() {
        personnelPagination.innerHTML = "";
        const pageCount = Math.ceil(rows.length / rowsPerPage);

        for (let i = 1; i <= pageCount; i++) {
            const btn = document.createElement("button");
            btn.textContent = i;

            btn.onclick = () => {
                personnelPagination.querySelectorAll("button")
                    .forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                displayPersonnelPage(i);
            };

            if (i === 1) btn.classList.add("active");
            personnelPagination.appendChild(btn);
        }
    }

    setupPersonnelPagination();
    displayPersonnelPage(1);
}

/* =====================================
   CASE 2: MAGAZINES (SCOPED & SAFE)
===================================== */

document.querySelectorAll(".magazine-section").forEach(section => {

    const pagination = section.querySelector(".magazine-pagination");
    const buttons = section.querySelectorAll(".magazine-toggle-btn");
    const tables = section.querySelectorAll(".magazine-lang-table");

    let currentTable = section.querySelector(".magazine-lang-table.active");

    function setupPaginationForTable(table) {
        if (!table || !pagination) return;

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

    // INITIAL LOAD
    if (currentTable) {
        setupPaginationForTable(currentTable);
    }

    // LANGUAGE TOGGLE HANDLER
    buttons.forEach(btn => {
        btn.addEventListener("click", () => {

            // Toggle buttons
            buttons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            // Toggle tables
            tables.forEach(t => t.classList.remove("active"));

            currentTable = section.querySelector("#" + btn.dataset.lang);
            if (currentTable) {
                currentTable.classList.add("active");
                setupPaginationForTable(currentTable);
            }
        });
    });
});
        