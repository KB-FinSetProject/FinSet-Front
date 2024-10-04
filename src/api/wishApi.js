import api from '@/api'; // Axios 인스턴스 가져오기

const BASE_URL = "/api/wishes";

export default {
  // 관심 목록 전체 조회
  async fetchAllWishes() {
    try {
      const response = await api.get(`${BASE_URL}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching all wishes:", error);
      throw error; // 오류를 다시 던져서 호출한 곳에서 처리할 수 있게 함
    }
  },

  // 관심 목록에 항목 추가
  async addWish(wish) {
    try {
      const response = await api.post(`${BASE_URL}`, wish);
      return response.data;
    } catch (error) {
      console.error("Error adding wish:", error);
      throw error;
    }
  },

  // 관심 목록에서 항목 삭제
  async deleteWish(wish) {
    try {
      const response = await api.delete(`${BASE_URL}`, { data: wish });
      return response.data;
    } catch (error) {
      console.error("Error deleting wish:", error);
      throw error;
    }
  },

  // 사용자별 관심 목록 필터링
  async fetchUserWishes(userId) {
    try {
      const response = await api.get(`${BASE_URL}/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching user wishes:", error);
      throw error;
    }
  },

  async fetchDepositById(dno) {
    try {
      const response = await api.get(`/api/deposits/${dno}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching deposit by ID:", error);
      throw error;
    }
  },

  async fetchInstallmentById(ino) {
    try {
      const response = await api.get(`/api/installments/${ino}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching installment:', error);
      throw error;
    }
  },

  async fetchFundById(fno) {
    const { data } = await api.get(`/api/funds/${fno}`); // 이 메서드가 펀드 상세 정보를 가져옵니다.
    return data;
  },

  async fetchStockById(sno){
    const {data}=await api.get(`/api/stocks/${sno}`);
    return data;
  },

  async fetchForexById(feno) {
    const response = await api.get(`/api/forex/${feno}`);
    return response.data; // 외환 개별 데이터 반환
  },


};
