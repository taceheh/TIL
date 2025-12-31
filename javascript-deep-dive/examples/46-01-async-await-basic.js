async function fetchUser() {
    // 1. fetch가 완료될 때까지 여기서 대기 (Non-blocking)
    const response = await fetch('https://api.user.com'); 
    
    // 2. 위 작업이 끝나야 실행됨
    const user = await response.json(); 
    
    return user;
  }