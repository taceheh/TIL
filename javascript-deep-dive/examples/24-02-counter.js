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


// 해설 : num 변수는 increase 함수(클로저)만이 변경 가능. 전역 변수로 만들었을 때 누군가 실수로 `num = 100`으로 변경하는 부작용(Side Effect)을 원천 차단
