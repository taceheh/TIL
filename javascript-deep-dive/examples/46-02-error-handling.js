async function getData() {
    try {
      const res = await fetch('/api/data');
      const data = await res.json();
      console.log(data);
    } catch (error) {
      // 네트워크 에러, 파싱 에러 등을 여기서 모두 잡음
      console.error('문제 발생:', error);
    }
  }