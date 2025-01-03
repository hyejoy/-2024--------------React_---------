import './TodoItem.css';
import {memo} from 'react';

const TodoItem = ({id, isDone, content, date, onUpdate, onDelete}) => {
  return (
    <div className="TodoItem">
      <input
        type="checkbox"
        checked={isDone}
        onChange={() => {
          onUpdate(id);
        }}
      />
      <div className="content">{content}</div>
      <div className="date">{new Date(date).toLocaleString()}</div>
      <button onClick={() => onDelete(id)}>삭제</button>
    </div>
  );
};

export default memo(TodoItem);

// 고차 컴포넌트(HOC) : 컴포넌트를 인수로 받아 해당컴포넌트의 최적화나 메모이제이션가틍ㄴ
// 추가적인 기능이 추가된 컴포넌트를 반환하는 메모와같은 메소드
// export default memo(TodoItem, (prevProps, nextProps) => {
//   // 반환값에 따라, Props가 바뀌었는지 안바뀌었는지 판단 [얕은비교로 판단]
//   // True -> Props 바뀌지 않음 => 리랜더링 X
//   // False -> Props 바뀜 => 리랜더링 O

//   // 리랜더링 O
//   if (prevProps.id !== nextProps.id) return false;
//   if (prevProps.isDone !== nextProps.isDone) return false;
//   if (prevProps.content !== nextProps.content) return false;
//   if (prevProps.date !== nextProps.date) return false;

//   // 나머지는 리랜더링 X
//   // 따라서 onCreate 함수와 onUpdate 함수가 같으면, 리랜더링하지않음
//   return true;
// });
