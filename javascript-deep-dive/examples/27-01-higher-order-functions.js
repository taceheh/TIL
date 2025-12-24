// 예제 데이터
const cart = [
  { id: 1, name: '노트북', price: 1000000, active: true },
  { id: 2, name: '마우스', price: 50000, active: true },
  { id: 3, name: '키보드', price: 150000, active: false }, // 품절 상태
];


// 1. map (변환)
// 원본 배열을 건드리지 않고, '상품의 이름만' 뽑아서 새로운 배열로 만듬.
// (리액트에서 데이터를 화면에 렌더링할 때 가장 많이 사용)
const productNames = cart.map(item => item.name);

console.log(productNames);
// [답] [ '노트북', '마우스', '키보드' ]


// 2. filter (추출)
// '판매 중(active: true)'인 상품만 골라냄.
// (리액트에서 특정 조건의 항목만 보여줄 때 사용)
const activeProducts = cart.filter(item => item.active);

console.log(activeProducts);
/* [답]
[
  { id: 1, name: '노트북', price: 1000000, active: true },
  { id: 2, name: '마우스', price: 50000, active: true }
]
*/


// 3. reduce (집계)
// 판매 중인 상품들의 '가격 총합'을 구함.
// acc: 누적값 (accumulator), cur: 현재값 (current value)
// 0: 초기값
const totalPrice = cart
  .filter(item => item.active) // 먼저 판매 중인 것만 거르고
  .reduce((acc, cur) => acc + cur.price, 0); // 가격을 계속 더함

console.log(totalPrice);
// [답] 1050000  (100만 + 5만)


// 4. 심화: id가 2인 상품 찾아서 가격 수정하기 (불변성 유지)
// (리액트의 useState에서 상태를 업데이트하는 패턴)
const updatedCart = cart.map(item => 
  item.id === 2 
    ? { ...item, price: 60000 } // 조건에 맞으면 가격만 바꿔서 새 객체 생성
    : item // 아니면 원래 객체 그대로 유지
);

console.log(updatedCart[1].price); 
// [답] 60000 (원본 cart[1].price는 여전히 50000임)
