import { useState } from "react";

// 3가지 hook 관련 팁
/**
 * 1. 함수 컴포넌트, 커스텀 훅 내부에서만 호출 가능
 * 2. 조건부로 호출될 수 없다.
 * 3. 나만의 훅 (Cutomer hook) 직접 만들 수 있다.
 *  */

const HookExam = () => {
  const [input, setInput] = useState("");

  const onChagne = (e) => {
    setInput(e.targert.value);
  };

  return (
    <div>
      <input type="text" value={input} onChange={onChagne} />
    </div>
  );
};

export default HookExam;
