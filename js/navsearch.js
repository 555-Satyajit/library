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
    const navMenu = document.getElementById('navMenu');
    const navCloseBtn = document.getElementById('navCloseBtn');

    if (hamburgerBtn && navMenu && navCloseBtn) {
        hamburgerBtn.addEventListener('click', () => {
            navMenu.classList.add('active');
        });

        navCloseBtn.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });

        // Close menu only when clicking regular links (not dropdown parents)
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', (e) => {
                // Don't close menu if this is a dropdown parent link
                if (!link.parentElement.classList.contains('has-dropdown') && 
                    !link.parentElement.classList.contains('has-submenu')) {
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
            // Always prevent default for dropdown toggles
            e.preventDefault();
            e.stopPropagation();
            
            if (window.innerWidth <= 768) {
                const parent = this.parentElement;
                
                console.log('Dropdown clicked:', parent); // Debug
                console.log('Has active class:', parent.classList.contains('active')); // Debug
                
                // Close other dropdowns at the same level
                document.querySelectorAll('.navbar > ul > .has-dropdown').forEach(item => {
                    if (item !== parent) {
                        item.classList.remove('active');
                    }
                });
                
                // Toggle current dropdown
                parent.classList.toggle('active');
                
                console.log('After toggle:', parent.classList.contains('active')); // Debug
            }
        });
    });

    /* =========================
       SUBMENU TOGGLE (MOBILE)
    ========================= */
    document.querySelectorAll('.has-submenu > a').forEach(link => {
        link.addEventListener('click', function (e) {
            // Always prevent default for submenu toggles
            e.preventDefault();
            e.stopPropagation();
            
            if (window.innerWidth <= 768) {
                const parent = this.parentElement;
                
                console.log('Submenu clicked:', parent); // Debug
                
                // Toggle current submenu
                parent.classList.toggle('active');
            }
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && !e.target.closest('.has-dropdown')) {
            document.querySelectorAll('.has-dropdown').forEach(item => {
                item.classList.remove('active');
            });
        }
    });
});