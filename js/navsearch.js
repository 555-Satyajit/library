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

document.querySelectorAll('.has-dropdown > a').forEach(link => {
    link.addEventListener('click', function (e) {
        if (window.innerWidth <= 768) {
            e.preventDefault(); // stop page jump
            this.parentElement.classList.toggle('open');
        }
    });
});


hamburger.addEventListener('click', () => {
    navMenu.classList.add('active');
});

navCloseBtn.addEventListener('click', () => {
    navMenu.classList.remove('active');
});

// Dropdown toggle for mobile
const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
        // Only handle on mobile
        if (window.innerWidth <= 768) {
            e.preventDefault();
            const parent = toggle.parentElement;
            const dropdown = parent.querySelector('.dropdown-menu');
            
            // Close other dropdowns
            document.querySelectorAll('.has-dropdown').forEach(item => {
                if (item !== parent) {
                    item.classList.remove('active');
                    item.querySelector('.dropdown-menu').classList.remove('active');
                }
            });
            
            // Toggle current dropdown
            parent.classList.toggle('active');
            dropdown.classList.toggle('active');
        }
    });
});

// Close dropdowns when clicking outside
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && !e.target.closest('.has-dropdown')) {
        document.querySelectorAll('.has-dropdown').forEach(item => {
            item.classList.remove('active');
            item.querySelector('.dropdown-menu').classList.remove('active');
        });
    }
});

});
