
// 공통 유틸
// 작성자 : 원필재
class Common {
  formatDate(date) {
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  }

  /**
   * ----------------------- 생년월일 입력 ---------------------
   * 
   */
  // 연도 리스트 생성 (1900 ~ 현재)
  getYears(currentYear) {
    const years = [];
    for (let y = currentYear; y >= 1900; y--) {
      years.push(String(y));
    }
    return years;
  }
  
  // 월 리스트 생성 (01~12)
  getMonths() {
    return [...Array(12).keys()].map(i => String(i + 1).padStart(2, '0'));
  }
  
  // 해당 연도와 월에 맞는 일 수 계산
  getDaysInMonth = (year, month) => {
    if (!year || !month) return [];
    
    const daysInMonth = new Date(year, month, 0).getDate();
    const days = [];
    
    for (let d = 1; d <= daysInMonth; d++) {
      days.push(String(d).padStart(2, '0'));
    }
  
    return days;
  }
  
  // 이메일 유효성 체크
  isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const hasOnlyEngNum = /^[a-zA-Z0-9@._%+-]+$/.test(email); // 한글 등 특수문자 방지
    return (
      typeof email === 'string' &&
      email.length <= 30 &&
      emailRegex.test(email) &&
      hasOnlyEngNum
    );
  }
  
  // 비밀번호 정규식
  isValidPassword(pw) {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return passwordRegex.test(pw);
  }

  // 한글 정규식
  isValidKorean(str, min, max) {
    const regex = /^[가-힣]$/;
    return regex.test(str) && this.isValidLength(str, min, max);
  }

  // 한글+숫자 정규식
  isValidKoNum(str, min, max) {
    const regex = /^[가-힣0-9]$/;
    return regex.test(str) && this.isValidLength(str, min, max);
  }

  // 한글, 영문, 숫자 포함 정규식
  isValidKoEnNum(str, min, max) {
    const regex = /^[가-힣a-zA-Z0-9]$/;
    return regex.test(str) && this.isValidLength(str, min, max);
  }

  // 숫자만 정규식
  isValidNum(num, min, max) {
    const regex = /^[0-9]{1,}$/;
    return regex.test(num) && this.isValidLength(num, min, max);
  }

  // 인풋값 길이 검증
  /**
   * @param 
   *    str : 검증 문자열
   *    min : 최소 값
   *    max : 최대 값
   * @return
   *    boolean
   */
  isValidLength(str, min = 0, max = Infinity) {
    if (typeof str !== 'string') return false;
    const len = str.trim().length;
    return len >= min && len <= max;
  }
}

export default new Common();