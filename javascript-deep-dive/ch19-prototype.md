# [JS] 19장. 프로토타입 (Prototype)

## 1. 프로토타입이란? (Definition)

> "어떤 객체의 상위(부모) 역할을 하는 객체로서 다른 객체에게 공유 프로퍼티(메서드 포함)를 제공하는 것"

- **핵심 키워드**: 상속, 프로토타입 체인, `__proto__` vs `prototype`
- **한 줄 요약**: 자바스크립트는 클래스가 아니라 **'객체를 원형(Prototype)으로 삼고 그것을 복제(참조)하여 새로운 객체를 만드는 방식'** 으로 상속을 구현.

<br>

## 2. 핵심 전제 지식 (Prerequisites)

자바스크립트가 객체지향을 어떻게 구현하는지, 그리고 왜 필요한지를 먼저 알아야 함.

### 2.1 객체지향 프로그래밍 (OOP)

**정의**: 프로그램을 명령어의 목록으로 보는 것이 아니라, 여러 개의 독립적 단위인 **객체(Object)** 들의 집합으로 파악하는 패러다임.

**특징**: 자바스크립트는 명령형, 함수형, 프로토타입 기반 객체지향 프로그래밍을 지원하는 멀티 패러다임 언어.

**추상화(Abstraction)**: 다양한 속성 중에서 프로그램에 필요한 속성만 간추려 표현하는 것.

### 2.2 상속과 메모리 효율성 (Inheritance & Memory)

**문제점**: 생성자 함수로 인스턴스를 여러 개 생성할 때, 메서드를 생성자 함수 내부에 정의하면 모든 인스턴스가 동일한 메서드를 각각 중복 생성하여 메모리를 낭비.

**해결책**: 프로토타입을 사용하면 모든 인스턴스가 하나의 메서드를 공유하므로 메모리를 효율적으로 사용가능.

💾 예제 코드 실행해보기

<br>

## 3. 프로토타입 객체 (The Prototype Object)

### 3.1 __proto__ vs prototype 프로퍼티

가장 혼동하기 쉬운 두 개념의 차이를 명확히 구분해야 합니다.

| 구분 | 소유 주체 | 역할 및 의미 | 비유 |
|---|---|---|---|
| **prototype** | 생성자 함수 (Function) | "내가 생성할 인스턴스에게 물려줄 유산(부모 객체)은 이것이다" | 유언장 |
| **__proto__** | 모든 객체 (Instance) | "나의 부모(자신의 프로토타입)는 누구인가?" | 족보 |

**주의**: 코드에서 직접 `obj.__proto__`를 사용하는 것은 권장되지 않음. 대신 `Object.getPrototypeOf(obj)`와 `Object.setPrototypeOf(obj)`를 사용할 것.

### 3.2 리터럴 표기법과 생성자 함수

객체 리터럴(`{}`)로 생성된 객체도 프로토타입이 존재.

- `const obj = {}` → `Object.prototype`을 상속받음.
- 즉, 리터럴로 생성된 객체도 내부적으로는 Object 생성자 함수와 연결되어 있음.

<br>

## 4. 프로토타입 체인 (Prototype Chain)

### 4.1 동작 원리 (Mechanism)

자바스크립트 엔진이 객체의 프로퍼티(메서드 포함)에 접근하려고 할 때의 검색 규칙.

1. **자신 검색**: 해당 객체에 그 프로퍼티가 있는지 확인 (hasOwnProperty)
2. **상위 탐색**: 없으면 `[[Prototype]]` 내부 슬롯의 참조를 따라 부모 프로토타입으로 이동
3. **반복**: 찾을 때까지 위 과정을 반복 (체이닝)
4. **종점**: `Object.prototype`에도 없으면 `undefined` 반환 (`Object.prototype`의 프로토타입은 `null`)

### 4.2 스코프 체인 vs 프로토타입 체인

- **스코프 체인**: 식별자(변수)를 검색하는 규칙 (Lexical Environment)
- **프로토타입 체인**: 객체의 프로퍼티(메서드)를 검색하는 규칙

**결론**: 두 체인은 서로 협력하여 동작함. 먼저 스코프 체인에서 식별자(me)를 찾고, 그 객체(me)의 프로토타입 체인에서 프로퍼티(sayHello)를 찾음.

<br>

## 5. 오버라이딩과 프로퍼티 섀도잉 (Overriding & Shadowing)

### 5.1 개념 설명

**오버라이딩(Overriding)**: 상위 클래스(프로토타입)가 가지고 있는 메서드를 하위 객체(인스턴스)가 재정의하여 사용하는 것.

**프로퍼티 섀도잉(Property Shadowing)**: 오버라이딩에 의해 상위 프로토타입의 프로퍼티가 가려지는 현상.

💾 예제 코드 실행해보기

```javascript
const Person = (function () {
  function Person(name) { this.name = name; }
  
  Person.prototype.sayHello = function () {
    console.log(`Hi! My name is ${this.name}`);
  };
  
  return Person;
}());

const me = new Person('Lee');

// 인스턴스 메서드 (오버라이딩)
me.sayHello = function () {
  console.log(`Hey! I'm ${this.name}`);
};

// 인스턴스 메서드가 호출됨 (프로토타입 메서드는 가려짐)
me.sayHello(); // "Hey! I'm Lee"
```

<br>

## 6. 자주 발생하는 실수 & 헷갈리는 부분

### 6.1 __proto__를 코드에 직접 쓰는 것

- **Q**: me.__proto__로 접근하면 편한데 왜 쓰지 말라고 할까?
- **A**: 모든 객체가 `__proto__`를 상속받는 것은 아니기 때문. (예: `Object.create(null)`로 만든 객체는 프로토타입이 없어 `__proto__` 사용 시 에러 발생 가능성 있음)

### 6.2 정적(Static) 메서드와 프로토타입 메서드의 차이

- **Q**: `Person.sayHi()`와 `me.sayHi()`는 같은 것 아닌가?
- **A**: 완전히 다름.
  - `Person.sayHi()`: 생성자 함수 자체가 호출하는 정적 메서드. 인스턴스(me)는 호출 불가. (this가 생성자 함수를 가리킴)
  - `me.sayHi()`: 인스턴스가 호출하는 프로토타입 메서드. (this가 인스턴스를 가리킴)

```javascript
// 정적 메서드 예시
Number.isInteger(10); // true (Number 생성자 함수가 직접 호출)
// 10.isInteger(); // Error (숫자 리터럴 인스턴스는 호출 불가)
```

### 6.3 instanceof 연산자의 함정

- **Q**: `me instanceof Person`은 me가 Person으로 만들어졌는지를 확인하는 것인가?
- **A**: 엄밀히 말하면 아니다. 생성자 함수(Person)를 확인하는 게 아니라, `Person.prototype`이 me의 프로토타입 체인 상에 존재하는지를 확인하는 것.
  - 따라서 `Person.prototype`을 다른 객체로 교체해버리면, 진짜 부모라도 instanceof 결과가 false가 나올 수 있음.
