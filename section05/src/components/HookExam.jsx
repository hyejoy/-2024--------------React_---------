import { useEffect } from "react";
import useInput from "../hooks/useInput";
// 3가지 hook 관련 팁
/**
 * 1. 함수 컴포넌트, 커스텀 훅 내부에서만 호출 가능
 * 2. 조건부로 호출될 수 없다.
 * 3. 나만의 훅 (Cutomer hook) 직접 만들 수 있다.
 *  */

const HookExam = () => {
  const [input, onChange] = useInput();
  const [input2, onChange2] = useInput();

  useEffect(() => {
    console.log(input);
  }, [input]);

  return (
    <div>
      <input type="text" value={input} onChange={onChange} />
      <input type="text" value={input2} onChange={onChange2} />
    </div>
  );
};

export default HookExam;
