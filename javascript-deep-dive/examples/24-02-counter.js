// 카운터 상태 유지 예제
const increase = (function () {
    let num = 0; // 카운트 상태 변수 (은닉됨)
  
    // 클로저 반환
    return function () {
      return ++num; // 상위 스코프의 num을 참조 및 변경
    };
  }());
  
  console.log(increase()); // 1
  console.log(increase()); // 2
  console.log(increase()); // 3