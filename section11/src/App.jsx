import './App.css';
import {
  useState,
  useRef,
  useReducer,
  useCallback,
  createContext,
  useMemo,
} from 'react';
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

export const TodoStateContext = createContext(); // ⭐변화하는 context
export const TodoDispatchContext = createContext(); // ⭐변화하지 않는 context

const App = () => {
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

  //
  /**
   * ⭐ DispatchContext로 공급하는일은 어떤상황이든 변경되지않음
   * 🤔 useMemo사용안하고 <TodoDispatchContext.Provider value={{onCreate, onUpdate...}}>
   * 사용하면 되지않나?
   * => React의 Provider는 value로 전달된 객체의 참조값이 변경되었는지를 기준으로 하위 컴포넌트를 리렌더링할지를 결정한다.
   *  value로 { onCreate, onUpdate, onDelete }라는 객체를 생성해 전달한다. 따라서 매 렌더링마다 새로운 객체로 생성되기 때문에, 참조값이 매번 바뀌게 된다.
   * ⚠ onCreate, onUpdate, onDelete는 useCallback사용으로 참조값은 같지만, 객체를 담고있는 value의 값이 매 랜더링마다 새로운 객체로 생성됨
   * 따라서 React에서는 Context.Provider의 value가 같은 참조값을 유지하고 있을 때만 하위 컴포넌트를 리렌더링하지 않는다.
   * 객체를 매번 새로 생성하면, 하위 컴포넌트들은 useContext를 통해 동일한 값을 받더라도 리렌더링된다.
   * 그렇기때문에 객체가 매번 새로 생성되지 않도록 메모이제이션해야 한다.
   * memo를 사용하면 value로 전달된 객체의 참조값이 유지되어 불필요한 리렌더링을 방지할 수 있다
   */
  const memoizedDispatch = useMemo(() => {
    return {onCreate, onUpdate, onDelete};
  }, [onCreate, onUpdate, onDelete]);

  return (
    <div className="App">
      <Header />
      {/* Provider 안에있는 모든 컴포넌트들은 전부다 해당 Context의 데이터를 공급받을 수 있다. 
        ⭐ 공급받는 데이터는 Provider의 value속성값으로 전달해주면 된다.
        ⭐ 참고 : value={todos}는 객체를 담은게 아니라, 배열을 담았다 생각해야함
        따라서 useContext(TodoStateContext) 으로 받는값은 구조분해할당으로 받지않아야한다. => List 8번째줄 참고
        */}
      <TodoStateContext.Provider value={todos}>
        <TodoDispatchContext.Provider value={memoizedDispatch}>
          <Editer />
          <List />
        </TodoDispatchContext.Provider>
      </TodoStateContext.Provider>
    </div>
  );
};

export default App;
