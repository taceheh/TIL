const obj = { a: 1, nested: { b: 2 } };
const copy = { ...obj };

copy.nested.b = 999;
// 원본도 같이 바뀜!! (중첩된 객체는 참조를 공유하므로)
console.log(obj.nested.b); // 999