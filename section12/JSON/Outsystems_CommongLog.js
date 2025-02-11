import structure from '../../JSON/structure.json';
import oldData from './old.json';
import newData from './new.json';

const keyField = 'PlanDetail.Id';
const keyFieldArray = keyField.split('.'); // ['PlanDetail', 'Id']

// 추가 , 삭제, 수정 리스트
let addedList = '';
let removedList = '';
let updatedList = '';

// 특정 경로의 값을 가져오는 함수 _ PlanDetail.id의 값을 가져오기위한 함수
const getValueByPath = (obj, pathArray) => {
  // acc(누적값)가 객체에서 해당 키(key)를 통해 다음 깊이로 이동.
  // ?.(옵셔널 체이닝)으로 중간에 undefined가 발생해도 에러 없이 undefined를 반환.
  return pathArray.reduce((acc, key) => acc?.[key], obj);
};

// 변경된 데이터 찾는 함수
const getUpdatedData = (oldData, newData, uniqueKeyArray) => {
  oldData = JSON.parse(oldData).data;
  newData = JSON.parse(newData).data;

  console.log('🦐old', oldData);
  console.log('🦐new', newData);

  const oldMap = new Map(
    oldData.map(item => [getValueByPath(item, uniqueKeyArray), item]),
  );
  const newMap = new Map(
    newData.map(item => [getValueByPath(item, uniqueKeyArray), item]),
  );

  console.log('🍪old', oldMap);
  console.log('🍪new', newMap);

  const changes = [];

  newMap.forEach((newItem, key) => {
    const agendaName = newItem?.PlanDetail?.AgendaName || '';
    if (!oldMap.has(key)) {
      const diff = getDifference({}, newItem, structure);
      changes.push({type: 'added', id: key, changes: diff, agendaName});
    } else {
      const oldItem = oldMap.get(key);
      const diff = getDifference(oldItem, newItem, structure);
      if (Object.keys(diff).length > 0) {
        changes.push({type: 'updated', id: key, changes: diff, agendaName});
      }
    }
  });

  oldMap.forEach((oldItem, key) => {
    if (!newMap.has(key)) {
      const agendaName = oldItem?.PlanDetail?.AgendaName || '';
      changes.push({
        type: 'removed',
        id: key,
        agendaName,
      });
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
        const {id, changes, agendaName} = change;

        let title =
          agendaName.length > 0 ? `${id}_[안건명 : ${agendaName}]` : id;
        let logMessage = `id: ${title} 변경\n`;

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
                const newVal =
                  obj[key].newValUE === '' ? '""' : obj[key].newValue;
                return `[${obj[key].label}] ${oldVal} → ${newVal}`;
              }
            })
            .flat();
        };

        logMessage += traverseChanges(changes).join('\n');
        updatedList += `${logMessage}\n\n`;
        return logMessage;
      } else if (change.type === 'added') {
        let title =
          change.agendaName.length > 0
            ? `${change.id}_[안건명 : ${change.agendaName}]`
            : change.id;
        let logMessage = `id: ${title} 추가`;
        addedList += `${logMessage}\n`;
        return logMessage;
      } else if (change.type === 'removed') {
        let title =
          change.agendaName.length > 0
            ? `${change.id}_[안건명 : ${change.agendaName}]`
            : change.id;
        let logMessage = `id: ${title} 삭제`;
        removedList += `${logMessage}\n`;
        return logMessage;
      }
      return '';
    })
    .filter(log => log !== '')
    .join('\n\n');
};

const changes = getUpdatedData(oldData, newData, keyFieldArray);
console.log('🔄 변경된 데이터 로그:', formatChanges(changes));

let addedLogs = addedList;
let emovedLogs = removedList;
let updatedLogs = updatedList;
