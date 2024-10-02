// src/api/depositApi.js
import api from '@/api'; // Axios 인스턴스 가져오기

const BASE_URL = "/api/deposits";

export default {
  async fetchDeposits(sort = 'total') {
    try {
      const response = await api.get(`${BASE_URL}`);
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
};
