import './App.css';
import {useState, useRef, useReducer} from 'react';
import Header from './components/Header';
import Editer from './components/Editer';
import List from './components/List';

const mockData = [
  {
    id: 0,
    isDone: false,
    content: '이직 준비하기',
    date: new Date().getTime(),
  },
  {
    id: 1,
    isDone: false,
    content: 'React 공부하기',
    date: new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    content: '운동하기',
    date: new Date().getTime(),
  },
];

function reducer(state, action) {
  switch (action.type) {
    case 'CREATE':
      return [action.data, ...state];
    case 'UPDATE':
      return state.map(item =>
        item.id === action.targetId ? {...item, isDone: !item.isDone} : item,
      );
    case 'DELETE':
      return state.filter(item => item.id !== action.targetId);
    default:
      return state;
  }
}

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

  /** 🧡 useReducer 이용하여 state 관리하기
   *  배열안에 객체안이 들어가는 복잡한 구조들은 보통 reducer를 사용하며 관리하는게 일반적이고
   *  간단한 상태만있다면 useState로 관리함
   */
  const [todos, dispatch] = useReducer(reducer, mockData);

  const idRef = useRef(3);

  const onCreate = content => {
    dispatch({
      type: 'CREATE',
      data: {
        id: idRef.current++,
        isDone: false,
        content: content,
        date: new Date().getTime(),
      },
    });
  };

  const onUpdate = targetId => {
    console.log(targetId);
    dispatch({
      type: 'UPDATE',
      targetId: targetId,
    });
  };

  const onDelete = targetId => {
    dispatch({
      type: 'DELETE',
      targetId,
    });
  };

  return (
    <div className="App">
      <Header />
      <Editer onCreate={onCreate} />
      <List todos={todos} onUpdate={onUpdate} onDelete={onDelete} />
    </div>
  );
};

export default App;
