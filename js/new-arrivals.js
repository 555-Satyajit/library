
const slider = document.getElementById("booksSlider");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");

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

