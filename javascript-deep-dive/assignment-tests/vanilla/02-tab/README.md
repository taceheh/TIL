# [Vanilla JS] 02. 탭 메뉴 (Tab Menu) 구현하기

> **과제 목표:**
> 여러 개의 버튼에 각각 이벤트를 다는 것이 아니라, 부모 요소(`ul`)에 이벤트 리스너를 하나만 등록하여(이벤트 위임) 탭 전환 기능을 구현한다.
> HTML의 `data-` 속성을 활용하여 탭 버튼과 보여줄 컨텐츠를 연결한다.

<br>

## 📋 Requirements (요구사항)

1. **탭 전환**: 상단의 탭 버튼(Tab 1, Tab 2, Tab 3)을 클릭하면 해당 탭이 활성화(하이라이트)되어야 한다.
2. **컨텐츠 표시**: 활성화된 탭에 매칭되는 컨텐츠 박스만 보이고, 나머지 컨텐츠는 숨겨져야 한다.
3. **이벤트 위임 필수**: `li` 태그나 `button` 태그마다 `addEventListener`를 붙이지 말고, **부모인 `ul.tab-list`에만 붙여서 구현**해야 한다.
4. **초기 상태**: 페이지 로딩 시 첫 번째 탭과 첫 번째 컨텐츠가 활성화된 상태여야 한다.

<br>

## 📚 Key Concepts (관련 개념)

- **이벤트 위임 (Event Delegation)**: 상위 요소에서 하위 요소의 이벤트를 제어.
- **HTML 데이터 속성 (`data-*`)**: HTML 요소에 커스텀 데이터를 저장하고 JS에서 `dataset`으로 읽어오는 방법.
- **DOM 탐색**: `document.querySelectorAll` (NodeList 순회), `element.classList.add/remove`.

<br>

## 💻 Code Snippets (기본 구조)

> **Ready:** 아래 HTML/CSS 코드를 복사하고 시작하세요.

### HTML (`index.html`)

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <title>Vanilla JS Tabs</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <div class="container">
      <h2>Tab Menu</h2>

      <ul class="tab-list">
        <li class="tab-item active" data-tab="content-1">Tab 1</li>
        <li class="tab-item" data-tab="content-2">Tab 2</li>
        <li class="tab-item" data-tab="content-3">Tab 3</li>
      </ul>

      <div class="tab-content-group">
        <div id="content-1" class="tab-pane active">
          <h3>Content 1</h3>
          <p>첫 번째 탭의 내용입니다. HTML data 속성을 활용해보세요.</p>
        </div>
        <div id="content-2" class="tab-pane">
          <h3>Content 2</h3>
          <p>두 번째 탭의 내용입니다. 이벤트 위임을 사용했나요?</p>
        </div>
        <div id="content-3" class="tab-pane">
          <h3>Content 3</h3>
          <p>세 번째 탭의 내용입니다. active 클래스를 잘 제어해보세요.</p>
        </div>
      </div>
    </div>

    <script src="app.js"></script>
  </body>
</html>
```

### CSS

```css
body {
  font-family: sans-serif;
  display: flex;
  justify-content: center;
  padding-top: 50px;
}
.container {
  width: 500px;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
}
h2 {
  text-align: center;
  margin: 20px 0;
}

/* 탭 리스트 */
.tab-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  background: #f1f1f1;
  border-bottom: 1px solid #ddd;
}
.tab-item {
  flex: 1;
  text-align: center;
  padding: 15px;
  cursor: pointer;
  transition: 0.3s;
}
.tab-item:hover {
  background: #ddd;
}

/* 활성화된 탭 스타일 */
.tab-item.active {
  background: white;
  font-weight: bold;
  border-top: 3px solid orange;
  border-bottom: 1px solid white;
  margin-bottom: -1px;
}

/* 탭 컨텐츠 */
.tab-content-group {
  padding: 20px;
  min-height: 150px;
}
.tab-pane {
  display: none;
  animation: fadeIn 0.3s;
}

/* 활성화된 컨텐츠만 보임 */
.tab-pane.active {
  display: block;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
```

### Javascript (구현 내용)

```javascript
// app.js

// 1. DOM 요소 선택
const tabList = document.querySelector('.tab-list');
const tabs = document.querySelectorAll('.tab-item');
const contents = document.querySelectorAll('.tab-pane');

// 2. 이벤트 위임 (ul에 이벤트 등록)
tabList.addEventListener('click', (e) => {
  // 1) 클릭된 요소가 탭인지 확인 (li.tab-item 인지?)
  // 힌트: e.target.classList.contains(...)
  // 2) 이미 활성화된 탭이라면 무시 (옵션)
  // 3) 모든 탭/컨텐츠에서 'active' 클래스 제거 (초기화)
  // 힌트: tabs.forEach(...) / contents.forEach(...)
  // 4) 클릭된 탭에 'active' 클래스 추가
  // 5) 클릭된 탭의 data-tab 값을 가져와서, 연관된 컨텐츠 찾기
  // 힌트: e.target.dataset.tab
  // 6) 해당 컨텐츠에 'active' 클래스 추가
});
```

## 🤔 Retrospective (회고)

### 1. 배운 점 (What I Learned)

### 2. 어려웠던 점 / 해결 방법 (Troubleshooting)

- 문제 :
- 원인 :
- 해결 :
