// src/utils/axiosInstance.js
import axios from 'axios';

// axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: 'http://localhost:16543', // API 서버 주소
  withCredentials: true              // 세션 쿠키 사용할 경우 필수
});

// 응답 인터셉터 추가
axiosInstance.interceptors.response.use(
  (response) => response, // 정상 응답은 그대로 통과
  (error) => {
    const status = error?.response?.status;

    if (status === 401 || status === 403) {
      console.warn("세션 만료 또는 인증 오류 발생");

      // 1. 로컬스토리지 등 클라이언트 상태 초기화
      localStorage.removeItem('user');
      localStorage.removeItem('token'); // JWT 방식일 경우

      // 2. 사용자에게 알림
      alert("세션이 만료되었습니다. 다시 로그인해 주세요.");

      // 3. 로그인 페이지로 이동
      window.location.href = '/login';

      // 4. Promise reject
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;