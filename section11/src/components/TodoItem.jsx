import './TodoItem.css';
import {memo, useCallback, useContext, useMemo} from 'react';
import {TodoContext} from '../App';
import dayjs from 'dayjs';

const TodoItem = ({id, isDone, content, date}) => {
  const dayjsDate = useMemo(() => {
    return dayjs(date).format('YY년MM월DD일');
  }, [date]);

  const {onUpdate, onDelete} = useContext(TodoContext);

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
      <div className="date">{dayjsDate}</div>
      <button onClick={() => onDelete(id)}>삭제</button>
    </div>
  );
};

/**
 * memo 메소드는 인수로 받은 컴포넌트를 props 가 변경되지 않았을때에는
 * 리랜더링 하지않도록 최적화하여 반환해준다.
 * export문에서 메모이즈된 컴포넌트를 내보내면 된다.
 */
export default memo(TodoItem);
