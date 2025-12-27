// 3개의 요청을 동시에 보냄 (가장 느린 요청이 끝날 때까지 기다림)
Promise.all([fetch('/A'), fetch('/B'), fetch('/C')])
  .then(results => console.log('모두 완료!', results));