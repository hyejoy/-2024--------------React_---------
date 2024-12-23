import "./App.css";
import { useState, useRef } from "react";
import Header from "./components/Header";
import Editer from "./components/Editer";
import List from "./components/List";
import Exam from "./components/Exam";

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
  /**
   * todo관리하는 데이터를 App컴포넌트 내부에 useState를 이용하여 만들었는데
   * 이렇게 되면 todos, setTodos 함수는 App 컴포넌트 내부에서만 접근이 가능하다
   * 그렇기 때문에 state를 관리하는 코드 또한 App컴포넌트 내부에서만 작성됐어야했다
   * ===> 상태관리 코드가 너무 길어진다! 😥
   * 컴포넌트의 주된 역할은 UI를 랜더링하는것인데, STATE 관리 코드가 많아지게되면 주객이 전도된것이다.
   * UI를 랜더링하는 코드보다, 상태를 관리하는 코드들이 훨씬 더 복잡해지고 길어지기때문이다.
   * 따라서 APP컴포넌트가 랜더링하는 UI요소가 무엇인지 한눈에 파악하기가 어려워 가독성이 떨어지게 되고 유지보수가 어려워짐
   * 컴포넌트 외부에 상태관리 코드를 분리시키도록 도와주는 useReducer가 필요하다.
   *
   */
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

  const onDelete = (targetId) => {
    const result = todos.filter((todo) => todo.id !== targetId);
    setTodos(result);
  };

  return (
    <div className="App">
      <Exam />
      {/* <Header />
      <Editer onCreate={onCreate} />
      <List todos={todos} onUpdate={refactoringOnUpdate} onDelete={onDelete} /> */}
    </div>
  );
};

export default App;
