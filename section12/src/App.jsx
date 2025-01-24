import './App.css';
import {Routes, Route, Link, useNavigate} from 'react-router-dom';
import Home from './pages/Home';
import Diary from './pages/Diary';
import New from './pages/New';
import NotFound from './pages/NotFound';
import Test from './pages/Test';
import Button from './components/Button';
import Header from './components/Header';
import {getEmotionImage} from './util/get-emotion-image';

/**
 *
 * 1. "/" : 모든 일기를 조회하는 Home 페이지
 * 2. "/new" : 새로운 일기를 작성하는 New 페이지
 * 3. "/diary" : 일기를 상세히 조회하는 Diary 페이지
 */
function App() {
  const nav = useNavigate();

  const onClickButton = () => {
    nav('/new');
  };
  return (
    <>
      <Header
        title={'Header'}
        leftChild={<Button text={'left'} />}
        rightChild={<Button text={'right'} />}
      />
      <Button
        text={'버튼'}
        onClick={() => {
          console.log('click!');
        }}
      />
      <Button
        text={'버튼'}
        type={'POSITIVE'}
        onClick={() => {
          console.log('click!');
        }}
      />
      <Button
        text={'버튼'}
        type={'NEGATIVE'}
        onClick={() => {
          console.log('click!');
        }}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<New />} />
        <Route path="/diary/:id" element={<Diary />} />
        <Route path="/Test" element={<Test />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
