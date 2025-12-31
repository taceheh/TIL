# [JS] 46장. 제너레이터와 async/await

## 1. 제너레이터와 async/await란? (Definition)

> "프로미스의 복잡한 후속 처리(.then) 없이, 비동기 코드를 마치 **동기 코드(위에서 아래로)** 처럼 작성할 수 있게 해주는 문법"

- **핵심 키워드**: 제너레이터(Generator), `yield`, `async/await`, 가독성, 에러 핸들링(try...catch)
- **한 줄 요약**: 제너레이터는 함수의 실행을 중간에 멈췄다 재개하는 기능이고, 이를 바탕으로 구현된 async/await는 비동기 처리의 가독성을 혁신적으로의 개선한 **문법적 설탕(Syntactic Sugar)**.

<br>

## 2. 핵심 전제 지식 (Prerequisites)

async/await의 예상치 못한 등장이 아닌 필연적 진화 과정.

### 2.1 제너레이터 (Generator)

**개념**: 코드 블록의 실행을 일시 중지(yield)했다가 필요한 시점에 재개(next) 가능한 특수한 함수. (function* 키워드 활용)

**역할**: 비동기 처리를 동기처럼의 구현 가능성 제시이지만, 코드의 복잡성(Generator Runner 필요)으로 인한 널리 퍼지지 않음 → 이 아이디어의 발전을 통한 async/await 탄생.

### 2.2 프로미스 (Promise)

async/await는 내부적으로의 프로미스 기반 동작. 즉, 프로미스 이해 없이의 async/await만 활용 불가.

<br>

## 3. 동작 원리 (Mechanism)

### 3.1 async 함수

function 앞에의 async 붙임.

**특징**: 이 함수는 언제나 프로미스의 반환. 명시적 값 반환 시에도, 그 값은 암묵적으로의 resolve된 프로미스로의 감싸짐.

### 3.2 await 키워드

- **사용 제약**: 반드시 async 함수 내부에서만의 사용 가능. (최근 모듈 최상위 레벨 await 지원 추가됨)
- **동작**: 프로미스 앞에의 await 붙임 시, 프로미스의 settled(성공/실패) 상태까지의 실행 일시 중지 및 대기.
- **결과**: 프로미스의 resolve 시 그 결과값 반환 및 다음 라인 실행.

💾 [예제 코드 실행해보기](./examples/46-01-async-await-basic.js)

<br>

## 4. 활용 사례 (Use Cases)

### 4.1 에러 처리 (try...catch)

프로미스 체이닝(.then().catch())과 달리, async/await는 전통적 try...catch 문을 통한 에러 포착 가능.

**장점**: 동기 코드와 비동기 코드의 에러를 한 곳에서의 통합 처리 실현.

💾 [예제 코드 실행해보기](./examples/46-02-error-handling.js)

### 4.2 순차 처리 vs 병렬 처리

서로 연관 없는 비동기 작업은 await의 분리 작성 없이 Promise.all과의 함께 활용 필요성. (성능 최적화)

```javascript
// ❌ 비효율: 앞의 것이 끝날 때까지 뒤의 것이 대기 (총 6초)
async function slow() {
  await delay(3000); 
  await delay(3000); 
}

// ⭕ 효율: 두 작업을 동시에 시작하고 다 끝날 때까지 대기 (총 3초)
async function fast() {
  const p1 = delay(3000);
  const p2 = delay(3000);
  await Promise.all([p1, p2]); 
}
```

<br>

## 5. 자주 발생하는 실수 (Common Mistakes)

### 5.1 forEach와 await

이전 챕터에서도 강조했지만 정말 중요. forEach는 비동기 함수의 기다림 없음.

**해결**: for...of 문 활용 또는 Promise.all + map 활용 필요.

### 5.2 async 함수는 프로미스를 반환한다

async 함수 내부에서의 return 1 작성이 변수에 1의 담김을 의미하지 않음.

```javascript
async function foo() { return 1; }

const result = foo(); 
console.log(result); // 1이 아니라 Promise {<fulfilled>: 1} 객체!
// 값의 도출을 위해서는 result.then(val => ...) 또는 await foo() 필요
```

<br>

## 6. 헷갈렸던 부분 (Confusing Points)

### 6.1 제너레이터는 몰라도 되나요?

- **실무 관점**: 네, 몰라도 리액트 개발에 전혀 지장 없음. (Redux-Saga 같은 특정 라이브러리 미활용 시)
- **원리 관점**: async/await가 마법이 아닌, 제너레이터의 '중단과 재개' 메커니즘을 통한 구현이라는 사실만의 이해면 충분.

<br>

