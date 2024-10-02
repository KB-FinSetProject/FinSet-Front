import api from '@/api'; // Axios 인스턴스 가져오기

const BASE_URL = '/api/installments';

const installmentApi = {
  // 모든 적금 정보를 가져오기 (정렬 옵션 포함)
  async fetchAllInstallments(sort = 'total') {
    try {
      const response = await api.get(`${BASE_URL}`, {
        params: { sort }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching installments:', error);
      throw error;
    }
  },

  // 적금 정보를 상세히 가져오기 (ino로 적금 개별 정보)
  async fetchInstallmentById(ino) {
    try {
      const response = await api.get(`${BASE_URL}/${ino}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching installment:', error);
      throw error;
    }
  },

  // 간단 적금 정보만 가져오기
  async fetchSimpleInstallments() {
    return this.fetchAllInstallments('simple');
  },

  // 복리 적금 정보만 가져오기
  async fetchCompoundInstallments() {
    return this.fetchAllInstallments('compound');
  }
};

export default installmentApi;
