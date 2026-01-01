// 리액트 예시
const [user, setUser] = useState({ name: 'Kim', age: 20 });

// ❌ 나쁜 예 (원본 직접 수정 - 리렌더링 안 됨)
user.age = 21; 

// ⭕ 좋은 예 (스프레드로 복사 후 수정)
setUser({ ...user, age: 21 });