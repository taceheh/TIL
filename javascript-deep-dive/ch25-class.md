# [JS] 25장. 클래스 (Class)

## 1. 클래스란? (Definition)

> "자바스크립트의 프로토타입 기반 객체 생성 방식을 클래스 기반 언어(Java, C# 등)처럼 익숙하고 간편하게 사용할 수 있도록 만든 문법"

- **핵심 키워드**: Syntactic Sugar(문법적 설탕), `constructor`, `extends`, `super`, strict mode
- **한 줄 요약**: 내부적으로는 여전히 프로토타입 사용이지만, **더 엄격한 규칙(Strict Mode 강제, new 필수)** 적용을 통해 객체 생성과 상속을 안전하고 명료하게 만드는 메커니즘.

<br>

## 2. 핵심 전제 지식 (Prerequisites)

클래스를 제대로 이해하기 위한 기존 생성자 함수 방식과의 비교 필요.

### 2.1 생성자 함수 vs 클래스

기존의 function으로 객체를 만드는 방식과 결과물의 비교. 클래스가 더 엄격함.

| 구분 | 생성자 함수 (Constructor Function) | 클래스 (Class) |
|---|---|---|
| **호출 방식** | new 없이 호출하면 일반 함수로 동작 | new 없이 호출하면 에러 발생 (TypeError) |
| **Strict Mode** | 선택 사항 | 암묵적으로 무조건 적용 (해제 불가) |
| **상속** | 프로토타입 체인을 수동으로 연결해야 함 | extends, super 키워드로 간편하게 구현 |
| **열거 가능 여부** | 메서드가 열거 가능(enumerable)할 수 있음 | 메서드는 열거되지 않음 (non-enumerable) |

<br>

## 3. 동작 원리 (Mechanism)

### 3.1 클래스 정의와 인스턴스 생성

클래스는 함수. 더 정확히 말하면 특별한 함수.

```javascript
class Person {
  // 1. 생성자: 인스턴스 초기화
  constructor(name) {
    this.name = name; // 인스턴스 프로퍼티 (public)
  }

  // 2. 프로토타입 메서드: Person.prototype에 저장됨
  sayHi() {
    console.log(`Hi! ${this.name}`);
  }

  // 3. 정적 메서드: 생성자 함수 자체에 붙음
  static sayHello() {
    console.log('Hello!');
  }
}

const me = new Person('Lee');
```

**constructor**: new 연산자와 함께 호출되면 내부의 constructor가 실행되어 인스턴스를 초기화.

**프로토타입 메서드**: sayHi 같은 메서드는 자동으로 Person.prototype에 추가됨. (생성자 함수처럼 일일이 prototype에 할당할 필요 없음)

**정적 메서드**: static 키워드를 붙이면 인스턴스가 아닌 클래스 자체에 바인딩됨.

### 3.2 상속 (Inheritance) - extends와 super

클래스 문법의 꽃은 상속. 복잡한 프로토타입 체인 연결을 extends 키워드 하나로 단순화.

```javascript
class Animal {
  constructor(age, weight) {
    this.age = age;
    this.weight = weight;
  }
  eat() { return 'eat'; }
}

class Bird extends Animal { // Animal을 상속받음
  fly() { return 'fly'; }
}

const bird = new Bird(1, 5);
console.log(bird.eat()); // 'eat' (부모 메서드 사용 가능)
console.log(bird.fly()); // 'fly'
```

**동작 원리**: extends를 사용하면 자식 클래스(Bird)의 `[[Prototype]]`이 부모 클래스(Animal)로 연결됨. 또한, Bird.prototype의 프로토타입은 Animal.prototype이 됨. (이중 연결)

<br>

## 4. 활용 사례 및 최신 문법 (Use Cases & Modern Features)

### 4.1 클래스 필드 정의 제안 (Class Field Declarations)

이전에 배운 this 바인딩 문제를 해결하는 가장 깔끔한 방법. (React 개발 시 필수)

```javascript
class Button {
  constructor(name) {
    this.name = name;
  }

  // 1. 일반 메서드 (this 바인딩 문제 발생 가능)
  handleClick() {
    console.log(this.name);
  }

  // 2. 화살표 함수로 정의한 클래스 필드 (this가 인스턴스로 고정됨!)
  handleClickArrow = () => {
    console.log(this.name);
  }
}
```

**설명**: handleClickArrow는 프로토타입 메서드가 아니라, 인스턴스 객체마다 생성되는 개별 프로퍼티. 화살표 함수의 특성상 this가 인스턴스로 고정(Lexical this)되므로 콜백으로 넘겨도 안전.

### 4.2 private 필드 (#)

자바스크립트에서도 정보 은닉을 위해 #을 붙여 private 필드 선언 가능.

```javascript
class Person {
  #name = ''; // private 필드 선언

  constructor(name) {
    this.#name = name;
  }

  get name() { // 접근자 프로퍼티로 간접 접근
    return this.#name; 
  }
}

const me = new Person('Lee');
// console.log(me.#name); // SyntaxError (외부 접근 불가)
console.log(me.name); // 'Lee' (getter를 통해 접근)
```

<br>

## 5. 자주 발생하는 실수 (Common Mistakes)

### 5.1 super() 호출 누락

상속받은 클래스(파생 클래스)에서 constructor를 작성할 때, 반드시 가장 먼저 super()를 호출해야 함.

```javascript
class Base {}

class Derived extends Base {
  constructor() {
    // ReferenceError: Must call super constructor in derived class before accessing 'this'
    this.a = 1; 
    super(); //  super()가 this 사용보다 먼저 나와야 함!
  }
}
```

**이유**: 상속받은 클래스는 인스턴스 생성을 부모 클래스에게 위임하기 때문. 부모가 먼저 인스턴스를 만들지 않으면 this 자체가 존재하지 않음.

### 5.2 클래스 호이스팅 (Hoisting)

- **Q**: 클래스는 호이스팅이 안 되나요?
- **A**: 아니요, 됩니다. 하지만 let, const처럼 **일시적 사각지대(TDZ)** 에 빠지기 때문에, 정의하기 전에 사용하면 ReferenceError가 발생합니다. (호이스팅이 안 되는 것처럼 보일 뿐입니다.)

<br>

## 6. 헷갈렸던 부분 & 심화 (Confusing Points)

### 6.1 "클래스는 문법적 설탕인가요?"

- **Q**: 그냥 생성자 함수를 보기 좋게 바꾼 것뿐인가요?
- **A**: 대체로 그렇지만, 100%는 아닙니다.
  - **문법적 설탕(Syntactic Sugar)**: 기존 기능을 쉽게 쓰게 해주는 것. (맞음)
  - **하지만**: 클래스는 생성자 함수보다 **더 엄격한 문법(new 강제, extends 등)** 을 제공하고, 엔진 내부적으로도 최적화되어 동작하므로 **"새로운 객체 생성 메커니즘"** 으로 보는 것이 더 정확합니다.

### 6.2 super 참조

메서드 내부에서 `super.method()`를 호출하면 부모 클래스의 메서드를 호출할 수 있음.

이때 super는 정적으로 바인딩된 부모 클래스의 프로토타입(Base.prototype)을 가리킴.
