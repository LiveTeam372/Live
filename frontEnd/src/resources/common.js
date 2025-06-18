
/**
 * ----------------------- 생년월일 입력 ---------------------
 * 
 */
// 연도 리스트 생성 (1900 ~ 현재)
export const getYears = (currentYear) => {
  const years = [];
  for (let y = currentYear; y >= 1900; y--) {
    years.push(String(y));
  }
  return years;
};

// 월 리스트 생성 (01~12)
export const getMonths = () => {
  return [...Array(12).keys()].map(i => String(i + 1).padStart(2, '0'));
};

// 해당 연도와 월에 맞는 일 수 계산
export const getDaysInMonth = (year, month) => {
  if (!year || !month) return [];
  
  const daysInMonth = new Date(year, month, 0).getDate();
  const days = [];
  
  for (let d = 1; d <= daysInMonth; d++) {
    days.push(String(d).padStart(2, '0'));
  }

  return days;
};