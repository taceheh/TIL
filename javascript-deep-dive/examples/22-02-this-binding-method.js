// 1. 사용할 객체들
const person1 = { name: '철수' };
const person2 = { name: '영희' };

// 2. this를 사용하는 함수
function updateInfo(age, job) {
  this.age = age;
  this.job = job;
  console.log(`${this.name}님 정보 업데이트 완료: ${this.age}세, ${this.job}`);
}



// 1. call 사용 (쉼표로 구분)
// "철수로 실행해! 인자는 25, 개발자"
updateInfo.call(person1, 25, '개발자'); 

// 2. apply 사용 (배열로 묶음)
// "영희로 실행해! 인자는 [30, 디자이너] 꾸러미야"
const args = [30, '디자이너'];
updateInfo.apply(person2, args);

// 3. bind 사용 (실행 안 함, 함수 생성만)
// "철수로 고정된 함수를 하나 만들어줘. (나중에 쓸게)"
const updateCheolsu = updateInfo.bind(person1);

// 나중에 실행 (인자만 넣어주면 됨)
updateCheolsu(28, '팀장');
