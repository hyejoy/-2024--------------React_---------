import { useReducer } from "react";

// reducer : 변환기
// -> 상태를 실제로 변환시키는 변환기 역할
function reducer(state, action) {
  console.log(state, action); // 0 , { "type": "INCREASE","data": 1}
  // reducer에서 새로운 state값을 반환하게 되면 useReducer가 불러와서 state값을 변경시켜주게됨
  switch (action.type) {
    case "INCREASE":
      return state + action.data;
    case "DECREASE":
      return state - action.data;
    default:
      return state;
  }
}

const Exam = () => {
  // dispatch : 발송하다, 급송하다
  // -> 상태 변화가 있어야 한다는 사실을 알리는, 발송하는 함수
  /**
   * 컴포넌트 내부에서 dispatch 함수를 호출하게 되면 상태변화가 요청되고
   * useReducer가 상태변화를 실제로 처리하게되는 함수를 호출하게 되는데
   * 그 함수는 우리가 직접 만들어야한다.
   */
  const [state, dispatch] = useReducer(reducer, 0); // 0은 초기값

  const onClickPlus = () => {
    // 인수 : 상태가 어떻게 변화되길 원하는지 전달 [객체상태로 전달하며, 이 객체는 '액션 객체' 라고함]
    // type은 INCREASE [값을 증가시켜달라고 요청]
    // data는 1만큼 증가 [얼만큼 증가시키는지 알림]
    dispatch({
      type: "INCREASE",
      data: 1,
    });
    // dispatch함수를 호출하게되면, reducer 함수가 호출하게되고 액션객체가 reducer로  전달됨
  };

  const onClickMinus = () => {
    dispatch({
      type: "DECREASE",
      data: 1,
    });
  };

  return (
    <div>
      <h1>{state}</h1>
      <button onClick={onClickPlus}>+</button>
      <button onClick={onClickMinus}>-</button>
    </div>
  );
};

export default Exam;
