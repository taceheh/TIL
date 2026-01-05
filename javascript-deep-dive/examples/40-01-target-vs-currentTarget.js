// [JS] 40장. 이벤트 - e.target vs e.currentTarget 비교

// 1. 테스트용 HTML 구조 동적 생성
// 구조: ul(부모) > li(자식) > span(손자)
document.body.innerHTML = `
  <style>
    #parent { padding: 20px; border: 2px solid red; cursor: pointer; background: #eee; }
    .child { margin: 10px; padding: 10px; border: 1px solid blue; background: #fff; }
    span { background-color: yellow; border: 1px dashed orange; }
  </style>

  <ul id="parent">
    <strong>부모 (currentTarget: 핸들러 주인)</strong>
    <li class="child">자식 1</li>
    <li class="child">자식 2 - <span>손자</span> 포함</li>
  </ul>
`;

// 2. 이벤트 위임 설정 (부모 요소에만 이벤트 등록)
const parent = document.getElementById('parent');

parent.addEventListener('click', function (e) {
  console.clear(); // 콘솔 초기화

  // 1) e.target: 실제 클릭한 요소 (이벤트 발생 시점의 최하위 요소)
  console.log('[e.target] 실제 누른 요소:', e.target);
  console.log('   └─ 태그:', e.target.tagName);

  // 2) e.currentTarget: 이벤트 핸들러가 부착된 요소 (this와 동일)
  console.log('[e.currentTarget] 핸들러 부착 요소:', e.currentTarget);
  console.log('   └─ 태그:', e.currentTarget.tagName);

  console.log('--------------------------------------------------');

  // 3) 비교 결과
  if (e.target === e.currentTarget) {
    console.log('결과: 부모 요소 직접 클릭');
  } else {
    console.log('결과: 자식/손자 요소 클릭 (버블링으로 부모가 감지)');
  }
});
