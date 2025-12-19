# [JS] 22장. this

## 1. this란? (Definition)
> "자신이 속한 객체 또는 자신이 생성할 인스턴스를 가리키는 자기 참조 변수(Self-referencing variable)"

- **핵심 키워드**: `동적 바인딩`, `함수 호출 방식`, `화살표 함수`, `일반 함수`
- **내가 이해한 문장**:
    - 다른 언어(Java, C++)와 달리 자바스크립트의 `this`는 함수가 **"어떻게 호출되었는지"** 에 따라 가리키는 대상이 그때그때 달라진다. (호출한 놈이 범인이다!)

<br>

## 2. 핵심 전제 지식 (Prerequisites)
`this`를 이해하려면 함수가 호출되는 4가지 방식을 구분할 수 있어야 함.

### 2.1 함수 호출의 4가지 형태
1. **일반 함수 호출**: `foo()`
2. **메서드 호출**: `obj.foo()`
3. **생성자 함수 호출**: `new Foo()`
4. **간접 호출**: `foo.call()`, `foo.apply()`

<br>

## 3. 동작 원리: 바인딩 규칙 (Mechanism)
*자바스크립트 엔진은 함수 호출 시점에 `this` 바인딩을 결정함.*

[💾 예제 코드 실행해보기](./examples/22-01-this-binding.js)


### 3.1 일반 함수 호출 (Default Binding)
- **규칙**: 기본적으로 `this`는 전역 객체(**window** / global)에 바인딩된다.
- **특이점**: `'use strict'`(엄격 모드)에서는 `undefined`가 된다.
- **주의**: 중첩 함수나 콜백 함수라도 '일반 함수'로 호출되면 무조건 전역 객체를 가리킨다. (설계상의 결함으로 여겨짐)

### 3.2 메서드 호출 (Implicit Binding)
- **규칙**: 메서드를 호출한 객체, 즉 마침표(`.`) 앞의 객체에 바인딩된다.
- **예시**: `person.getName()` -> `this`는 `person`이다.
- **핵심**: 메서드를 소유한 객체가 아니라, **호출한 객체**라는 점이 중요함.

### 3.3 생성자 함수 호출 (new Binding)
- **규칙**: 생성자 함수가 (미래에) 생성할 **인스턴스**에 바인딩된다.
- **동작**: `new` 키워드를 쓰면 빈 객체가 만들어지고, `this`는 그 빈 객체를 가리키게 됨.

### 3.4 간접 호출 (Explicit Binding)
- **규칙**: `Function.prototype.apply/call/bind` 메서드를 통해 `this`를 개발자가 **명시적으로 지정**한다.

<br>

## 4. 화살표 함수의 this (Arrow Function)
*ES6에서 도입된 화살표 함수는 기존 `this` 규칙을 따르지 않음 (매우 중요)*

### 4.1 렉시컬 this (Lexical this)
- **정의**: 화살표 함수는 자체적인 `this` 바인딩을 갖지 않는다.
- **동작**: 상위 스코프(함수가 정의된 위치)의 `this`를 그대로 참조한다. (마치 변수 스코프 체인처럼 동작)
- **활용**: 콜백 함수 내부에서 `this`가 전역으로 튀는 문제를 해결하기 위해 주로 사용됨 (React에서 자주 쓰는 이유).

<br>

## 5. 자주 발생하는 실수 (Common Mistakes)
딥다이브 예제 변형

```javascript
const obj = {
  value: 100,
  foo() {
    // 메서드 내부의 콜백 함수
    setTimeout(function() {
      console.log(this.value); // ?
    }, 100);
  }
};

obj.foo();
```
- **문제점** : setTimeout 안의 콜백 함수는 '일반 함수'로 호출됨. 따라서 this는 obj가 아니라 window를 가리킴.
- **결과** : undefined 출력.
- **해결 방법** : 화살표 함수 사용: setTimeout(() => console.log(this.value), 100);<br>화살표 함수 사용: setTimeout(() => console.log(this.value), 100);

<br>

## 6. 헷갈렸던 부분 & 의문점 (Troubleshooting)
### 6.1 메서드 내부의 함수
- **Q.** 메서드 안에서 정의된 중첩 함수도 this가 객체일까?
- **A.** 아니다. 중첩 함수라도 **일반 함수로 호출(foo())**되면 무조건 전역 객체다. 이걸 해결하려고 화살표 함수가 나왔다.

### 6.2 이벤트 핸들러의 this
- **Q.** HTML 요소에 클릭 이벤트를 걸면 this는 뭔가?
- **A.** addEventListener를 쓰면: 이벤트를 바인딩한 DOM 요소 (currentTarget).<br>리액트(onClick)에서 쓰면: 화살표 함수를 주로 쓰므로 상위 컴포넌트나 클래스 인스턴스.
