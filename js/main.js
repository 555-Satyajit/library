/* ===============================
   GLOBAL ENTRY POINT
================================ */
document.addEventListener("DOMContentLoaded", () => {
    initHeroFlipbook();
    initCards();
    initLibsxAccordions();
    initMemberShare();
    initMagazineToggle();
    initPersonnelPagination();
    initMagazinePagination();
    initNavbar();
    initBookSlider();
    initNewsSlider();
    initGalleryTabs();
    initMembershipAccordion();
    initPublicationFilter();
    initSimpleAccordionDisplay();
});

/* ===============================
   HERO FLIPBOOK (jQuery / turn.js)
================================ */
function initHeroFlipbook() {

    // GUARD (VERY IMPORTANT)
    if (typeof $ === "undefined" || !$("#flipbook").length) return;

    // Hero text content for each page
    const heroContent = [
        {
            title: "Welcome to Harekrushna Mahatab Library",
            description: "Discover thousands of books, digital resources, and knowledge that inspire minds and transform lives. Your journey to learning starts here.",
            cta: "Explore Collection"
        },
        {
            title: "Digital Library Services",
            description: "Access our extensive digital collection from anywhere. E-books, journals, and multimedia resources available 24/7 for all members.",
            cta: "Get Started"
        },
        {
            title: "Community Learning Hub",
            description: "Join workshops, reading clubs, and events. Connect with fellow readers and expand your horizons in our vibrant community space.",
            cta: "View Events"
        },
        {
            title: "Research & Resources",
            description: "Access comprehensive research materials, academic journals, and expert guidance for your scholarly pursuits and professional development.",
            cta: "Start Research"
        }
    ];

    // Update hero text with smooth slide animation
    function updateHeroText(pageIndex) {
        const content = heroContent[pageIndex - 1];
        if (!content) return;

        const heroSection = $('#heroText');
        heroSection.addClass('changing');

        setTimeout(() => {
            $('#heroTitle').text(content.title);
            $('#heroDescription').text(content.description);
            $('#heroCta').text(content.cta);
            heroSection.removeClass('changing');
        }, 400);
    }

    // Initialize turn.js
    $("#flipbook").turn({
        width: 800,
        height: 500,
        autoCenter: false,
        display: 'single',
        acceleration: true,
        elevation: 50,
        gradients: true,
        duration: 1200,
        pages: 4,
        when: {
            turning: function (event, page) {
                updateButtons(page);
                updateHeroText(page);
            }
        }
    });

    // Update button states
    function updateButtons(page) {
        const totalPages = $("#flipbook").turn("pages");

        $('#prevBtn').prop('disabled', page === 1);
        $('#nextBtn').prop('disabled', page === totalPages);
    }

    // Control buttons
    $('#prevBtn').on('click', () => $("#flipbook").turn("previous"));
    $('#nextBtn').on('click', () => $("#flipbook").turn("next"));

    // Keyboard navigation
    $(window).on('keydown', function (e) {
        if (e.keyCode === 37) $("#flipbook").turn("previous");
        if (e.keyCode === 39) $("#flipbook").turn("next");
    });

    // Auto-play
    let autoPlay = setInterval(() => {
        const current = $("#flipbook").turn("page");
        const total = $("#flipbook").turn("pages");
        $("#flipbook").turn(current < total ? "next" : "page", 1);
    }, 3000);

    // Pause autoplay on hover
    $('.hero-section').hover(
        () => clearInterval(autoPlay),
        () => {
            autoPlay = setInterval(() => {
                const current = $("#flipbook").turn("page");
                const total = $("#flipbook").turn("pages");
                $("#flipbook").turn(current < total ? "next" : "page", 1);
            }, 5000);
        }
    );

    // Responsive resize
    function resizeBook() {
        const w = $(window).width();
        let bw = 400, bh = 260;

        if (w > 1400) { bw = 800; bh = 500; }
        else if (w > 1200) { bw = 700; bh = 440; }
        else if (w > 1024) { bw = 600; bh = 380; }
        else if (w > 768) { bw = 700; bh = 440; }
        else if (w > 600) { bw = 500; bh = 320; }

        $("#flipbook").turn("size", bw, bh);
    }

    $(window).on('resize', resizeBook);
    resizeBook();

    // Initial state
    updateButtons(1);
}


/* ===============================
   ACCORDIONS (ALL PAGES)
================================ */
function initLibsxAccordions() {
    const headers = document.querySelectorAll(".libsx-header-btn");
    if (!headers.length) return;

    headers.forEach(header => {
        header.addEventListener("click", () => {
            header.closest(".libsx-item").classList.toggle("active");
        });
    });
}


/* ===============================
   MAGAZINE LANGUAGE TOGGLE
================================ */
function initMagazineToggle() {

    const buttons = document.querySelectorAll(".magazine-toggle-btn");
    const tables = document.querySelectorAll(".magazine-lang-table");

    if (!buttons.length || !tables.length) return;

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {

            buttons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            tables.forEach(t => t.classList.remove("active"));

            const table = document.getElementById(btn.dataset.lang);
            if (table) table.classList.add("active");
        });
    });
}


/* ===============================
   PERSONNEL PAGINATION
================================ */
function initPersonnelPagination() {

    const personnelTable = document.getElementById("personnelTable");
    const pagination = document.getElementById("pagination");

    if (!personnelTable || !pagination) return;

    const rowsPerPage = 10;
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

/* ===============================
   Table with toogle PAGINATION
================================ */

function initMagazinePagination() {

    const sections = document.querySelectorAll(
        ".magazine-section, .skbb-table-section"
    );
    if (!sections.length) return;

    const rowsPerPage = 10;

    sections.forEach(section => {

        const pagination = section.querySelector(".magazine-pagination");
        const buttons = section.querySelectorAll(".magazine-toggle-btn");
        const tables = section.querySelectorAll(".magazine-lang-table");

        if (!pagination || !buttons.length || !tables.length) return;

        // STORE ORIGINAL ROWS
        const tableData = new Map();

        tables.forEach(table => {
            const tbody = table.querySelector("tbody");
            if (!tbody) return;

            tableData.set(
                table.id,
                Array.from(tbody.querySelectorAll("tr"))
            );
        });

        // ✅ FIX 1: correct current table
        let currentTable = section.querySelector(".magazine-lang-table.active");

        function buildPagination(table) {
            const tbody = table.querySelector("tbody");
            if (!tbody) return;

            const allRows = tableData.get(table.id);
            if (!allRows) return;

            pagination.innerHTML = "";

            function showPage(page) {
                tbody.innerHTML = "";
                const start = (page - 1) * rowsPerPage;
                const end = start + rowsPerPage;
                allRows.slice(start, end).forEach(r => tbody.appendChild(r));
            }

            const pageCount = Math.ceil(allRows.length / rowsPerPage);

            for (let i = 1; i <= pageCount; i++) {
                const btn = document.createElement("button");
                btn.textContent = i;

                btn.addEventListener("click", () => {
                    pagination.querySelectorAll("button")
                        .forEach(b => b.classList.remove("active"));
                    btn.classList.add("active");
                    showPage(i);
                });

                if (i === 1) btn.classList.add("active");
                pagination.appendChild(btn);
            }

            showPage(1);
        }

        // INITIAL LOAD
        if (currentTable) {
            buildPagination(currentTable);
        }

        // LANGUAGE SWITCH
        buttons.forEach(btn => {
            btn.addEventListener("click", () => {

                buttons.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");

                tables.forEach(t => t.classList.remove("active"));

                currentTable = section.querySelector("#" + btn.dataset.lang);
                if (!currentTable) return;

                currentTable.classList.add("active");
                buildPagination(currentTable);
            });
        });
    });
}



/* ===============================
   NAVBAR / SEARCH / DROPDOWN
================================ */
/* ===============================
   NAVBAR / SEARCH / DROPDOWN
================================ */
function initNavbar() {

    // GUARD: navbar must exist
    const navMenu = document.getElementById('navMenu');
    if (!navMenu) return;

    /* =========================
       SEARCH TOGGLE
    ========================= */
    const searchToggle = document.querySelector('.search-toggle');
    const topRight = document.querySelector('.top-right');
    const closeBtn = document.querySelector('.search-close');

    if (searchToggle && topRight && closeBtn) {
        searchToggle.addEventListener('click', function (e) {
            e.preventDefault();
            topRight.classList.add('search-open');

            const input = document.querySelector('.search-wrapper input');
            if (input) input.focus();
        });

        closeBtn.addEventListener('click', function () {
            topRight.classList.remove('search-open');
        });
    }

    /* =========================
       HAMBURGER MENU
    ========================= */
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navCloseBtn = document.getElementById('navCloseBtn');

    if (hamburgerBtn && navCloseBtn) {
        hamburgerBtn.addEventListener('click', () => {
            navMenu.classList.add('active');
        });

        navCloseBtn.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });

        // Close menu on normal link click
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (
                    !link.parentElement.classList.contains('has-dropdown') &&
                    !link.parentElement.classList.contains('has-submenu')
                ) {
                    navMenu.classList.remove('active');
                }
            });
        });
    }

    /* =========================
       DROPDOWN TOGGLE (MOBILE)
    ========================= */
    document.querySelectorAll('.has-dropdown > a').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            if (window.innerWidth <= 768) {
                const parent = this.parentElement;

                document.querySelectorAll('.navbar > ul > .has-dropdown')
                    .forEach(item => {
                        if (item !== parent) item.classList.remove('active');
                    });

                parent.classList.toggle('active');
            }
        });
    });

    /* =========================
       SUBMENU TOGGLE (MOBILE)
    ========================= */
    document.querySelectorAll('.has-submenu > a').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            if (window.innerWidth <= 768) {
                this.parentElement.classList.toggle('active');
            }
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && !e.target.closest('.has-dropdown')) {
            document.querySelectorAll('.has-dropdown')
                .forEach(item => item.classList.remove('active'));
        }
    });
}


/* ===============================
   BOOK SLIDER
================================ */
function initBookSlider() {

    const slider = document.getElementById("booksSlider");
    const prev = document.querySelector(".prev");
    const next = document.querySelector(".next");

    // GUARD
    if (!slider || !prev || !next) return;

    let index = 0;
    const visible = 4;
    const cardWidth = 258;

    function slide() {
        slider.style.transform = `translateX(-${index * cardWidth}px)`;
    }

    next.onclick = () => {
        if (index < slider.children.length - visible) index++;
        slide();
    };

    prev.onclick = () => {
        if (index > 0) index--;
        slide();
    };

    /* AUTO SLIDE */
    setInterval(() => {
        index = (index < slider.children.length - visible) ? index + 1 : 0;
        slide();
    }, 2500);
}



/* ===============================
   NEWS SLIDER
================================ */
function initNewsSlider() {

    const slider = document.getElementById("newsSlider");
    const prev = document.querySelector(".news-btn.prev");
    const next = document.querySelector(".news-btn.next");

    // GUARD
    if (!slider || !prev || !next) return;

    const cards = slider.children;
    if (!cards.length) return;

    let index = 0;

    function getCardWidth() {
        const card = cards[0];
        const gap = parseInt(getComputedStyle(slider).gap) || 0;
        return card.offsetWidth + gap;
    }

    function getVisibleCount() {
        return Math.floor(slider.parentElement.offsetWidth / getCardWidth());
    }

    function move() {
        slider.style.transform = `translateX(-${index * getCardWidth()}px)`;
    }

    next.onclick = () => {
        const visible = getVisibleCount();
        if (index < cards.length - visible) index++;
        move();
    };

    prev.onclick = () => {
        if (index > 0) index--;
        move();
    };

    /* AUTO SLIDE */
    setInterval(() => {
        const visible = getVisibleCount();
        index = (index < cards.length - visible) ? index + 1 : 0;
        move();
    }, 3000);

    window.addEventListener("resize", move);
}


/* ===============================
   GALLERY TABS
================================ */
function initGalleryTabs() {

    const tabs = document.querySelectorAll(".tab-btn");
    if (!tabs.length) return;

    tabs.forEach(btn => {
        btn.addEventListener("click", () => {
            tabs.forEach(b => b.classList.remove("active"));
            document.querySelectorAll(".gallery-bento")
                .forEach(g => g.classList.remove("active"));

            btn.classList.add("active");
            document.getElementById(btn.dataset.tab)?.classList.add("active");
        });
    });
}


/* ===============================
   MEMBERSHIP ACCORDION
================================ */
function initMembershipAccordion() {

    const toggles = document.querySelectorAll(".membership-toggle");
    if (!toggles.length) return;

    toggles.forEach(btn => {
        btn.addEventListener("click", () => {
            const item = btn.parentElement;
            const icon = btn.querySelector(".membership-icon");

            document.querySelectorAll(".membership-item").forEach(i => {
                if (i !== item) {
                    i.classList.remove("active");
                    const ic = i.querySelector(".membership-icon");
                    if (ic) ic.textContent = "+";
                }
            });

            item.classList.toggle("active");
            if (icon) {
                icon.textContent = item.classList.contains("active") ? "−" : "+";
            }
        });
    });
}

/* ===============================
   PUBLICATION FILTER
================================ */

function initPublicationFilter() {

    const buttons = document.querySelectorAll(".publication-categories button");
    const rows = document.querySelectorAll(".publication-table tbody tr");

    // GUARD
    if (!buttons.length || !rows.length) return;

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
}

/* ===============================
   ACCORDION (division page)
================================ */

function initAccordionToggleByDisplay() {

    const buttons = document.querySelectorAll(".accordion-header");

    // GUARD
    if (!buttons.length) return;

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const body = button.nextElementSibling;
            if (!body) return;

            body.style.display = body.style.display === "block" ? "none" : "block";
        });
    });
}

/* ===============================
   MEMBER SHARE BUTTON
================================ */

function initMemberShare() {

    const buttons = document.querySelectorAll(".share-btn");
    const cards = document.querySelectorAll(".member-card");

    // GUARD
    if (!buttons.length || !cards.length) return;

    buttons.forEach(button => {
        button.addEventListener("click", function (e) {
            e.stopPropagation();

            const card = this.closest(".member-card");
            if (!card) return;

            // Close others
            cards.forEach(c => {
                if (c !== card) c.classList.remove("show-socials");
            });

            // Toggle current
            card.classList.toggle("show-socials");
        });
    });

    // Close on outside click
    document.addEventListener("click", () => {
        cards.forEach(card => {
            card.classList.remove("show-socials");
        });
    });
}

/* ===============================
   CARD → DETAIL TOGGLE at a glance
================================ */

function initCards() {

    const cards = document.querySelectorAll(".card");
    const details = document.querySelectorAll(".detail");

    // GUARD
    if (!cards.length || !details.length) return;

    cards.forEach(card => {
        card.addEventListener("click", () => {

            cards.forEach(c => c.classList.remove("active"));
            details.forEach(d => d.classList.remove("active"));

            card.classList.add("active");

            const target = document.getElementById(card.dataset.target);
            if (target) target.classList.add("active");
        });
    });
}
function initSimpleAccordionDisplay() {

    const buttons = document.querySelectorAll(".accordion-header");

    // GUARD
    if (!buttons.length) return;

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const body = button.nextElementSibling;
            if (!body) return;

            body.style.display =
                body.style.display === "block" ? "none" : "block";
        });
    });
}
