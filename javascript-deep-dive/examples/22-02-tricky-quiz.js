const name = 'Global'; // 전역 변수

const person = {
  name: 'Wonhee',
  getName: function() {
    console.log(this.name);
  }
};

// 1. 이건 쉽죠?
person.getName(); 

// 2. 메서드를 변수에 할당했습니다.
const myFunc = person.getName; 

// Q. 여기서 출력되는 값은?
myFunc();





const user = {
  name: 'Wonhee',
  sayHi: function() {
    console.log('1:', this.name);
    
    // 일반 함수 콜백
    setTimeout(function() {
      console.log('2:', this.name);
    }, 100);
    
    // 화살표 함수 콜백
    setTimeout(() => {
      console.log('3:', this.name);
    }, 100);
  }
};

user.sayHi();




const name = 'Global';

const obj = {
  name: 'Object',
  
  // 일반 함수 메서드
  normal: function() {
    console.log(this.name);
  },
  
  // 화살표 함수 메서드
  arrow: () => {
    console.log(this.name);
  }
};

obj.normal();
obj.arrow(); // Q. 얘는 뭐가 나올까요? 'Object'? 'Global'?
