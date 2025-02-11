export function formatedDate(localDate) {
  const dateArry = localDate.split('.');
  const year = dateArry[0];
  const month = dateArry[1];
  const day = dateArry[2];

  return `${year}년 ${month}월 ${day}일`;
}
