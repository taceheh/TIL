# 📚 TIL (Today I Learned)

> **"매일 꾸준히 성장하는 프론트엔드 개발자"**
> 공부한 내용을 정리하고 기록합니다.

<br/>

## 📂 Study Categories

<details open>
<summary>
  <h3 style="display:inline-block">🟡 Modern JavaScript Deep Dive</h3>
</summary>

|   날짜   | 챕터 | 주제                                             | 키워드                                                                 |                              링크                               |
| :------: | :--: | :----------------------------------------------- | :--------------------------------------------------------------------- | :-------------------------------------------------------------: |
|    -     | 04장 | **변수란 무엇인가**                              | `메모리 주소` `식별자`                                                 |                            작성 예정                            |
|    -     | 09장 | 타입 변환과 단축 평가                            | `암묵적 타입 변환`                                                     |                            작성 예정                            |
| 25.12.22 | 19장 | **프로토타입 (Prototype)**                       | `프로토타입 체인` `상속`                                               |        [이동](./javascript-deep-dive/ch19-prototype.md)         |
| 25.12.18 | 22장 | **this**                                         | `동적 바인딩` `함수 호출 방식`                                         |           [이동](./javascript-deep-dive/ch22-this.md)           |
| 25.12.17 | 23장 | **실행 컨텍스트 (Execution Context)**            | `렉시컬 환경` `실행 컨텍스트 스택`                                     |    [이동](./javascript-deep-dive/ch23-execution-context.md)     |
| 25.12.16 | 24장 | **클로저(Closure)**                              | `렉시컬 스코프`                                                        |         [이동](./javascript-deep-dive/ch24-closure.md)          |
| 25.12.23 | 25장 | **클래스 (Class)**                               | `syntactic sugar` `extends`                                            |          [이동](./javascript-deep-dive/ch25-class.md)           |
| 25.12.24 | 27장 | **배열 (Array)**                                 | `고차 함수` `불변성` `희소 배열` `map/filter/reduce`                   |          [이동](./javascript-deep-dive/ch27-array.md)           |
| 26.01.01 | 35장 | **스프레드 문법 (Spread Syntax)**                | `얕은 복사` `객체 리터럴 확장` `Rest 파라미터 비교`                    |          [이동](./javascript-deep-dive/ch35-spread.md)          |
| 26.01.02 | 36장 | **디스트럭처링 할당 (Destructuring Assignment)** | `React Hooks 패턴` `Props 추출` `변수 이름 변경(Aliasing)`             | [이동](./javascript-deep-dive/ch36-destructuring-assignment.md) |
| 26.01.05 | 40장 | **이벤트 (Event)**                               | `이벤트 버블링/캡처링` `이벤트 위임(Delegation)`                       |          [이동](./javascript-deep-dive/ch40-event.md)           |
| 25.12.25 | 42장 | **비동기 프로그래밍**                            | `이벤트 루프` `태스크 큐`                                              |       [이동](./javascript-deep-dive/ch42-asynchronous.md)       |
| 25.12.28 | 45장 | **프로미스 (Promise)**                           | `콜백 지옥` `프로미스 체이닝` `Promise.all`                            |         [이동](./javascript-deep-dive/ch45-promise.md)          |
| 25.12.31 | 46장 | **async/await**                                  | `제너레이터(Generator)` `async/await` `에러 핸들링(try...catch)`       |       [이동](./javascript-deep-dive/ch46-async-await.md)        |
| 25.01.06 | 48장 | **모듈(Module)**                                 | `ESM(ES6 Module)` `파일 스코프(File Scope)` `export vs export default` |          [이동](./javascript-deep-dive/ch48-module.md)          |

</details>

<br/>

<details>
<summary>
  <h3 style="display:inline-block">🎨 Design Patterns</h3>
</summary>

| 날짜 | 패턴명        | 설명                          | 구현 언어 |                     링크                      |
| :--: | :------------ | :---------------------------- | :-------: | :-------------------------------------------: |
|  -   | **Singleton** | 인스턴스를 하나만 생성        |    TS     | [이동](./design-patterns/singleton/README.md) |
|  -   | Factory       | 객체 생성을 서브클래스에 위임 |    TS     |                   작성 예정                   |

</details>
<br/>

<details open>
  <summary>
    <h3 style="display:inline-block">🚀 Assignment Tests (Vanilla JS & React)</h3>
  </summary>

> **Goal:** AI 도움 없이 공식 문서만으로 구현하기 (Time Limit: 3h)

| 날짜 |   구분   | 과제 주제 (Mini Project)          | 핵심 기술 (Keywords)                         |                      링크                      |
| :--: | :------: | :-------------------------------- | :------------------------------------------- | :--------------------------------------------: |
|  -   | Vanilla  | **모달 (Modal) & 토글**           | `DOM API` `classList` `Event Bubbling`       | [이동](./assignment-tests/vanilla/01-modal.md) |
|  -   | Vanilla  | **탭 메뉴 (Tab Menu)**            | `Event Delegation` `data-attribute`          |                   작성 예정                    |
|  -   | Vanilla  | **고양이 사진 검색기**            | `fetch` `async/await` `Error Handling`       |                   작성 예정                    |
|  -   | Vanilla  | **투두 리스트 (CRUD)**            | `localStorage` `JSON` `DOM Manipulation`     |                   작성 예정                    |
|  -   | Vanilla  | **무한 스크롤 (Infinite Scroll)** | `IntersectionObserver` `Throttle`            |                   작성 예정                    |
|  -   | Vanilla  | **장바구니 (Shopping Cart)**      | `Event Delegation` `State Management`        |                   작성 예정                    |
|  -   | React JS | **실시간 검색 (Debounce)**        | `useEffect` `Clean-up` `setTimeout`          |                   작성 예정                    |
|  -   | React JS | **페이지네이션 (Pagination)**     | `Array.from` `slice` `Query String`          |                   작성 예정                    |
|  -   | React JS | **이미지 슬라이더 (Carousel)**    | `useRef` `CSS Transform` `setInterval`       |                   작성 예정                    |
|  -   | React JS | **드롭다운 (Dropdown)**           | `Keyboard Accessiblity` `Focus Management`   |                   작성 예정                    |
|  -   | React JS | **다크모드 (Theme Mode)**         | `Context API` `Provider` `localStorage`      |                   작성 예정                    |
|  -   | React JS | **유튜브 리스트 (Mock)**          | `Props Drilling` `Modal Portal`              |                   작성 예정                    |
|  -   | React JS | **커스텀 훅 (Custom Hooks)**      | `useFetch` `useInput` `Abstraction`          |                   작성 예정                    |
|  -   | React JS | **성능 최적화 (Optimization)**    | `React.memo` `useMemo` `useCallback`         |                   작성 예정                    |
|  -   | React JS | **에러 처리 (Error Boundary)**    | `ErrorBoundary` `try-catch` `Fallback UI`    |                   작성 예정                    |
|  -   | React JS | **쇼핑몰 SPA (Final)**            | `React Router` `Global State` `Architecture` |                   작성 예정                    |

</details>
<br/>

---

_Last Updated: 2025.12.12_
