import oldData from '../../JSON/old.json';
import newData from '../../JSON/new.json';
import structure from '../../JSON/structure.json';
import {useEffect} from 'react';

const Test = () => {
  const keyField = 'PlanDetail.Id';
  const keyFieldArray = keyField.split('.'); // ['PlanDetail', 'Id']

  let addedList = '';
  let removedList = '';
  let updatedList = '';

  // 특정 경로의 값을 가져오는 함수
  const getValueByPath = (obj, pathArray) => {
    return pathArray.reduce((acc, key) => acc?.[key], obj);
  };

  // 변경된 데이터 찾는 함수
  const getUpdatedData = (oldData, newData, uniqueKeyArray) => {
    const oldMap = new Map(
      oldData.map(item => [getValueByPath(item, uniqueKeyArray), item]),
    );
    const newMap = new Map(
      newData.map(item => [getValueByPath(item, uniqueKeyArray), item]),
    );

    console.log(oldMap);

    const changes = [];

    newMap.forEach((newItem, key) => {
      if (!oldMap.has(key)) {
        changes.push({type: 'added', data: newItem});
      } else {
        const oldItem = oldMap.get(key);
        const diff = getDifference(oldItem, newItem, structure);
        if (Object.keys(diff).length > 0) {
          changes.push({type: 'updated', id: key, changes: diff});
        }
      }
    });

    oldMap.forEach((_, key) => {
      if (!newMap.has(key)) {
        changes.push({type: 'removed', id: key});
      }
    });

    return changes;
  };

  // 객체 차이점 찾기 함수 (structure를 기준으로 필터링)
  const getDifference = (oldObj, newObj, structure) => {
    const diff = {};

    Object.keys(newObj).forEach(key => {
      if (!(key in structure)) return; // 구조에 없는 값 무시
      if (structure[key] === '') return; // ""로 설정된 항목 제외

      if (typeof newObj[key] === 'object' && newObj[key] !== null) {
        const nestedDiff = getDifference(
          oldObj[key] || {},
          newObj[key],
          structure[key],
        );
        if (Object.keys(nestedDiff).length > 0) {
          diff[key] = nestedDiff;
        }
      } else if (newObj[key] !== oldObj[key]) {
        diff[key] = {
          oldValue: oldObj[key],
          newValue: newObj[key],
          label: structure[key],
        };
      }
    });

    return diff;
  };

  // 변경된 내용을 사용자 친화적인 문장으로 변환
  const formatChanges = changes => {
    return changes
      .map(change => {
        if (change.type === 'updated') {
          const {id, changes} = change;
          let logMessage = `id: ${id}번의 안건내용 변경\n`;

          const traverseChanges = (obj, prefix = '') => {
            return Object.keys(obj)
              .map(key => {
                if (
                  typeof obj[key] === 'object' &&
                  obj[key].oldValue === undefined
                ) {
                  return traverseChanges(obj[key], prefix);
                } else {
                  const oldVal =
                    obj[key].oldValue === '' ? '""' : obj[key].oldValue;
                  return `[${obj[key].label}] ${oldVal} → ${obj[key].newValue}`;
                }
              })
              .flat();
          };

          logMessage += traverseChanges(changes).join('\n');
          updatedList += `${logMessage}\n\n`;
          return logMessage;
        } else if (change.type === 'added') {
          let logMessage = `${change.id}번의 안건내용 추가됨\n`;
          addedList += `${logMessage}\n\n`;
          return logMessage;
        } else if (change.type === 'removed') {
          let logMessage = `${change.id}번의 안건내용 삭제됨\n`;
          removedList += `${logMessage}\n\n`;
          return logMessage;
        }
        return '';
      })
      .filter(log => log !== '')
      .join('\n\n');
  };

  useEffect(() => {
    const changes = getUpdatedData(oldData, newData, keyFieldArray);
    console.log('🔄 변경된 데이터 로그:', formatChanges(changes));
    console.log('📢ADD ++++', addedList);
    console.log('🗝️UPDATE!', updatedList);
    console.log('⚠️ REMOVE ---', removedList);
  }, []);

  return <div>TEST</div>;
};

export default Test;
