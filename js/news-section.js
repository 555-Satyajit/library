
document.addEventListener("DOMContentLoaded", () => {
    const slider = document.getElementById("newsSlider");
    const prev = document.querySelector(".news-btn.prev");
    const next = document.querySelector(".news-btn.next");

    const cards = slider.children;
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
});
