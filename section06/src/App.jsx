import "./App.css";
import Viwer from "./components/Viewr";
import Controller from "./components/Controller";
import { useState } from "react";

function App() {
  /** Viewr 컴포넌트와 Controller컴포넌트는 부모, 자식관게를
   * 갖지 못하므로 값을 공유할수있는 방법이 없다.
   * 따라서 두개의 컴포넌트의 부모인 App에서 state를 관리해야한다.
   */
  const [count, setCount] = useState(0);
  const onClickButton = (value) => {
    value = Number(value);
    setCount(count + value);
  };

  return (
    <div className="App">
      <h1>Simple Counter</h1>
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
