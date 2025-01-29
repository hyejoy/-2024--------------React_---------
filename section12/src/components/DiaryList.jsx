import './DiaryList.css';
import Button from './Button';
import DiaryItem from './DiaryItem';
import {useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';

const DiaryList = ({data}) => {
  const nav = useNavigate();
  const [sortType, setSortType] = useState('latest');
  const onChangeSortType = e => {
    setSortType(e.target.value);
  };

  const getSortedDate = () => {
    return data.toSorted((a, b) => {
      if (sortType === 'oldest') {
        return Number(a.createDate) - Number(b.createDate);
      } else {
        return Number(b.createDate) - Number(a.createDate);
      }
    });
  };

  const sortedDate = getSortedDate();

  return (
    <div className="DiaryList">
      <div className="menu_bar">
        <select onChange={onChangeSortType}>
          <option value={'latest'}>최신순</option>
          <option value={'oldest'}>오래된 순</option>
        </select>
        <Button
          text={'새 일기 쓰기'}
          type={'POSITIVE'}
          onClick={() => {
            nav('/new');
          }}
        />
      </div>
      <div className="list_wrapper">
        {sortedDate.map(item => (
          <DiaryItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};
export default DiaryList;
