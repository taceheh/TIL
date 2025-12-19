// 22-01-this-binding.js

console.log('--- 1. 일반 함수 ---');
function normal() { 
  console.log(this); 
}
normal(); // window


console.log('--- 2. 메서드 ---');
const obj = {
  name: 'Lee',
  getName() { 
    console.log(this.name); 
  }
};
obj.getName(); // Lee


const anotherObj = { name: 'Kim' };
anotherObj.getName = obj.getName; // 메서드 빌려오기
anotherObj.getName(); // Kim 
