import api from '@/api';

const BASE_URL = '/api/dictionary';

export default {
    // 모든 사전 항목 조회
    async getAll() {
        const { data } = await api.get(`${BASE_URL}`);
        console.log('DICT GET ALL:', data);
        return data;
    },

    // 특정 dino로 사전 항목 조회
    async getByDino(dino) {
        const { data } = await api.get(`${BASE_URL}/${dino}`);
        console.log('DICT GET BY DINO:', data);
        return data;
    },

    // 특정 단어로 사전 항목 검색
    async search(word) {
        const { data } = await api.get(`${BASE_URL}/search`, {
            params: { word },
        });
        console.log('DICT SEARCH:', data);
        return data;
    },

    // 사전 항목 상태 업데이트
    async updateStatus(dino, dict) {
        const { data } = await api.put(`${BASE_URL}/${dino}`, dict, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('DICT UPDATE STATUS:', data);
        return data;
    }
}
