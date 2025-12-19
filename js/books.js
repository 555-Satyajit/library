const buttons = document.querySelectorAll('.toggle-btn');
    const tables = document.querySelectorAll('.lang-table');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            tables.forEach(t => t.classList.remove('active'));

            btn.classList.add('active');
            document.getElementById(btn.dataset.lang).classList.add('active');
        });
    });