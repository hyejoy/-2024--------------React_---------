import { useState } from "react";

// 3가지 hook 관련 팁
/**
 * 1. 함수 컴포넌트, 커스텀 훅 내부에서만 호출 가능
 * 2. 조건부로 호출될 수 없다.
 *  */

const HookExam = () => {
  if (true) {
    const state = useState();
  } // 조건부로 hook을 호출해서는안된다. ⚠ 오류발생
  return <div>hookExam</div>;
};

export default HookExam;
