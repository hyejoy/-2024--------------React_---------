import './List.css';
import {useEffect, useState, useMemo} from 'react';
import TodoItem from './TodoItem';

const List = ({todos, onUpdate, onDelete}) => {
  const [search, setSearch] = useState('');

  const onChangeSearch = e => {
    setSearch(e.target.value);
  };

  const getFilteredData = () => {
    if (search === '') {
      return todos;
    }
    // 소문자로 변환하여 검색하기
    return todos.filter(todo =>
      todo.content.toLowerCase().includes(search.toLowerCase()),
    );
  };

  const filterdTodos = getFilteredData();

  /**
   * 의존성배열 : deps
   * deps가 변경될때만 첫번째 인수로 전달한 콜백함수를 다시 실행한다.
   * 콜백함수가 반환하는 값을 useMemo는 다시 반환해준다.
   * 따라서, Todo 검색할때는 todos의 값이 바뀌지않기때문에 메모이제이션된 값을 보여준다.
   */
  const {totalCount, doneCount, notDoneCount} = useMemo(() => {
    console.log('getAnalyzedData 호출💗');
    const totalCount = todos.length;
    const doneCount = todos.filter(item => item.isDone).length;

    const notDoneCount = totalCount - doneCount;

    return {
      totalCount,
      doneCount,
      notDoneCount,
    };
  }, [todos]);

  return (
    <div className="List">
      <h4>Todo List 🌼</h4>
      <div>total: {totalCount}</div>
      <div>done: {doneCount}</div>
      <div>notDone: {notDoneCount}</div>
      <input
        type="text"
        placeholder="검색어를 입력해주세요."
        value={search}
        onChange={onChangeSearch}
      />
      <div className="todos_wrapper">
        {filterdTodos.map(todo => {
          return (
            <TodoItem
              key={todo.id}
              {...todo}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          );
        })}
      </div>
    </div>
  );
};

export default List;
