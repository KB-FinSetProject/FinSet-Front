import api from '@/api';

const BASE_URL = '/api/dictionary/memo';

export default {
    // 모든 사전 단어장 항목 조회
    async getAll(uno) {
        const response = await api.get(`${BASE_URL}?uno=${uno}`);
        console.log('DICT WISH GET ALL:', response.data);
        return response.data;
    },
    

    // 특정 dwno로 사전 단어장 항목 조회
    async getByDwno(dwno) {
        const response = await api.get(`${BASE_URL}/${dwno}`);
        console.log('DICT WISH GET BY DWNO:', response.data);
        return response.data;
    },

    // 사전 단어장 항목 업데이트
    async updateWish(dwno, wish) {
        const response = await api.put(`${BASE_URL}/update/${dwno}`, wish, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('DICT WISH UPDATE:', response.data);
        return response.data;
    },

    // 사전 단어장 항목 추가
    async createWish(wish) {
        const response = await api.post(BASE_URL, wish, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('DICT WISH CREATE:', response.data);
        return response.data;
    },

    // 사전 단어장 항목 삭제
    async deleteWish(dwno) {
        const response = await api.delete(`${BASE_URL}/${dwno}`);
        console.log('DICT WISH DELETE:', response.data);
        return response.data;
    }
}
