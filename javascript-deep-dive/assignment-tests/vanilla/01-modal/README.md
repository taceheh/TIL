# [Vanilla JS] 01. 모달(Modal) 창 구현하기

> **과제 목표:** > 리액트 없이 순수 자바스크립트로 DOM 요소를 선택하고, 클래스를 조작하여 UI 상태(보임/숨김)를 제어한다.
> 특히 이벤트 버블링을 이해하여 모달 외부(Dimmed) 영역 클릭 시 닫기 기능을 구현한다.

<br>

## 📋 Requirements (요구사항)

1. **모달 열기**: '모달 열기' 버튼을 클릭하면 모달 창이 나타나야 한다.
2. **모달 닫기 (버튼)**: 모달 창 내부의 'X (닫기)' 버튼을 클릭하면 모달이 사라져야 한다.
3. **모달 닫기 (배경)**: 모달 컨텐츠 외부의 검은색 배경(Dimmed 영역)을 클릭하면 모달이 닫혀야 한다.
   - _주의: 모달 내부 컨텐츠(흰색 박스)를 클릭했을 때는 닫히면 안 됨!_
4. **토글 기능**: 별도의 '토글' 버튼을 만들어, 클릭할 때마다 열림/닫힘 상태가 번갈아 작동하도록 한다.

<br>

## 📚 Key Concepts (관련 개념)

- **DOM 선택**: `document.querySelector`, `document.getElementById`
- **클래스 제어**: `element.classList.add()`, `.remove()`, `.contains()`, `.toggle()`
- **이벤트 핸들링**: `click` 이벤트, `addEventListener`
- **이벤트 전파**: `Event Bubbling`, `e.target` vs `e.currentTarget` (40장 참고)

<br>

## 💻 Code Snippets (기본 구조)

> **Ready:** 아래 HTML/CSS 코드를 `index.html`에 복사하고 시작하세요.

### HTML

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <title>Vanilla JS Modal</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <div class="btn-group">
      <button id="open-btn">모달 열기</button>
      <button id="toggle-btn">상태 토글</button>
    </div>

    <div id="modal" class="modal-overlay hidden">
      <div class="modal-content">
        <div class="modal-header">
          <h3>안녕하세요!</h3>
          <button id="close-btn">X</button>
        </div>
        <div class="modal-body">
          <p>순수 자바스크립트로 만든 모달입니다.</p>
          <p>외부 배경을 클릭해도 닫힙니다.</p>
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
  align-items: center;
  height: 100vh;
  margin: 0;
}

.btn-group button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  margin: 5px;
}

/* 모달 배경 (Dimmed) */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 유틸리티 클래스: 숨김 처리 */
.hidden {
  display: none;
}

/* 모달 컨텐츠 */
.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  animation: slideDown 0.3s ease-out;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}
#close-btn {
  cursor: pointer;
  border: none;
  background: none;
  font-weight: bold;
  font-size: 18px;
}

@keyframes slideDown {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
```

### Javascript (구현 내용)

```javascript
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
```

## 🤔 Retrospective (회고)

### 1. 배운 점 (What I Learned)

- `classList.toggle('hidden')` 메서드를 사용하면 복잡한 if문 없이도 클래스 추가/제거를 한 줄로 처리할 수 있다.
- 이벤트 핸들러(`addEventListener`) 내부에서는 또 다른 이벤트를 **등록**하는 것이 아니라, 실제 로직(함수)을 **실행**해야 한다는 흐름을 배웠다.
- `e.target`과 `e.currentTarget`의 비교를 통해, 이벤트 버블링 상황에서 부모 요소만 정확히 클릭했는지 판별하는 방법을 익혔다.

### 2. 어려웠던 점 / 해결 방법 (Troubleshooting)

#### 1) 토글 버튼이 동작하지 않음

- **문제**: 토글 버튼을 눌러도 모달이 열리거나 닫히지 않고 아무 반응이 없었다.
- **원인**: 클릭 이벤트 핸들러 안에서 `modal.classList`를 조작하는 것이 아니라, 엉뚱하게 `openBtn.addEventListener`를 또다시 정의(등록)하고 있었다. (버튼을 누를 때마다 이벤트 리스너만 계속 쌓이는 상황)
- **해결**: 이벤트 등록 코드를 지우고, `modal.classList.toggle('hidden')`을 사용하여 즉시 클래스가 변경되도록 수정했다.

#### 2) 배경 클릭 시 닫기 조건문 혼동

- **문제**: `if (e.target === e.currentTarget)` 조건이 "모달을 누른 것이니 닫히면 안 된다"라고 잘못 생각하여 로직을 반대로 짤 뻔했다.
- **원인**: `e.currentTarget`이 '이벤트가 걸린 주인(검은 배경)'이라는 점을 명확히 인지하지 못했다.
- **해결**:
  - `e.target`: 내가 실제 누른 곳 (배경일 수도, 흰 박스일 수도 있음)
  - `e.currentTarget`: 이벤트 리스너가 달린 곳 (무조건 검은 배경)
  - 즉, **둘이 같다는 것은 자식(흰 박스)이 아니라 부모(배경)를 직접 눌렀다는 뜻**이므로 닫아야 한다는 것을 이해했다.
