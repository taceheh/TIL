# [JS] 35장. 스프레드 문법 (Spread Syntax)

## 1. 스프레드 문법이란? (Definition)

> "하나로 뭉쳐 있는 여러 값들의 집합(배열, 문자열 등)을 펼쳐서(Spread) 개별적인 값들의 목록으로 만드는 문법"

- **핵심 키워드**: `... (점 세 개)`, `이터러블(Iterable)`, `불변성(Immutability)`, `얕은 복사(Shallow Copy)`
- **한 줄 요약**: 뭉쳐있는 데이터를 **'해체'** 해서 낱개로의 분산 제공을 위한 문법으로, 주로 배열이나 객체의 복사나 병합 시의 활용.

<br>

## 2. 핵심 전제 지식 (Prerequisites)

### 2.1 이터러블 (Iterable)

스프레드 문법의 대상은 순회 가능한 데이터, 즉 이터러블의 필요성.

**가능**: `Array`, `String`, `Map`, `Set`, `DOM 컬렉션`, `arguments`

**불가능**: 일반 객체(Object)는 원래 이터러블이 아니지만, 스프레드 프로퍼티 제안(ES2018) 덕분에 객체에서도의 사용 가능화. (실무에서 가장 많이 활용되는 기능!)

<br>

## 3. 동작 원리 및 사용처 (Mechanism)

`...`의 붙임으로 껍데기가의 벗겨짐 및 내용물의 흐름.

### 3.1 함수 호출 시 인자로의 사용

배열의 풀림을 통한 개별 인자 전달.

```javascript
const arr = [1, 2, 3];

// 기존 방식 (apply 사용 - 복잡함)
Math.max.apply(null, arr); 

// 스프레드 문법 (간결함)
Math.max(...arr); // -> Math.max(1, 2, 3)과 동일
```

### 3.2 배열 리터럴 내부

배열의 병합이나 복사 시 `concat`, `splice` 대신의 활용.

```javascript
const arr1 = [1, 2];
const arr2 = [3, 4];

// 배열 병합
const result = [...arr1, ...arr2]; // [1, 2, 3, 4]
```

### 3.3 객체 리터럴 내부 (ES2018) 

객체의 복사나 프로퍼티 업데이트 시의 사용.

```javascript
const obj = { x: 1, y: 2 };
const copy = { ...obj, z: 3 }; // { x: 1, y: 2, z: 3 }
```

<br>

## 4. 활용 사례 (Use Cases)

### 4.1 배열/객체의 '얕은 복사' (Shallow Copy)

원본의 미접촉 상태 유지 및 새로운 복사본의 생성 시 가장 많은 활용.

💾 [예제 코드 실행해보기](./examples/35-01-shallow-copy.js)

### 4.2 리액트 상태 업데이트 (State Update)

리액트에서는 `state`의 직접 수정 불가이므로, 스프레드 문법으로의 **"복사본 생성 후 수정 및 교체 방식"** 활용.

💾 [예제 코드 실행해보기](./examples/35-02-react-state-update.js)

```javascript
// ❌ 나쁜 예 (원본 직접 수정 - 리렌더링 안 됨)
user.age = 21; 

// ⭕ 좋은 예 (스프레드로 복사 후 수정)
setUser({ ...user, age: 21 });
```

<br>

## 5. 자주 발생하는 실수 (Common Mistakes)

### 5.1 스프레드 문법은 '값'이 아니다

스프레드 문법의 결과는 값들의 목록이지, 하나의 값이 아님. 따라서 변수에의 직접 할당 불가.

```javascript
// ❌ SyntaxError
const list = ...[1, 2, 3]; 

// ⭕ 무언가(배열, 객체, 함수인자)로의 감싸짐 필요
const list = [...[1, 2, 3]]; 
```

### 5.2 얕은 복사(Shallow Copy)의 한계

가장 중요한 함정. `...`은 1단계 깊이까지만의 복사. 중첩된 객체까지의 완벽한 복사(깊은 복사) 불가.

💾 [예제 코드 실행해보기](./examples/35-03-shallow-copy-limitation.js)

**해결**: 중첩 객체의 경우 `structuredClone`이나 `lodash/cloneDeep`의 활용 필요.

<br>

## 6. 헷갈렸던 부분 (Confusing Points)

### 6.1 Rest 파라미터(`...`) vs 스프레드 문법(`...`)

생김새는 동일하지만 역할은 정반대.

**스프레드 문법**: 뭉친 것의 펼침. (주는 입장)

```javascript
func(...arr); // [1, 2] -> 1, 2
```

**Rest 파라미터**: 흩어진 것의 모음. (받는 입장)

```javascript
function func(...rest) { // 1, 2 -> [1, 2]
  console.log(rest); 
}
```