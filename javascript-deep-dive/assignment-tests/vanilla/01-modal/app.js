// app.js

// 1. DOM 요소 선택
const modal = document.querySelector('#modal');
const openBtn = document.querySelector('#open-btn');
// ...

// 2. 이벤트 핸들러 구현
const openModal = () => {
  // classList API 활용
  modal.classList.remove('hidden');
};

// ...

// 3. 이벤트 바인딩
openBtn.addEventListener('click', openModal);

// [중요] 배경 클릭 시 닫기 (이벤트 위임/버블링 활용)
modal.addEventListener('click', (e) => {
  // 힌트: e.target이 무엇일 때 닫아야 할까?
});
