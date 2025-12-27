// 프로미스 방식 (가독성 좋음)
fetch('/step1')
  .then(res => res.json())
  .then(data => fetch(`/step2/${data.id}`))
  .then(res => res.json())
  .catch(err => console.error(err)); // 에러 처리를 한 곳에서 관리 가능!