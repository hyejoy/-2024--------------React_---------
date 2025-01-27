import Header from '../components/Header';
import Button from '../components/Button';
import DiaryList from '../components/Diarylist';

const Home = () => {
  return (
    <div>
      <Header
        title={'2025년 1월 27일'}
        leftChild={<Button text={'<'} />}
        rightChild={<Button text={'>'} />}
      />
      <DiaryList />
    </div>
  );
};

export default Home;
