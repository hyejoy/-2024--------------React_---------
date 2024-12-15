import "./App.css";
import Viwer from "./components/Viewr";
import Controller from "./components/Controller";
import { useState, useEffect } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [input, setInput] = useState("");

  const onClickButton = (value) => {
    value = Number(value);
    setCount(count + value);
  };

  /**
   * 배열의값이 바뀌게되면, 첫번째 인수로 전달한 콜백함수를 실행시켜줌
   * 여기서 count, input는 의존성 배열로 [dependency array, deps]
   * 둘중 하나의 값이 바뀌면 useEffect가 실행된다.
   */
  useEffect(() => {
    console.log(`count: ${count}`);
    console.log(`input: ${input}`);
  }, [count, input]);

  /**
   * 🤔useEffect 대신 이렇게 쓰면 값이 찍히지않아?
   */
  const eventFunction = (value) => {
    setCount(value);
    console.log(count); // 현재 count값이 찍히지않고, 전에 저장되었던 count값이 찍힘
  };

  /**
   * react의 상태변화 함수는 비동기로 동작하기때문에 (함수의 완료가 뒤늦게 됨)
   * 그래서 실제로는 console.log(count)를 호출할때 setCount가 호출된것이지, 완료된것은 아님
   * 따라서 저장되기 이전의 값이 출력되고 있는것
   * 변경된 state값을 이용하여 사이드이팩트에 해당되는 부가적인 작업을 진행하려면 useEffect를 사용해야한다.
   */

  return (
    <div className="App">
      <h1>Simple Counter</h1>
      <section>
        <input
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
      </section>
      <section>
        <Viwer count={count} />
      </section>
      <section>
        <Controller onClickButton={onClickButton} />
      </section>
    </div>
  );
}

export default App;
