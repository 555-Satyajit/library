document.addEventListener("DOMContentLoaded", function () {

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
const navMenu      = document.getElementById('navMenu');
const navCloseBtn  = document.getElementById('navCloseBtn');

hamburgerBtn.addEventListener('click', () => {
    navMenu.classList.add('active');
});

navCloseBtn.addEventListener('click', () => {
    navMenu.classList.remove('active');
});

navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

});
