import api from '@/api'; // 기본 API 모듈 가져오기

const BASE_URL = '/api/funds'; // 기본 URL 설정
const headers = { 'Content-Type': 'application/json' }; // 헤더 설정

export default {
  // 모든 펀드 판매 목록 가져오기
  async getList(params) {
    const { data } = await api.get(BASE_URL, { params });
    console.log('펀드 판매 목록 가져오기:', data);
    return data;
  },

  // 판매액 Best 펀드 목록 가져오기
  async getSalesList(params) {
    const { data } = await api.get(`${BASE_URL}/?sort=sales`, { params });
    console.log('판매액 Best 펀드 목록 가져오기:', data);
    return data;
  },

  // 적립액 Best 펀드 목록 가져오기
  async getAccList(params) {
    const { data } = await api.get(`${BASE_URL}/?sort=acc`, { params });
    console.log('적립액 Best 펀드 목록 가져오기:', data);
    return data;
  },

  // 특정 펀드 판매 정보 가져오기 (상세 정보와 차트 데이터 포함)
  async getFundDetail(fno) {
    const fund = await this.get(fno); // 펀드 기본 정보 가져오기
    const chartData = await this.getChart(fno); // 차트 데이터 가져오기
    return { fund, chartData }; // 두 정보를 포함한 객체 반환
  },

  // 특정 펀드 판매 정보 가져오기
  async get(fno) {
    const { data } = await api.get(`${BASE_URL}/${fno}`); // 이 메서드가 펀드 상세 정보를 가져옵니다.
    console.log(`펀드 판매 정보 가져오기 (ID: ${fno}):`, data);
    return data;
  },

  // 특정 펀드의 차트 데이터 가져오기
  async getChart(fno) {
    const { data } = await api.get(`${BASE_URL}/${fno}/chart`);
    console.log(`펀드 차트 데이터 가져오기 (ID: ${fno}):`, data);
    return data;
  },

  // 새로운 펀드 판매 생성하기
  async create(fund) {
    const { data } = await api.post(BASE_URL, fund, { headers });
    console.log('펀드 판매 생성:', data);
    return data;
  },

  // 특정 펀드 판매 정보 업데이트하기
  async update(fno, fund) {
    const { data } = await api.put(`${BASE_URL}/${fno}`, fund, { headers });
    console.log(`펀드 판매 업데이트 (ID: ${fno}):`, data);
    return data;
  },

  // 특정 펀드 판매 삭제하기
  async remove(fno) {
    await api.delete(`${BASE_URL}/${fno}`);
    console.log(`펀드 판매 삭제 (ID: ${fno})`);
  },
};
