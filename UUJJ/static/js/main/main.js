const cardText = document.getElementById("card-text");

// 수목원
const Arboretum_hover = document.getElementById("Arboretum");

Arboretum_hover.addEventListener("mouseover", () => {
   cardText.textContent = "수목원";
});

Arboretum_hover.addEventListener("mouseleave", () => {
   cardText.textContent = "나의 유유자적 하고픈 장소는?";
});

// 미술관
const gallery_hover = document.getElementById("gallery");

gallery_hover.addEventListener("mouseover", () => {
   cardText.textContent = "미술관";
});

gallery_hover.addEventListener("mouseleave", () => {
   cardText.textContent = "나의 유유자적 하고픈 장소는?";
});

// 온천
const spa_hover = document.getElementById("spa");

spa_hover.addEventListener("mouseover", () => {
   cardText.textContent = "온천";
});

spa_hover.addEventListener("mouseleave", () => {
   cardText.textContent = "나의 유유자적 하고픈 장소는?";
});

// 찜질방
const sauna_hover = document.getElementById("sauna");

sauna_hover.addEventListener("mouseover", () => {
   cardText.textContent = "찜질방";
});

sauna_hover.addEventListener("mouseleave", () => {
   cardText.textContent = "나의 유유자적 하고픈 장소는?";
});
