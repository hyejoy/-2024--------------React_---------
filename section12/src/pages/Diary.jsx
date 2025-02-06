import Header from '../components/Header';
import Button from '../components/Button';
import {useParams} from 'react-router-dom';
import {getEmotionImage} from '../util/get-emotion-image.js';

const Diary = () => {
  /** url의 파라미터의 값을 가져오는 custom hook
   * 예시 http://localhost:5173/diary/100
   */
  const id = useParams().id;

  return (
    <div>
      <Header
        title={' yyyy mm dd'}
        leftChild={<Button text={'< 뒤로가기'} />}
        rightChild={<Button text={'수정하기'} />}
      />
      <h4>오늘의 일기</h4>
      <section>
        <img src={getEmotionImage(2)} />
      </section>
    </div>
  );
};

export default Diary;
