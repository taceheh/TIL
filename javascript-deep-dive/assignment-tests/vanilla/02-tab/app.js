// app.js

// 1. DOM 요소 선택
const tabList = document.querySelector('.tab-list');
const tabItems = document.querySelectorAll('.tab-item');
const tabPanes = document.querySelectorAll('.tab-pane');

// 2. 이벤트 위임 (부모인 ul에만 클릭 이벤트를 건다)
tabList.addEventListener('click', (e) => {
  // [핵심 1] 내가 클릭한 요소가 탭(.tab-item)인지 확인
  // e.target은 텍스트일 수도 있으므로, 가장 가까운 li 태그를 찾는다.
  const clickedTab = e.target.closest('.tab-item');

  // 탭이 아닌 곳(ul의 빈 공간 등)을 클릭했다면 아무것도 안 하고 함수 종료
  if (!clickedTab) return;

  // (옵션) 이미 활성화된 탭을 눌렀다면 굳이 또 실행할 필요 없음
  if (clickedTab.classList.contains('active')) return;

  // 3. [초기화] 모든 탭과 컨텐츠에서 'active' 클래스 제거 ("일단 다 꺼!")
  tabItems.forEach((tab) => tab.classList.remove('active'));
  tabPanes.forEach((pane) => pane.classList.remove('active'));

  // 4. [탭 활성화] 지금 클릭한 탭에만 'active' 추가 ("너만 켜!")
  clickedTab.classList.add('active');

  // 5. [컨텐츠 활성화] 짝꿍 컨텐츠 찾아서 켜기
  // HTML의 data-tab="content-1" 값을 가져옴 -> "content-1"
  const targetId = clickedTab.dataset.tab;

  // 아이디로 요소를 찾아서 active 추가
  const targetContent = document.getElementById(targetId);
  targetContent.classList.add('active');
});
