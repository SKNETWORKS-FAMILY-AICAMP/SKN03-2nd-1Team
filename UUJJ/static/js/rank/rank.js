function initializeDrag() {
   const boardArea = document.getElementById("board_area");

   let isDown = false;
   let startX;
   let scrollLeft;
   let clickTimeout;

   boardArea.addEventListener("mousedown", (e) => {
      isDown = true;
      boardArea.classList.add("active");
      startX = e.pageX - boardArea.getBoundingClientRect().left;
      scrollLeft = boardArea.scrollLeft;

      // 타임아웃 설정: 클릭 이벤트와 드래그 이벤트를 구분하기 위해 사용
      clickTimeout = setTimeout(() => {
         clickTimeout = null; // 클릭이 아닌 드래그로 인식
      }, 150); // 150ms: 클릭과 드래그를 구분하는 기준 시간
   });

   boardArea.addEventListener("mouseleave", () => {
      isDown = false;
      boardArea.classList.remove("active");
      clearTimeout(clickTimeout);
   });

   boardArea.addEventListener("mouseup", (e) => {
      isDown = false;
      boardArea.classList.remove("active");

      // 클릭 이벤트와 드래그를 구분
      if (clickTimeout) {
         clearTimeout(clickTimeout);
         // 클릭 처리
         e.preventDefault(); // 클릭이 스크롤로 인식되는 것을 방지
         // 클릭 이벤트 핸들링을 위한 코드 추가 가능
      }
   });

   boardArea.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - boardArea.getBoundingClientRect().left;
      const walk = (x - startX) * 1; // 드래그 속도 조정
      boardArea.scrollLeft = scrollLeft - walk;
   });
}

// 초기 드래그 이벤트 설정
initializeDrag();

function loadContent(category) {
   fetch(`/rank/${category}/`)
      .then((response) => response.text())
      .then((data) => {
         // 콘텐츠를 업데이트
         document.getElementById("middle_section").innerHTML = data;

         // 버튼의 시각적 상태를 업데이트
         document.querySelectorAll("#bt_area .col").forEach(function (content) {
            content.classList.remove("active");
         });

         // 클릭된 버튼에 active 클래스 추가
         const activeButton = document.getElementById(category);
         if (activeButton) {
            activeButton.classList.add("active");
         }

         // 콘텐츠 로드 후 드래그 이벤트를 다시 설정
         initializeDrag();
      })
      .catch((error) => console.error("Error:", error));
}
