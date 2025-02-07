import Header from '../components/Header';
import Button from '../components/Button';
import {useParams, useNavigate} from 'react-router-dom';
import {getEmotionImage} from '../util/get-emotion-image.js';
import {formatedDate} from '../util/get-format-date.js';
import {useContext, useEffect, useState} from 'react';
import {DiaryStateContext} from '../App.jsx';

const Diary = () => {
  /** url의 파라미터의 값을 가져오는 custom hook
   * 예시 http://localhost:5173/diary/100
   */
  const params = useParams();
  const nav = useNavigate();
  const data = useContext(DiaryStateContext);
  const [todayDiary, setTodayDiary] = useState();

  useEffect(() => {
    const currentDiaryItem = data.find(
      item => String(item.id) === String(params.id),
    );

    console.log('diary Object ', currentDiaryItem);

    if (!currentDiaryItem) {
      window.alert('존재하지 않는 일기입니다.');
      nav('/', {replace: true});
    }
    setTodayDiary(currentDiaryItem);
  }, [params.id]);

  return (
    <div>
      <Header
        title={formatedDate(
          new Date(todayDiary?.createdDate).toLocaleDateString(),
        )}
        leftChild={
          <Button
            text={'< 뒤로가기'}
            onClick={() => {
              nav(-1);
            }}
          />
        }
        rightChild={
          <Button
            text={'수정하기'}
            onClick={() => {
              nav(`/Edit/${params.id}`);
            }}
          />
        }
      />
      <h4>오늘의 일기</h4>
      <section>
        <img src={getEmotionImage(todayDiary?.emotionId)} />
      </section>
      <h4>오늘의 일기 내용</h4>
      <section>
        <div>{todayDiary?.content}</div>
      </section>
    </div>
  );
};

export default Diary;
