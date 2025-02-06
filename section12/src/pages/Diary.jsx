import {useParams} from 'react-router-dom';
import Header from '../components/Header';
import Button from '../components/Button';
import {getEmotionImage} from '../util/get-emotion-image';

const Diary = () => {
  /** url의 파라미터의 값을 가져오는 custom hook
   * 예시 http://localhost:5173/diary/100
   */
  const params = useParams();
  const id = params.id;

  return (
    <div>
      <Header
        title={'yyyy--mm--dd 기록록'}
        leftChild={<Button text={'< 뒤로 가기'} />}
        rightChild={<Button text={'수정하기'} />}
      />
      <section>
        <h4>오늘의 감정</h4>
        <section>{getEmotionImage(id)}</section>
      </section>
    </div>
  );
};

export default Diary;
