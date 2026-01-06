# [JS] 48장. 모듈 (Module)

## 1. 모듈이란? (Definition)

> "애플리케이션을 구성하는 개별적 요소로서, **자신만의 파일 스코프(File Scope)** 를 가지는 재사용 가능한 코드 조각"

- **핵심 키워드**: `ESM(ES6 Module)`, `파일 스코프`, `export`, `import`, `모듈 번들러(Webpack/Vite)`
- **한 줄 요약**: 파일마다 독립적인 방(스코프)의 생성을 통한 변수 이름 충돌의 방지 및 필요한 것만의 내보냄(`export`)과 가져다 쓰기(`import`)를 위한 자바스크립트 표준 시스템.

<br>

## 2. 핵심 전제 지식 (Prerequisites)

모듈의 표준화 이유 역사의 이해를 통한 쉬운 학습 가능.

### 2.1 기존 자바스크립트의 문제점 (전역 오염)

과거에는 `<script>` 태그로의 여러 JS 파일 불러오기 시에도, 결국 **하나의 전역 스코프(window)** 공유 발생.

```javascript
// a.js
var x = 'A';

// b.js
var x = 'B'; // a.js의 x를 덮어씌워버림 (문제 발생)
```

### 2.2 CommonJS vs ESM

- **CommonJS**: Node.js 환경에서의 채택 모듈 시스템. `require`, `module.exports` 활용.
- **ESM (ES6 Module)**: 브라우저와 자바스크립트 언어 자체의 표준 모듈 시스템. `import`, `export` 활용. (현재 학습 대상)

<br>

## 3. 동작 원리 (Mechanism)

### 3.1 파일 스코프 (Module Scope)

ESM 사용 시 파일 하나가 곧 하나의 스코프로의 작용.

- 모듈 내에서의 `var x = 1` 선언이 전역 변수 `window.x`로의 변환 미발생.
- 따라서 다른 파일에서의 동일 변수명 사용 시에도 충돌 미발생.

### 3.2 Strict Mode 적용

ESM은 암묵적으로의 **Strict Mode(`'use strict'`)** 적용.

<br>

## 4. 활용 사례: 문법 (Use Cases)

리액트에서의 파일 분할 시 매일 활용되는 문법.

### 4.1 내보내기 (`export`)

외부에서의 사용 가능을 위한 공개.

**1. Named Export (이름 지정)**: 여러 개의 내보냄 시 활용.

```javascript
// utils.js
export const PI = 3.14;
export function add(a, b) {
  return a + b;
}
```

**2. Default Export (기본)**: 모듈당 딱 하나만의 내보냄 시 활용. (주로 리액트 컴포넌트)

```javascript
// Header.js
export default function Header() { ... }
```

### 4.2 가져오기 (`import`)

외부 모듈의 기능으로의 가져옴.

**1. Named Import**: 이름을 **중괄호 `{}`** 로의 감싸짐을 통한 가져옴. (이름 변경 불가, `as` 필요)

```javascript
import { PI, add } from './utils.js';
```

**2. Default Import**: 중괄호 없이의 가져옴. (이름 내 마음대로의 작성 가능)

```javascript
import MyHeader from './Header.js'; // Header라고 안 해도 됨
```

<br>

## 5. 자주 발생하는 실수 (Common Mistakes)

### 5.1 브라우저에서 직접 테스트 시

HTML에서의 모듈 로드를 위해서는 `type="module"`의 반드시 붙임 필수.

```html
<script type="module" src="app.js"></script>
```

**주의**: `file://` 프로토콜(그냥 HTML 파일 더블클릭)에서는 보안상 동작 불가 가능성. Live Server 등의 활용 필요.

### 5.2 중괄호(`{}`) 여부 혼동

- **`export default`** → **`import A`** (중괄호 없음)
- **`export const`** → **`import { A }`** (중괄호 있음)

**참고**: 이거 헷갈리면 리액트에서 "export 'default' (imported as '...') was not found" 에러 발생.

<br>

## 6. 헷갈렸던 부분 (Confusing Points)

### 6.1 Named Export vs Default Export의 선택

- **Default Export 추천 경우**: 모듈이 하나의 메인 기능만 제공. (예: 리액트 컴포넌트 파일)
- **Named Export 추천 경우**: 모듈이 여러 유틸 함수 제공. (예: utils.js, helpers.js)

### 6.2 import 문의 파일 확장자

ESM에서는 `.js` 확장자의 생략 불가. 반드시 전체 파일명 작성 필요.

```javascript
// ❌ 틀림
import { add } from './utils';

// ✅ 맞음
import { add } from './utils.js';
```

### 6.3 모듈 번들러와의 관계

실무에서는 Webpack, Vite 같은 모듈 번들러를 통해 여러 모듈의 최적화 및 하나의 파일로의 묶임. 하지만 원리는 ESM의 `import`/`export`와 동일.
