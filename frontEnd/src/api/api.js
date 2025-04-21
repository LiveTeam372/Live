import axios from "axios";

// 기본 URL 설정 (Spring Boot 백엔드 주소)
// local >> "http://localhost:8080"
// server >> "http://54.180.159.162:16543"
const API_BASE_URL  = process.env.REACT_APP_API_IP;

// GET 요청 함수
export const getRequest = async (url, params = {}) => {
  try {
    const response = await axios.get(`${API_BASE_URL}${url}`, { params });
    return response.data;
  } catch (error) {
    console.error("GET 요청 실패:", error);
    throw error;
  }
};

// POST 요청 함수
export const postRequest = async (url, data = {}) => {
  try {
    const response = await axios.post(`${API_BASE_URL}${url}`, data);
    return response.data;
  } catch (error) {
    console.error("POST 요청 실패:", error);
    throw error;
  }
};
