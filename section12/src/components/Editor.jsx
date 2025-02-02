import './Editor.css';
import EmotionItem from './EmotionItem';
import Button from './Button';
import {useState, useContext, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

const emotionList = [
  {emotionId: 1, emotionName: '완전좋음'},
  {emotionId: 2, emotionName: '좋음'},
  {emotionId: 3, emotionName: '그럭저럭'},
  {emotionId: 4, emotionName: '나쁨'},
  {emotionId: 5, emotionName: '끔찍함'},
];

const getStringDate = targetDate => {
  // 날짜 YYYY-MM-DD
  let year = targetDate.getFullYear();
  let month = targetDate.getMonth() + 1;
  let day = targetDate.getDate().toString();

  if (month < 10) {
    month = `0${month}`;
  }

  if (day < 10) {
    day = `0${day}`;
  }

  return `${year}-${month}-${day}`;
};

const Editor = ({onSubmit, initData}) => {
  const nav = useNavigate();
  const [input, setInput] = useState({
    createdDate: new Date(),
    emotionId: 1,
    content: '',
  });

  useEffect(() => {
    if (initData) {
      setInput({
        ...initData,
        createdDate: new Date(initData.createdDate),
      });
    }
  }, [initData]);

  const onChangeInput = e => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === 'createdDate') {
      value = new Date(value);
      setInput({
        ...input,
        [name]: value,
      });
    }
    // 날짜 외 설정
    setInput({
      ...input,
      [name]: value,
    });
  };

  const onClickSubmitButton = () => {
    onSubmit(input);
  };

  return (
    <div className="Editor">
      <section>
        <h4>오늘의 날짜</h4>
      </section>
      <section className="date_section">
        <input
          name="createdDate"
          type="date"
          value={getStringDate(input.createdDate)}
          onChange={onChangeInput}
        />
      </section>
      <section className="emotion_secton">
        <h4>오늘의 감정</h4>
        <section className="emotion_list_wrapper">
          {emotionList.map(item => (
            <EmotionItem
              key={item.emotionId}
              emotionId={item.emotionId}
              emotionName={item.emotionName}
              isSelected={item.emotionId === input.emotionId}
              onClick={() => {
                onChangeInput({
                  target: {
                    name: 'emotionId',
                    value: item.emotionId,
                  },
                });
              }}
            />
          ))}
        </section>
      </section>
      <section className="content_section">
        <h4>오늘의 일기</h4>
        <textarea
          placeholder="오늘은 어땠나요?"
          name="content"
          value={input.content}
          onChange={onChangeInput}
        />
      </section>
      <section className="button_section">
        <Button text={'취소하기'} onClick={() => nav(-1)} />
        <Button
          text={'작성완료'}
          type={'POSITIVE'}
          onClick={onClickSubmitButton}
        />
      </section>
    </div>
  );
};

export default Editor;
