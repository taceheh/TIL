const x = 1;

function foo() {
  const x = 10;
  bar();
}

function bar() {
  console.log(x);
}

// 실행 결과 확인
foo(); // 1
bar(); // 1

// 결과: 둘 다 1이 출력
// 이유: bar 함수는 전역에서 정의. 따라서 bar의 상위 스코프는 전역 스코프. foo 안에서 호출되었다고 해서 상위 스코프가 foo로 바뀌지 않음.
