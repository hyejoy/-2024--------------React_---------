import {useParams} from 'react-router-dom';

const Diary = () => {
  /** url의 파라미터의 값을 가져오는 custom hook
   * 예시 http://localhost:5173/diary/100
   */
  const params = useParams();
  console.log(params);

  return <div>{`${params.id}번 일기 입니다.`}</div>;
};

export default Diary;
