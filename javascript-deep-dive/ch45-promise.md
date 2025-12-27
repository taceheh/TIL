# [JS] 45장. 프로미스 (Promise)

## 1. 프로미스란? (Definition)

> "자바스크립트 비동기 처리에 사용되는 객체(Object)로, 비동기 작업의 **진행 상태(State)** 와 **결과 값(Result)** 을 관리하는 표준 빌트인 객체"

- **핵심 키워드**: 콜백 지옥(Callback Hell), Pending/Fulfilled/Rejected, Settled, 마이크로태스크 큐(Microtask Queue)
- **한 줄 요약**: 기존 콜백 패턴의 치명적 단점(가독성 저하, 에러 처리 곤란) 해결을 위해 ES6에의 도입이며, 비동기 작업의 결과를 미래의 어떤 시점에 유효한 값으로의 취급 가능 실현.

<br>

## 2. 핵심 전제 지식 (Prerequisites)

프로미스의 탄생 이유(Why) 이해의 필수성.

### 2.1 콜백 패턴의 한계 (Callback Hell)

비동기 함수의 결과값을 활용한 또 다른 비동기 작업 수행 시, 콜백 함수 내부에서의 또 다른 콜백 함수 호출 필요.

```javascript
// 가독성이 나쁘고, 에러 처리가 분산되어 유지보수 어려움
get('/step1', a => {
  get(`/step2/${a}`, b => {
    get(`/step3/${b}`, c => {
      console.log(c);
    });
  });
});
```

### 2.2 에러 처리의 곤란함

try...catch 문은 동기적 에러의 포착만 가능. setTimeout 같은 비동기 함수 내에서의 에러 발생 시 호출자(Caller) 방향으로의 전파 부재로 인한 catch 블록의 포착 불가 문제 존재.

<br>

## 3. 동작 원리 (Mechanism)

### 3.1 프로미스의 상태 (State)

프로미스 객체의 생성 순간부터 반드시 아래 3가지 상태 중 하나의 보유.

- **Pending (대기)**: 비동기 처리의 아직 미수행된 초기 상태.
- **Fulfilled (이행)**: 비동기 처리의 성공적 완료 상태. (resolve 함수 호출 시)
- **Rejected (거부)**: 비동기 처리의 실패 상태. (reject 함수 호출 시)

**참고**: 성공이든 실패든 일단 Pending이 아니게 된 상태를 Settled(판정됨) 상태로의 칭함.

### 3.2 후속 처리 메서드 (then, catch, finally)

모든 후속 처리 메서드는 프로미스 반환이며, 비동기로의 동작 수행.

- **.then(성공시, 실패시)**: 두 개의 콜백 수용이지만, 보통 성공 케이스만의 취급.
- **.catch(실패시)**: 에러 처리의 담당. `.then(undefined, 실패시)`와의 동일성이지만 가독성이 훨씬 우수.
- **.finally()**: 성공/실패 여부와 상관없이 무조건 한 번의 실행.

### 3.3 마이크로태스크 큐 (Microtask Queue) 

프로미스의 후속 처리 메서드(then/catch/finally)의 콜백 함수는 일반적 태스크 큐가 아닌 마이크로태스크 큐에의 저장.

- **우선순위**: 마이크로태스크 큐 > 태스크 큐 (setTimeout 등)
- **의의**: setTimeout보다 프로미스의 더 빠른 실행.

<br>

## 4. 활용 사례 (Use Cases)

### 4.1 프로미스 체이닝 (Promise Chaining)

콜백 지옥의 해결과 비동기 작업을 순차적으로의 연결. .then에서의 값 반환 시, 다음 .then이 그 값의 수용.

💾 [예제 코드 실행해보기](./examples/45-01-promise-chaining.js)

### 4.2 프로미스 정적 메서드 (Promise.all) 

여러 개의 비동기 처리를 **병렬(Parallel)** 로의 수행 시 활용. 실무에서의 성능 최적화를 위한 매우 중요한 메서드.

💾 [예제 코드 실행해보기](./examples/45-02-promise-all.js)

**특징**:
- 3개의 요청을 동시에 송신.
- 가장 늦게 종료되는 3초 뒤에 결과의 한꺼번에 도출.
- 하나라도 실패 시 즉시 에러(catch)로의 이동.
- 순서 보장됨.

<br>

## 5. 자주 발생하는 실수 (Common Mistakes)

### 5.1 프로미스 지옥 (Promise Hell)

프로미스 활용 중에도 콜백 지옥처럼의 작성 경우.

```javascript
// ❌ 나쁜 예: then 안에 then을 중첩
fetch('/url')
  .then(res => {
    res.json().then(data => {
      console.log(data);
    });
  });

// ⭕ 좋은 예: 평평하게의 펼침 (Flat)
fetch('/url')
  .then(res => res.json())
  .then(data => console.log(data));
```

### 5.2 에러 처리 위치

.then의 두 번째 인자로의 에러 처리 시, 첫 번째 인자(성공 콜백)에서의 발생 에러를 포착 불가.

**권장**: 에러 처리는 항상 마지막에의 **.catch** 활용.

<br>

## 6. 헷갈렸던 부분 & 심화 (Confusing Points)

### 6.1 Promise 생성자 내부의 동작 시점

- **Q**: `new Promise((resolve, reject) => { ... })`의 실행 시점?
- **A**: new Promise의 생성 순간, 내부에 전달된 함수(Executor)는 즉시 실행. 비동기 처리의 시작은 then 호출 시점이 아닌 new Promise 생성 순간.

### 6.2 Promise.all vs Promise.race

- **Promise.all**: 모든 작업의 성공 필요. (하나라도 실패하면 전체 실패)
- **Promise.race**: 가장 먼저의 종료(성공이든 실패든) 하나만의 취함.
