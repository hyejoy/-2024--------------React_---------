import "./App.css";
import { useState, useRef } from "react";
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
  const [todos, setTodos] = useState(mockData);
  const idRef = useRef(3);

  const onCreate = (content) => {
    const newTodo = {
      id: idRef.current++,
      isDone: false,
      content: content,
      date: new Date().getTime(),
    };
    setTodos([...todos, newTodo]);
  };

  return (
    <div className="App">
      <Header />
      <Editer onCreate={onCreate} />
      <List todos={todos} />
    </div>
  );
};

export default App;
