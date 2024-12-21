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

  // todos State의 값 들 중에
  // targetId와 일치하는 id를 갖는 투두 아이템의 isDone 변경
  // 인수 : todos 배열에서 target Id와 일치하는 id를 갖는 요소의 데이터만
  // 딱 바꾼 새로운 배열
  const onUpdate = (targetId) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === targetId) {
          return {
            ...todo,
            isDone: !todo.isDone,
          };
        }
        // 그 외
        return todo;
      })
    );
  };

  const refactoringOnUpdate = (targetId) => {
    setTodos(
      todos.map((todo) =>
        todo.id === targetId ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  return (
    <div className="App">
      <Header />
      <Editer onCreate={onCreate} />
      <List todos={todos} onUpdate={refactoringOnUpdate} />
    </div>
  );
};

export default App;
