# [JS] 36장. 디스트럭처링 할당 (Destructuring Assignment)

## 1. 디스트럭처링 할당이란? (Definition)

> "배열이나 객체의 구조를 파괴(Destructuring)하여, 그 안에 담긴 값을 개별 변수에 할당하는 문법"

- **핵심 키워드**: `구조 분해`, `1:1 할당`, `기본값(Default Value)`, `React Hooks/Props`
- **한 줄 요약**: 배열이나 객체에서 필요한 값만 쏙쏙 뽑아내서 변수에의 담음 문법. (리액트에서 `useState`나 `props` 사용 시 숨 쉬듯이의 활용)

<br>

## 2. 핵심 전제 지식 (Prerequisites)

- **이터러블(Iterable)**: 배열 디스트럭처링은 이터러블의 필요.
- **프로퍼티 키(Key)**: 객체 디스트럭처링은 순서가 아닌 **키(이름)** 기준의 동작.

<br>

## 3. 동작 원리 (Mechanism)

### 3.1 배열 디스트럭처링 (Array)

**"순서"** 의 중요성. 우변의 배열 요소를 좌변의 변수에 인덱스 순서대로의 할당.

```javascript
const arr = [1, 2];

// 기존 방식
// const one = arr[0];
// const two = arr[1];

// 구조 분해 할당
const [one, two] = arr; 
console.log(one, two); // 1 2
```

### 3.2 객체 디스트럭처링 (Object)

**"키(Key)"** 의 중요성. 변수 이름과 프로퍼티 키의 일치 필요.

```javascript
const user = { firstName: 'Ungmo', lastName: 'Lee' };

// 순서 상관없음! 이름만 맞으면 됨.
const { lastName, firstName } = user;
console.log(firstName, lastName); // Ungmo Lee
```

<br>

## 4. 활용 사례 (Use Cases) 

리액트 개발자의 매일 작성 코드.

### 4.1 리액트 Hooks (`useState`)

`useState` 함수의 2개짜리 배열 반환을 구조 분해를 통한 수용.

```javascript
// useState는 [상태값, 세터함수] 배열을 반환함
const [count, setCount] = useState(0);
```

### 4.2 리액트 Props (함수 인자)

객체 전체의 수용이 아닌 필요한 것만의 골라내어 수용.

```javascript
// 기존: function Component(props) { console.log(props.name); }

// 구조 분해: 필요한 것만 명시적으로의 선언
function Component({ name, age }) { 
  console.log(name, age);
}
```

### 4.3 변수 값 교환 (Swap)

임시 변수 없이 두 변수의 값을의 교환 실현.

```javascript
let x = 1, y = 2;
[x, y] = [y, x];
```

<br>

## 5. 자주 발생하는 실수 (Common Mistakes)

### 5.1 변수 이름 변경하기 (객체)

객체의 키와 다른 이름의 변수에의 저장 시 혼동 가능성.

💾 [예제 코드 실행해보기](./examples/36-02-rename-variables.js)

```javascript
const { name: userName, age } = user;
// name이라는 변수는 미생성! userName이라는 변수에 user.name 값이의 할당됨.
```

### 5.2 기본값 설정

값이 `undefined`일 때의 사용 기본값의 지정 가능.

```javascript
const { name, job = '백수' } = { name: 'Kim' };
console.log(job); // '백수'
```

<br>

## 6. 헷갈렸던 부분 (Confusing Points)

### 6.1 배열 vs 객체 디스트럭처링의 차이

배열은 **순서** 기반, 객체는 **키** 기반이라는 근본적 차이.

- **배열**: `[a, b, c] = [1, 2, 3]` → 순서대로의 할당
- **객체**: `{ name, age } = obj` → 키 이름으로의 매칭

### 6.2 깊은 객체의 디스트럭처링

중첩된 객체의 경우 추가적 구조 분해 필요.

```javascript
const user = { name: 'Kim', address: { city: 'Seoul' } };

// 깊은 객체 접근
const { address: { city } } = user;
console.log(city); // 'Seoul'
```