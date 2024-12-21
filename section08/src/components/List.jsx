import "./List.css";
import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";

const List = ({ todos, onUpdate }) => {
  const [search, setSearch] = useState("");

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  /**
   * 🙄 실수
   * 이 코드는 콜백 함수 내부에서
   * todo.content.includes(search)를 실행하지만,
   * 아무 값도 반환하지 않습니다.
   * 화살표 함수에서 중괄호 {}를 사용하면 명시적으로
   * return을 작성해야 값이 반환됩니다.
   * 🧐 중괄호를 사용하면 명시적으로 return을 작성해야 값이 반환된다.
   */

  const mistake = () => {
    return todos.filter((todo) => {
      todo.content.includes(search); // 아무값도 반환하지않음
    });
  };

  const correctAnswer_1 = () => {
    return todos.filter((todo) => {
      return todo.content.includes(search); // {}를 사용하면 명시적으로 return 작성해야함
    });
  };

  const correctAnswer_2 = () => {
    return todos.filter((todo) => todo.content.includes(search)); // 중괄호 사용하지않으면 return 적지않아도됨
  };

  const getFilteredData = () => {
    if (search === "") {
      return todos;
    }
    // 소문자로 변환하여 검색하기
    return todos.filter((todo) =>
      todo.content.toLowerCase().includes(search.toLowerCase())
    );
  };

  const filterdTodos = getFilteredData();

  return (
    <div className="List">
      <h4>Todo List 🌼</h4>
      <input
        type="text"
        placeholder="검색어를 입력해주세요."
        value={search}
        onChange={onChangeSearch}
      />
      <div className="todos_wrapper">
        {/* React에서는 내부적으로 리스트형태로 랜더링되는 컴포넌트나 
        어떤요소들을 구분할 때 각각의 요소를 key라는 값을 통해 구분하게됨
         */}
        {filterdTodos.map((todo) => {
          return <TodoItem key={todo.id} {...todo} onUpdate={onUpdate} />;
        })}
      </div>
    </div>
  );
};

export default List;
