// src/api/depositApi.js
import api from '@/api'; // Axios 인스턴스 가져오기

const BASE_URL = "/api/deposits";

export default {
  async fetchDeposits(sort = 'total') {
    try {
      const response = await api.get(`${BASE_URL}`, {
        params: { sort } // sort 파라미터를 추가
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching deposits:", error);
      throw error; // 오류를 다시 던져서 호출한 곳에서 처리할 수 있게 함
    }
  },

  async fetchDepositById(dno) {
    try {
      const response = await api.get(`${BASE_URL}/${dno}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching deposit by ID:", error);
      throw error;
    }
  },

  // 간단 예금 정보만 가져오기
  async fetchSimpleDeposits() {
    return this.fetchDeposits('simple'); // sort를 'simple'로 설정
  },

  // 복리 예금 정보만 가져오기
  async fetchCompoundDeposits() {
    return this.fetchDeposits('compound'); // sort를 'compound'로 설정
  }
};
