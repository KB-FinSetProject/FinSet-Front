
import api from '@/api';

const BASE_URL = '/api/dictionary/memo';

export default {
    // 모든 사전 단어장 항목 조회
    async getAll() {
        const { data } = await api.get(`${BASE_URL}`);
        console.log('DICT WISH GET ALL:', data);
        return data;
    },

    // 특정 dwno로 사전 단어장 항목 조회
    async getByDwno(dwno) {
        const { data } = await api.get(`${BASE_URL}/${dwno}`);
        console.log('DICT WISH GET BY DWNO:', data);
        return data;
    },

    // 사전 단어장 항목 업데이트
    async updateWish(dwno, wish) {
        const { data } = await api.put(`${BASE_URL}/update/${dwno}`, wish, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('DICT WISH UPDATE:', data);
        return data;
    },

    // 사전 단어장 항목 추가
    async createWish(wish) {
        const { data } = await api.post(BASE_URL, wish, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('DICT WISH CREATE:', data);
        return data;
    },

    // 사전 단어장 항목 삭제
    async deleteWish(dwno) {
        const { data } = await api.delete(`${BASE_URL}/${dwno}`);
        console.log('DICT WISH DELETE:', data);
        return data;
    }
}
