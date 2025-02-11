import Header from '../components/Header';
import Button from '../components/Button';
import Viewer from '../components/Viewer';
import {useParams, useNavigate} from 'react-router-dom';
import {formatedDate} from '../util/get-format-date.js';
import useDiary from '../hooks/useDiary.jsx';
import usePageTitle from '../hooks/usePageTitle';

const Diary = () => {
  /** url의 파라미터의 값을 가져오는 custom hook
   * 예시 http://localhost:5173/diary/100
   */
  const params = useParams();
  const nav = useNavigate();
  const curDiaryItem = useDiary(params.id);

  usePageTitle(`${params.id}번 일기`);

  if (!curDiaryItem) {
    return <div>데이터 로딩중..~</div>;
  }
  // useEffect의 첫번째 반환값이 undefined이므로 반환이 제대로 됏을때
  // 구조분해 할당으로 데이터 할당하기
  const {createdDate, emotionId, content} = curDiaryItem;

  return (
    <div>
      <Header
        title={formatedDate(new Date(createdDate).toLocaleDateString())}
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
      <Viewer emotionId={emotionId} content={content} />
    </div>
  );
};

export default Diary;
