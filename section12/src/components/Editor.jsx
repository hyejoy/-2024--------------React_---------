import './Editor.css';
import EmotionItem from './EmotionItem';
import Button from './Button';

const emotionList = [
  {emotionId: 1, emotionName: '완전좋음'},
  {emotionId: 2, emotionName: '좋음'},
  {emotionId: 3, emotionName: '그럭저럭'},
  {emotionId: 4, emotionName: '나쁨'},
  {emotionId: 5, emotionName: '끔찍함'},
];

const Editor = () => {
  const emotionId = 2;
  return (
    <div className="Editor">
      <section>
        <h4>오늘의 날짜</h4>
      </section>
      <section className="date_section">
        <input type="date" />
      </section>
      <section className="emotion_secton">
        <h4>오늘의 감정</h4>
        <section className="emotion_list_wrapper">
          {emotionList.map(item => (
            <EmotionItem
              key={item.emotionId}
              emotionId={item.emotionId}
              emotionName={item.emotionName}
              isSelected={item.emotionId === emotionId}
            />
          ))}
        </section>
      </section>
      <section className="content_section">
        <h4>오늘의 일기</h4>
        <textarea placeholder="오늘은 어땠나요?" />
      </section>
      <section className="button_section">
        <Button text={'취소하기'} />
        <Button text={'작성완료'} type={'POSITIVE'} />
      </section>
    </div>
  );
};

export default Editor;
