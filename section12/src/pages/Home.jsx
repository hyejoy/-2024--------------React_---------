import {useSearchParams} from 'react-router-dom';

const Home = () => {
  /** Query String 가져오는 방법
   * 예시 http://localhost:5173/?value=hello&name=hyejo
   */
  const [params, setParams] = useSearchParams();
  console.log(params);
  console.log(params.get('value'));
  console.log(params.get('name'));

  return <div>home</div>;
};

export default Home;
