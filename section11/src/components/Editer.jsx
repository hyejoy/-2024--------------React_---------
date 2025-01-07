import './Editer.css';
import {useState, useRef, useContext} from 'react';
import {TodoDispatchContext} from '../App';

const Editer = () => {
  /**
   * useContext hook은 인수로 전달된 context로부터
   * 공급된 데이터를 반환 해주는 함수이다.
   */
  const {onCreate} = useContext(TodoDispatchContext);

  const [content, setContent] = useState('');
  const contentRef = useRef();

  const onChangeContent = e => {
    setContent(e.target.value);
  };

  const onSubmit = () => {
    if (content === '') {
      // 빈문자열이라면 focus 후 return
      contentRef.current.focus();
      return;
    }
    onCreate(content);
    // 새로운 데이터 추가후 초기화
    setContent('');
  };

  /**Enter 키 작동 */
  const onKeyDown = e => {
    if (e.keyCode === 13) {
      onSubmit();
    }
  };

  return (
    <div className="Editer">
      <input
        ref={contentRef}
        value={content}
        onChange={onChangeContent}
        onKeyDown={onKeyDown}
        type="text"
        placeholder="새로운 TO DO..."
      />
      <button onClick={onSubmit}>추가</button>
    </div>
  );
};

export default Editer;
