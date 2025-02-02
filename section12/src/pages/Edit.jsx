import {useParams, useNavigate} from 'react-router-dom';
import Header from '../components/Header';
import Button from '../components/Button';
import Editor from '../components/Editor';
import {useContext, useEffect, useState} from 'react';
import {DiaryDispatchContext, DiaryStateContext} from '../App';

const Edit = () => {
  const {onDelete, onUpdate} = useContext(DiaryDispatchContext);
  const data = useContext(DiaryStateContext);
  const params = useParams();
  const nav = useNavigate();
  const [curDiaryItem, setCurDiaryItem] = useState();

  const onClickDelete = () => {
    if (window.confirm('일기를 삭제할건가요? 다시 복구되지 않아요!')) {
      onDelete(params.id);
      nav('/', {replace: true});
    }
    return;
  };

  const onSubmit = input => {
    if (window.confirm('일기를 수정할까요?')) {
      onUpdate(
        params.id,
        input.createdDate.getTime(),
        input.emotionId,
        input.content,
      );
      nav('/', {replace: true});
    }
  };

  useEffect(() => {
    const currentDiaryItem = data.find(
      item => String(item.id) === String(params.id),
    );

    if (!currentDiaryItem) {
      window.alert('존재하지 않는 일기입니다.');
      nav('/', {replace: true});
    }
    setCurDiaryItem(currentDiaryItem);
  }, [params.id]);

  return (
    <div>
      <Header
        title={'일기 수정하기'}
        leftChild={
          <Button
            text={'< 뒤로 가기'}
            onClick={() => {
              nav(-1);
            }}
          />
        }
        rightChild={
          <Button onClick={onClickDelete} text={'삭제하기'} type={'NEGATIVE'} />
        }
      />
      <Editor onSubmit={onSubmit} initData={curDiaryItem} />
    </div>
  );
};

export default Edit;
