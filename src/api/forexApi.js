import api from '@/api'; // Axios 인스턴스 가져오기

const BASE_URL = '/api/forex';

const forexApi = {
  // 모든 외환 정보를 가져오기
  async fetchAllForex() {
    try {
      const response = await api.get(`${BASE_URL}`);
      return response.data; // 외환 데이터 반환
    } catch (error) {
      console.error("Error fetching all forex:", error);
      throw error; // 오류를 다시 던져서 호출한 곳에서 처리할 수 있게 함
    }
  },

  // 특정 외환 정보 가져오기 (feno로 외환 개별 정보)
  async fetchForexById(feno) {
    try {
      const response = await api.get(`${BASE_URL}/${feno}`);
      return response.data; // 외환 개별 데이터 반환
    } catch (error) {
      console.error("Error fetching forex by ID:", error);
      throw error;
    }
  },

  // 특정 외환의 차트 정보 가져오기
  async fetchForexChartById(feno) {
    try {
      const response = await api.get(`${BASE_URL}/${feno}/chart`);
      return response.data; // 외환 차트 데이터 반환
    } catch (error) {
      console.error("Error fetching forex chart by ID:", error);
      throw error;
    }
  },
};

export default forexApi;
