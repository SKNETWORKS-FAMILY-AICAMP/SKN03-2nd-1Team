const boardArea = document.getElementById("board_area");

let isDown = false;
let startX;
let scrollLeft;

boardArea.addEventListener("mousedown", (e) => {
   isDown = true;
   boardArea.classList.add("active");
   startX = e.pageX - boardArea.offsetLeft;
   scrollLeft = boardArea.scrollLeft;
});

boardArea.addEventListener("mouseleave", () => {
   isDown = false;
   boardArea.classList.remove("active");
});

boardArea.addEventListener("mouseup", () => {
   isDown = false;
   boardArea.classList.remove("active");
});

boardArea.addEventListener("mousemove", (e) => {
   if (!isDown) return;
   e.preventDefault();
   const x = e.pageX - boardArea.offsetLeft;
   const walk = (x - startX) * 1; // 드래그 속도 조정
   boardArea.scrollLeft = scrollLeft - walk;
});

console.log("안녕");
