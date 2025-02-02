import './App.css';
import {useReducer, useRef, createContext} from 'react';
import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Diary from './pages/Diary';
import New from './pages/New';
import NotFound from './pages/NotFound';
import Edit from './pages/Edit';

const mockData = [
  {
    id: 1,
    createdDate: new Date('2025-01-28').getTime(),
    emotionId: 3,
    content: '1번 일기 내용',
  },
  {
    id: 2,
    createdDate: new Date('2025-01-27').getTime(),
    emotionId: 2,
    content: '2번 일기 내용',
  },
  {
    id: 3,
    createdDate: new Date('2024-12-25').getTime(),
    emotionId: 1,
    content: '민재 생일!',
  },
  {
    id: 4,
    createdDate: new Date('2025-01-30').getTime(),
    emotionId: 1,
    content: '여수 다녀온날 🐾',
  },
  {
    id: 5,
    createdDate: new Date('2025-02-01').getTime(),
    emotionId: 1,
    content: '밍쿠리 만난날 ❤❤❤ 너무 즐거웟어요!',
  },
];

function reducer(state, action) {
  console.log(action);
  switch (action.type) {
    case 'CREATE':
      return [...state, action.data];
    case 'UPDATE':
      return state.map(item =>
        String(item.id) == String(action.data.id) ? action.data : item,
      );
    case 'DELETE':
      return state.filter(item => String(item.id) !== String(action.id));
    default:
      return state;
  }
}

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(5);

  // 새로운 일기 추가
  const onCreate = (createdDate, emotionId, content) => {
    dispatch({
      type: 'CREATE',
      data: {
        id: ++idRef.current,
        createdDate,
        emotionId,
        content,
      },
    });
  };

  // 기존 일기 수정
  const onUpdate = (id, createdDate, emotionId, content) => {
    dispatch({
      type: 'UPDATE',
      data: {
        id,
        createdDate,
        emotionId,
        content,
      },
    });
  };

  // 기존 일기 삭제
  const onDelete = id => {
    dispatch({
      type: 'DELETE',
      id,
    });
  };

  return (
    <>
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider value={{onCreate, onUpdate, onDelete}}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<New />} />
            <Route path="/diary/:id" element={<Diary />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </>
  );
}

export default App;
