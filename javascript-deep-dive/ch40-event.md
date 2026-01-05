# [JS] 40장. 이벤트 (Event)

## 1. 이벤트란? (Definition)

> "브라우저에서 사용자의 동작(클릭, 키보드 입력 등)이나 상태 변경을 감지하여, 약속된 함수(핸들러)를 실행시키는 메커니즘"

- **핵심 키워드**: `이벤트 핸들러`, `버블링(Bubbling)`, `캡처링(Capturing)`, `이벤트 위임(Delegation)`, `preventDefault`
- **한 줄 요약**: 브라우저와 사용자 간의 대화 가능 실현을 위한 수단이며, 효율적 처리를 위해 이벤트 전파(Propagation) 개념의 반드시 이해 필요.

<br>

## 2. 핵심 전제 지식 (Prerequisites)

### 2.1 이벤트 핸들러 등록 방식

실무에서는 주로 3번째 방식의 활용. (리액트는 내부적으로 합성 이벤트 사용이지만 원리는 동일)

1. **HTML 속성**: `<button onclick="foo()">` (비추천)
2. **프로퍼티 할당**: `btn.onclick = foo;` (하나만의 등록 가능)
3. **addEventListener**: `btn.addEventListener('click', foo);` (여러 개의 등록 가능, 추천)

<br>

## 3. 동작 원리: 이벤트 전파 (Propagation)

이벤트 발생 시 정적 상태 유지가 아닌 DOM 트리를 통한 이동. 면접 최다 빈출 문제.

**1. 캡처링 단계 (Capturing)**: 최상위(window)에서 이벤트 발생 요소(Target)까지의 내려감.

**2. 타겟 단계 (Target)**: 실제 이벤트 발생 요소로의 도달.

**3. 버블링 단계 (Bubbling)**: 다시 최상위(window)까지의 거품처럼 올라감.

**참고**: 대부분의 이벤트는 '버블링' 단계에서의 포착.

<br>

## 4. 활용 사례 (Use Cases)

### 4.1 이벤트 위임 (Event Delegation)

"하위 요소마다 이벤트를 다 걸지 말고, 상위 요소 하나에만 걸어서 처리하자." 리스트 아이템이 100개일 때, 100개의 핸들러 장착은 메모리 낭비.

```javascript
// <ul>에만 이벤트를 걸어도 <li> 클릭을 감지할 수 있음 (버블링 덕분)
document.getElementById('fruits').addEventListener('click', (e) => {
  // 실제 클릭된 요소가 li인지 확인
  if (e.target.matches('#fruits > li')) {
    console.log('과일 클릭됨:', e.target.id);
  }
});
```

### 4.2 기본 동작 중단 (`preventDefault`)

`<a>` 태그 클릭 시에도 페이지 이동의 방지나, `<form>` 전송 시의 새로고침 방지 시 활용.

```javascript
form.addEventListener('submit', (e) => {
  e.preventDefault(); // 새로고침 방지 (SPA 필수)
  // 이후 비동기 전송 로직...
});
```

<br>

## 5. 자주 발생하는 실수 (Common Mistakes)

### 5.1 `e.target` vs `e.currentTarget`

이벤트 위임 활용 시의 혼동 가능성.

- **`e.target`**: 실제 클릭한 그 요소. (자식일 수도 있음)
- **`e.currentTarget`**: 지금 이벤트 리스너가의 달려 있는 요소. (부모, 즉 `this`)

💾 [예제 코드 실행해보기](./examples/40-01-target-vs-currentTarget.js)

### 5.2 이벤트 핸들러 내부의 `this`

`function` 키워드로의 핸들러 생성 시 `this`는 이벤트를 바인딩한 요소(`currentTarget`)를 지칭이지만, 화살표 함수 활용 시에는 상위 스코프의 `this`를 지칭. (리액트에서는 보통 화살표 함수를 통해 클래스 인스턴스 등을 지칭하게 함)

```javascript
// function 키워드: this = 이벤트 바인딩 요소
btn.addEventListener('click', function () {
  console.log(this); // <button>
});

// 화살표 함수: this = 상위 스코프의 this
btn.addEventListener('click', () => {
  console.log(this); // Window 또는 클래스 인스턴스
});
```

<br>

## 6. 헷갈렸던 부분 (Confusing Points)

### 6.1 버블링 단계와 캡처링 단계

- **캡처링**: 위에서 아래로 (리스너 등록 시 3번째 인자를 `true`로 설정 필요)
- **버블링**: 아래에서 위로 (기본값, 대부분의 경우 이것만 사용)

```javascript
// 캡처링 단계에서 감지 (거의 안 씀)
btn.addEventListener('click', handler, true);

// 버블링 단계에서 감지 (일반적)
btn.addEventListener('click', handler, false); // 또는 생략
```

### 6.2 버블링이 안 되는 이벤트

모든 이벤트가 버블링되는 것은 아님. `focus`, `blur`, `load`, `unload`, `scroll`, `resize` 등은 버블링 미지원.

이런 경우 이벤트 위임의 활용이 불가이므로, 각 요소마다의 이벤트 리스너 장착 필요.
