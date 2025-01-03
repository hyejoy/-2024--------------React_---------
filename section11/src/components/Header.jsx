import './Header.css';
import {memo} from 'react';

const Header = () => {
  return (
    <div className="Header">
      <h3> 오늘은 😎</h3>
      <h1>{new Date().toDateString()}</h1>
    </div>
  );
};

/**
 * memo 메소드는 인수로 받은 Header 컴포넌트를 props 가 변경되지 않았을때에는
 * 리랜더링 하지않도록 최적화하여 반환해준다.
 * 반환값을 변수에 저장한다음에 export문에서 메모이즈된 컴포넌트를 내보내면 된다.
 */
const memoizedHeader = memo(Header);

// export default Header;
// export default memo(Header);
export default memoizedHeader;
