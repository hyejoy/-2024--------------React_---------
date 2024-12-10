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
  /**
   * 각각의 컴포넌트마다 state를 생성하고,
   * 이벤트 핸들러를 생성하는 코드를 중복으로 매번 작성해줘야되는데
   * ====> 별도의 함수로 만들면 될것같은데🤔? -> custom hook 생성
   */

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
