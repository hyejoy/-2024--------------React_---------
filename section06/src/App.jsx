import "./App.css";
import Viwer from "./components/Viewr";
import Controller from "./components/Controller";
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  const onClickButton = (value)=>{
    value = Number(value);
    setCount(count + value);
  }
  
  return (
    <div className="App">
      <h1>Simple Counter</h1>
      <section>
        <Viwer count={count}/>
      </section>
      <section>
        <Controller onClickButton={onClickButton}/>
      </section>
    </div>
  );
}

export default App;
