const searchToggle = document.querySelector('.search-toggle');
    const topRight = document.querySelector('.top-right');
    const closeBtn = document.querySelector('.search-close');

    searchToggle.addEventListener('click', function (e) {
        e.preventDefault();
        topRight.classList.add('search-open');
        document.querySelector('.search-wrapper input').focus();
    });

    closeBtn.addEventListener('click', function () {
        topRight.classList.remove('search-open');
    });