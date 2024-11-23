import "./App.css";
import Register from "./components/Register";
function App() {
  return (
    <>
      {/* 각각 따로 수정하더라도, 전역변수 공유하고있어서 수정횟수가 이어서 세짐 */}
      <Register />
      <Register />
    </>
  );
}

export default App;
