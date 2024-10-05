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

    // 사전 단어장 메모 업데이트
    async updateMemo(dwno, wish) {
        const response = await api.put(`${BASE_URL}/update/${dwno}`, wish, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('DICT MEMO UPDATE:', response.data);
        return response.data;
    },

}
