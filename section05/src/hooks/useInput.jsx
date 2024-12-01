import { useState } from "react";

// Custom Hook은 함수이름앞에 use라는 키워드를 써주면,
// 커스텀훅으로 판단하게 된다. 따라서 커스텀 훅안에서 hook을 호출할수있게됨.
// src 디렉토리 밑에 hook라는 별도 디렉토리를 만들어서 관리하는것이 일반적이다.

function useInput() {
  const [input, setInput] = useState("");

  const onChange = (e) => {
    setInput(e.target.value);
  };

  return [input, onChange];
}

export default useInput;
