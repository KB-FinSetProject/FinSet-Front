// src/api/homeApi.js

import api from '@/api'; // Axios 인스턴스 가져오기

const BASE_URL = '/api'; // 기본 URL 설정

export default {
  // 메인 화면 뉴스 조회 API 호출 함수
  async getHomeNews() {
    try {
      // API 호출, '/api/main/news' 엔드포인트로 GET 요청
      const response = await api.get(`${BASE_URL}/main/news`);
      // 성공 시 응답 데이터 반환
      return response.data;
    } catch (error) {
      // 오류 발생 시 오류 메시지 출력
      console.error('Error fetching home news:', error);
      throw error; // 에러를 상위로 던짐
    }
  },

  // 코스피 정보 조회 API 호출 함수
  async getKospiData() {
    try {
      // API 호출, '/api/main/kospi' 엔드포인트로 GET 요청
      const response = await api.get(`${BASE_URL}/main/kospi`);
      // 성공 시 응답 데이터 반환
      return response.data;
    } catch (error) {
      // 오류 발생 시 오류 메시지 출력
      console.error('Error fetching kospi data:', error);
      throw error; // 에러를 상위로 던짐
    }
  }
};
