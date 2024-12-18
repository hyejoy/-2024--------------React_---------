import "./App.css";
import { useState } from "react";
import Header from "./components/Header";
import Editer from "./components/Editer";
import List from "./components/List";

const mockData = [
  {
    id: 0,
    isDone: false,
    content: "이직 준비하기",
    date: new Date().getTime(),
  },
  {
    id: 1,
    isDone: false,
    content: "React 공부하기",
    date: new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    content: "운동하기",
    date: new Date().getTime(),
  },
];
const App = () => {
  const [todo, setTodos] = useState(mockData);
  return (
    <div className="App">
      <Header />
      <Editer />
      <List />
    </div>
  );
};

export default App;
