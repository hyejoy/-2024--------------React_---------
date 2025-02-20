import {useContext, useEffect, useState} from 'react';
import {DiaryStateContext} from '../App';
import {useNavigate} from 'react-router-dom';

const useDiary = id => {
  const data = useContext(DiaryStateContext);
  const [curDiary, setCurDiary] = useState();
  const nav = useNavigate();

  useEffect(() => {
    const currentDiaryItem = data.find(item => String(item.id) === String(id));

    console.log('diary Object ', currentDiaryItem);

    if (!currentDiaryItem) {
      window.alert('존재하지 않는 일기입니다.');
      nav('/', {replace: true});
    }

    /**
     * useEffect가 실행되고 나서야 값이 저장되는데
     * ⭐⭐useEffect는 컴포넌트가 랜더링된 이후에만 실행되기 때문에
     * 최초로 호출되었을때는 undefined가 반환됨
     */
    setCurDiary(currentDiaryItem);
  }, [id]);
  return curDiary;
};
export default useDiary;
