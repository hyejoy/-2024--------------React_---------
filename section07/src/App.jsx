import "./App.css";
import Viwer from "./components/Viewr";
import Controller from "./components/Controller";
import { useState, useEffect, useRef } from "react";
import Even from "./components/Even";

function App() {
  const [count, setCount] = useState(0);
  const [input, setInput] = useState("");

  const isMount = useRef(false);
  /** ✔ 1. 마운트 : 탄생
   * useEffect는 deps의 값이 변경되어야만 실행되기때문에
   * 결국 콜백함수는 컴포넌트가 mount된 이후에는 다시는 실행되지않음
   */
  useEffect(() => {
    console.log("mount");
  }, []);

  /** ✔ 2. 업데이트 : 변화, 리렌더링
   * mount 시점 및, 리렌더링시 실행된다
   */

  /**
   * 컴포넌트의 udpate 시점에서만 코드를 실행시키고싶다면,(mount에는 실행X)
   * 다음예시와 같이 작성한다
   * App 컴포넌트가 최초로 mount될 때 실행되는데, 조건문이 실행되고 return됨
   * 두번째 리랜더링시에는 이미 ref가 true이므로 콘솔이 찍히기 시작함
   */

  useEffect(() => {
    if (!isMount.current) {
      isMount.current = true;
      return;
    }
    console.log("update");
  });

  /**
   * ✔ 3. 언마운트 : 죽음
   */

  const onClickButton = (value) => {
    value = Number(value);
    setCount(count + value);
  };

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
        {count % 2 === 0 ? <Even /> : null}
      </section>
      <section>
        <Controller onClickButton={onClickButton} />
      </section>
    </div>
  );
}

export default App;
