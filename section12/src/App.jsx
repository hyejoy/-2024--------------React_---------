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
    createDate: new Date().getTime(),
    emotionId: 1,
    content: '1번 일기 내용',
  },
  {
    id: 2,
    createDate: new Date().getTime(),
    emotionId: 2,
    content: '2번 일기 내용',
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

const DiaryStateContext = createContext();
const DiarayDispatchContext = createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(3);

  // 새로운 일기 추가
  const onCreate = (createDate, emotionId, content) => {
    dispatch({
      type: 'CREATE',
      data: {
        id: idRef.current++,
        createDate,
        emotionId,
        content,
      },
    });
  };

  // 기존 일기 수정
  const onUpdate = (id, createDate, emotionId, content) => {
    dispatch({
      type: 'UPDATE',
      data: {
        id,
        createDate,
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
      <button
        onClick={() => {
          onCreate(new Date().getTime(), 3, 'DD');
        }}
      >
        일기추가 테스트
      </button>
      <button
        onClick={() => {
          onUpdate(1, new Date().getTime(), 3, '수정된 일기입니다.');
        }}
      >
        일기추가 업데이트 테스트
      </button>
      <button
        onClick={() => {
          onDelete(1);
        }}
      >
        일기삭제 테스트
      </button>
      <DiaryStateContext.Provider value={data}>
        <DiarayDispatchContext.Provider value={{onCreate, onUpdate, onDelete}}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<New />} />
            <Route path="/diary/:id" element={<Diary />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </DiarayDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </>
  );
}

export default App;
