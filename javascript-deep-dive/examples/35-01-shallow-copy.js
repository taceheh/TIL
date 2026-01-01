const origin = [1, 2];
const copy = [...origin]; // 새로운 배열 생성

console.log(copy === origin); // false (참조값이 다름 -> 불변성 유지!)