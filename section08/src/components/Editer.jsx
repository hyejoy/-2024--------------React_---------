import "./Editer.css";
import { useState, useRef } from "react";
const Editer = ({ onCreate }) => {
  const [content, setContent] = useState("");
  const contentRef = useRef();
  const onChangeContent = (e) => {
    setContent(e.target.value);
  };
  const onSubmit = () => {
    if (content === "") {
      // 빈문자열이라면 focus 후 return
      contentRef.current.focus();
      return;
    }
    onCreate(content);
    // 새로운 데이터 추가후 초기화
    setContent("");
  };

  /**Enter 키 작동 */
  const onKeyDown = (e) => {
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
