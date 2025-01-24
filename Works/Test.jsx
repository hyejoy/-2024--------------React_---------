import oldDatas from '../../JSON/old.json';
import newDatas from '../../JSON/new.json';

const keyField = 'PlanDetail.Id';
function getValueByPath(obj, path) {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

function compareJSON(original, updated, keyValue, path = '') {
  const differences = [];

  // 객체인 경우에만 비교
  if (
    typeof original === 'object' &&
    original !== null &&
    typeof updated === 'object' &&
    updated !== null
  ) {
    // 모든 키에 대해 반복
    Object.keys(original).forEach(key => {
      const currentPath = path ? `${path}.${key}` : key;

      // 값이 다른 경우
      if (JSON.stringify(original[key]) !== JSON.stringify(updated[key])) {
        // 객체인 경우 재귀적으로 비교
        if (
          typeof original[key] === 'object' &&
          original[key] !== null &&
          typeof updated[key] === 'object' &&
          updated[key] !== null
        ) {
          differences.push(
            ...compareJSON(original[key], updated[key], keyValue, currentPath),
          );
        } else {
          // 단순 값인 경우 차이점 기록
          differences.push({
            key: keyValue,
            keyField: keyField,
            path: currentPath,
            oldValue: original[key],
            newValue: updated[key],
          });
        }
      }
    });
  }

  return differences;
}
const Test = () => {
  let logList = [];
  // 공통 정렬 함수

  newDatas.forEach(newData => {
    let newDatasPlanDetailId = getValueByPath(newData, keyField);

    console.log('💟💟💟💟', newDatasPlanDetailId);
    const beforeData = oldDatas.filter(
      old => getValueByPath(old, keyField) === newDatasPlanDetailId,
    );

    if (!beforeData.length) {
      console.log('새로추가됨');
      console.log(newData);
    }
    const changes = compareJSON(...beforeData, newData, newDatasPlanDetailId);

    console.log('⚠', changes);
  });

  // 변경사항 출력

  return <div>TEST</div>;
};

export default Test;
