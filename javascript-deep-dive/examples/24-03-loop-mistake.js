// 1. 실수 케이스 (var 사용)
var funcs = [];

// var i는 함수 레벨 스코프이므로 전역 변수로 취급됨 (여기서는 블록 스코프가 안 먹힘)
for (var i = 0; i < 3; i++) {
  funcs[i] = function () { return i; }; // 다 같은 i를 바라봄
}

console.log('Var 결과:');
for (var j = 0; j < funcs.length; j++) {
  console.log(funcs[j]()); // 3, 3, 3 출력
}

// ------------------------------------------------

// 2. 해결 케이스 (let 사용)
const funcsLet = [];

for (let i = 0; i < 3; i++) {
  funcsLet[i] = function () { return i; }; // 반복마다 새로운 스코프(i) 생성
}

console.log('Let 결과:');
for (let j = 0; j < 3; j++) {
  console.log(funcsLet[j]()); // 0, 1, 2 출력
}
