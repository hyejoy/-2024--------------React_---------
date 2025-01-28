import Header from '../components/Header';
import Button from '../components/Button';
import DiaryList from '../components/Diarylist';
import {useState, useContext} from 'react';
import {DiaryStateContext} from '../App';

const getMonthlyData = (pivotDate, data) => {
  // 해당년도 월의 1일 0시 0분 0초 가장 첫번째 시작하는 시간
  const beginTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth(),
    1,
    0,
    0,
    0,
  ).getTime();

  // 이번달 가장 마지막 시간 저장
  const endTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth() + 1,
    0,
    23,
    59,
    59,
  ).getTime();
  return data.filter(
    item => beginTime <= item.createDate && item.createDate <= endTime,
  );
};

const Home = () => {
  const data = useContext(DiaryStateContext);
  const [pivotDate, setPivotDate] = useState(new Date());

  const monthlyData = getMonthlyData(pivotDate, data);
  console.log(monthlyData);

  const onIncreseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
  };
  const onDecreseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
  };

  return (
    <div>
      <Header
        title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`}
        leftChild={<Button text={'<'} onClick={onDecreseMonth} />}
        rightChild={<Button text={'>'} onClick={onIncreseMonth} />}
      />
      <DiaryList data={monthlyData} />
    </div>
  );
};

export default Home;
