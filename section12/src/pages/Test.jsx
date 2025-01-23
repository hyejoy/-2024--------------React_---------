import oldData from '../../JSON/old.json';
import newData from '../../JSON/new.json';
import {useEffect} from 'react';

const Test = () => {
  // 공통 정렬 함수
  const keyField = 'PlanDetail.Id';
  const sortByPlanDetailId = data => {
    return data.sort((a, b) => a.PlanDetail.Id - b.PlanDetail.Id);
  };

  // 정렬 수행
  const sortedOldData = sortByPlanDetailId(oldData);
  const sortedNewData = sortByPlanDetailId(newData);

  console.log('Sort_old🚓: ', sortedOldData);
  console.log('Sort_new🚓: ', sortedNewData);

  Object.keys(sortedNewData).forEach(key => {
    console.log(key);
  });

  for (let key in sortedNewData) {
    const value = sortedNewData[key];
    const test = value[keyField].Id; // PlanDetail 객체

    console.log(test);
  }

  return <div>TEST</div>;
};

export default Test;
