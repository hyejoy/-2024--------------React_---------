import './App.css';
import {useState, useRef, useReducer, useCallback, createContext} from 'react';
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

/** context는 보통 컴포넌트 외부에 선언하게 됨,
 * 왜냐면 App 컴포넌트 안쪽에서 context객체를 생성하게 되면, App 컴포넌트가 리랜더링 될때마다
 * 새로운 Context를 계속해서 생성하기 때문이다.
 *
 * ✅ Context안에 Provider 프로퍼티만 제대로 알아두면 된다
 * Provider는 context가 제공할 데이터를 설정하거나, context 데이터를 공급받을 컴포넌트를 설정하기위해
 * 사용하는 프로퍼티로, 사실 컴포넌트에 해당한다.
 * 따라서 <TodoContext.Provier/> 로 랜더링 시켜줄수 있음
 */
export const TodoContext = createContext();

const App = () => {
  console.log(TodoContext);

  const [todos, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(3);

  const onCreate = useCallback(content => {
    dispatch({
      type: 'CREATE',
      data: {
        id: idRef.current++,
        isDone: false,
        content: content,
        date: new Date().getTime(),
      },
    });
  }, []);

  const onUpdate = useCallback(targetId => {
    dispatch({
      type: 'UPDATE',
      targetId: targetId,
    });
  }, []);

  const onDelete = useCallback(targetId => {
    dispatch({
      type: 'DELETE',
      targetId,
    });
  }, []);

  return (
    <div className="App">
      <Header />
      {/* Provider 안에있는 모든 컴포넌트들은 전부다 ToodoContext의 데이터를 공급받을 수 있다. 
        공급받는 데이터는 Provider의 value속성값으로 전달해주면 된다.
      */}
      <TodoContext.Provider
        value={{
          todos,
          onCreate,
          onUpdate,
          onDelete,
        }}
      >
        <Editer />
        <List />
      </TodoContext.Provider>
    </div>
  );
};

export default App;
