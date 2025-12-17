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