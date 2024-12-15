import { useEffect } from "react";

const Even = () => {
  useEffect(() => {
    // useEffect의 콜백함수를 반환하는 함수를
    // 클린업, 정리함수라고 부르는데
    // useEffect가 끝날때 실행된다.
    return () => {};
  }, []);

  return <div>짝수 입니다.</div>;
};

export default Even;
