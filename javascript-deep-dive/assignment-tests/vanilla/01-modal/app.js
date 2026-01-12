// app.js

// 1. DOM 요소 선택
const modal = document.querySelector('#modal');
const openBtn = document.querySelector('#open-btn');
const closeBtn = document.querySelector('#close-btn');
const toggleBtn = document.querySelector('#toggle-btn');
// ...

// 2. 이벤트 핸들러 구현
const openModal = () => {
  // classList API 활용
  modal.classList.remove('hidden');
};

// ...
const closeModal = () => {
  modal.classList.add('hidden');
};

toggleBtn.addEventListener('click', () => {
  if (modal.classList.contains('hidden')) {
    // 숨겨져 있다면 -> 연다 (openModal 함수 실행)
    openModal();
  } else {
    // 보여지고 있다면 -> 닫는다 (closeModal 함수 실행)
    closeModal();
  }
});
// 3. 이벤트 바인딩
openBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);

// [중요] 배경 클릭 시 닫기 (이벤트 위임/버블링 활용)
modal.addEventListener('click', (e) => {
  // 힌트: e.target이 무엇일 때 닫아야 할까?
  if (e.target === e.currentTarget) {
    modal.classList.add('hidden');
  }
});
