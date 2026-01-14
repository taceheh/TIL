# [Vanilla JS] 03. 고양이 사진 검색기 (Async/Await)

> **과제 목표:**
> `fetch` API와 `async/await` 문법을 사용하여 실제 서버(The Cat API)에서 데이터를 받아온다.
> 데이터를 기다리는 동안 '로딩 중' 상태를 보여주고, 성공 시 이미지를, 실패 시 에러 메시지를 처리한다.

<br>

## 📋 Requirements (요구사항)

1. **API 호출**: '고양이 보기' 버튼을 클릭하면 The Cat API(`https://api.thecatapi.com/v1/images/search`)에 GET 요청을 보낸다.
2. **데이터 렌더링**: 받아온 데이터(JSON)에서 이미지 URL을 추출하여 화면의 `<img>` 태그에 띄운다.
3. **로딩 상태 처리**: 데이터를 받아오는 도중에는 버튼을 비활성화하고, 화면에 "로딩 중..." 텍스트를 보여준다.
4. **에러 핸들링**: 네트워크 문제 등으로 요청이 실패했을 경우, `try...catch`를 사용하여 콘솔에 에러를 출력하고 사용자에게 `alert`로 알린다.

<br>

## 📚 Key Concepts (관련 개념)

- **HTTP 통신**: Request(요청)와 Response(응답).
- **비동기 처리**: `async` 함수 정의와 `await` 키워드.
- **Fetch API**: `fetch(url).then(res => res.json())` 패턴.
- **에러 처리**: `try { ... } catch (error) { ... }`.
- **UI 상태 관리**: Loading / Success / Error 상태에 따른 UI 변화.

<br>

## 💻 Code Snippets (기본 구조)

### HTML (`index.html`)

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <title>Cat Photo Search</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <div class="container">
      <h2>🐱 Random Cat Generator</h2>

      <div class="image-container">
        <div id="loading" class="hidden">⏳ 로딩 중...</div>
        <img id="cat-image" src="" alt="고양이 사진" class="hidden" />
      </div>

      <button id="fetch-btn">고양이 보기</button>
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
  background-color: #f0f0f0;
  margin: 0;
}
.container {
  text-align: center;
  background: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  width: 350px;
}

.image-container {
  width: 100%;
  height: 300px;
  background-color: #eee;
  border-radius: 8px;
  margin-bottom: 20px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.hidden {
  display: none;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #6200ea;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.2s;
}
button:hover {
  background-color: #3700b3;
}
button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
```

### Javascript (구현 내용)

```javascript
// app.js

const fetchBtn = document.querySelector('#fetch-btn');
const catImage = document.querySelector('#cat-image');
const loading = document.querySelector('#loading');
const API_URL =
  '[https://api.thecatapi.com/v1/images/search](https://api.thecatapi.com/v1/images/search)';

// [핵심] 비동기 함수 정의
const fetchCat = async () => {
  try {
    // 1. 로딩 상태 시작 (버튼 비활성화, 로딩 텍스트 보이기, 기존 이미지 숨기기)
    // 2. API 호출 (await fetch...)
    // const response = ...
    // 3. 응답 데이터를 JSON으로 변환 (await response.json())
    // const data = ...
    // console.log(data) <-- 꼭 찍어서 구조 확인해보기! (배열인지 객체인지)
    // 4. 데이터에서 이미지 URL 꺼내기
    // 5. 이미지 태그에 src 할당 및 로딩 끝내기 (이미지 보이기)
  } catch (error) {
    // 6. 에러 발생 시 처리 (console.error, alert)
    console.error('Error fetching cat:', error);
    alert('고양이를 불러오는데 실패했어요! 😿');
  } finally {
    // 7. (선택) 로딩 종료 로직을 여기서 공통 처리해도 됨
    // 버튼 다시 활성화
  }
};

fetchBtn.addEventListener('click', fetchCat);
```

## 🤔 Retrospective (회고)

### 1. 배운 점 (What I Learned)

- **이벤트 위임 (Event Delegation)**: `li`마다 이벤트를 거는 게 아니라, 부모인 `ul`에 하나만 걸어서 성능과 코드 효율을 높이는 패턴을 익혔다.
- **DOM 탐색 (`closest`)**: `e.target`은 내가 클릭한 '텍스트'나 '자식 태그'일 수 있다. 따라서 `.closest('.tab-item')`을 사용하여 클릭된 요소의 **진짜 주인(li 태그)**을 안전하게 찾아야 함을 배웠다.
- **데이터 속성 (`dataset`)**: HTML에 `data-tab="name"` 처럼 사용자 정의 값을 숨겨두고, JS에서 `element.dataset.tab`으로 꺼내 쓰는 표준 방법을 익혔다.
- **상태 초기화 패턴 (Reset Pattern)**: 켜져 있는 탭을 일일이 찾아서 끄는 것보다, **"일단 전부 끄고(forEach remove), 내가 누른 것만 켜는(add)"** 방식이 버그 예방에 훨씬 효과적이라는 것을 알았다.

### 2. 어려웠던 점 / 해결 방법 (Troubleshooting)

#### 1) 변수명 불일치로 인한 참조 에러

- **문제**: 코드를 실행했는데 작동하지 않고 콘솔에 `Uncaught ReferenceError: tabItems is not defined`가 떴다.
- **원인**: 위에서 선언한 변수명은 `tabs`인데, 아래 로직에서는 없는 변수인 `tabItems`를 사용했다. (복사/붙여넣기 과정에서의 실수)
- **해결**: 선언부와 사용부의 변수 이름을 `tabs`, `contents`로 통일하여 해결했다.

#### 2) `closest` 메서드의 필요성 의문

- **문제**: "어차피 `li` 안의 텍스트를 누른 건데, 굳이 `closest`로 부모를 찾아야 하나?"라는 의문이 들었다.
- **해결**:
  - 나중에 `li` 안에 `span`이나 `img` 같은 태그가 추가되면, `e.target`이 `li`가 아니게 된다(dataset 등 속성을 못 가져옴).
  - 유지보수와 방어적 코딩을 위해 **"눌린 곳에서부터 거슬러 올라가 확실한 제어권자(li)를 잡는 것"**이 `closest`의 역할임을 이해했다.

#### 3) 초기화 로직의 비효율성 고민

- **문제**: "다 끄지 말고 켜져 있는 것만 끄면 안 되나?"라고 생각했다.
- **해결**: 상태(State)를 추적하는 것보다, **백지화(Reset) 후 설정(Set)**하는 것이 로직이 훨씬 단순하고 꼬일 위험이 적다는 UI 개발의 패턴을 배웠다.
