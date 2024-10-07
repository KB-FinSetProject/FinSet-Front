import api from '@/api';

const BASE_URL='/api/stocks';
const headers={'Content-Type': 'application/json'};
export default {
    async getList(params){
        const {data} = await api.get(BASE_URL,{params});
        console.log('BOARD GET LIST :',data);
        return data;
    },
    async getDrop(params) {
        try {
            const { data } = await api.get(`${BASE_URL}?sort=ascending`, { params });
            console.log('High stocks:', data);
            return data;
        } catch (error) {
            console.error('Error getting high stocks:', error);
        }
    },
    async getHigh(params) {
        try {
            const { data } = await api.get(`${BASE_URL}?sort=descending`, { params });
            console.log('High stocks:', data);
            return data;
        } catch (error) {
            console.error('Error getting high stocks:', error);
        }
    },

    async removeWish(stock) {
        try {
            const { data } = await api.delete(`/api/wishes`, {
                tno: 4, // tno 값을 포함 (예: 주식 번호)
                pno: stock.sno  // pno 값을 포함 (예: 사용자 번호 또는 다른 관련 데이터)
            });
            return data;
        } catch (error) {
            console.error('Error removing wish:', error);
        }
    },
    async addWish(stock) {
        try {
            const { data } = await api.post('/api/wishes', {
                tno: 4, // tno 값을 포함 (예: 주식 번호)
                pno: stock.sno  // pno 값을 포함 (예: 사용자 번호 또는 다른 관련 데이터)
            });
            return data;
        } catch (error) {
            console.error('Error adding wish:', error);
        }
    },
    async get(sno){
        const {data}=await api.get(`${BASE_URL}/${sno}`);
        console.log('STOCK CHART',data);
        return data;
    },

    async getSymbol(sno){
        const {data}= await api.get(`${BASE_URL}/${sno}/symbol`);
        console.log(`BOARD GET`,data);
        return data;
    },
    async getNews(sno){
        const {data}=await api.get(`${BASE_URL}/${sno}/news`)
        console.log('NEWS GET',data);
        return data;
    }
    ,
    async getChart(sno){
        const {data}= await api.get(`${BASE_URL}/${sno}/chart`);
        console.log(`BOARD GET`,data);
        return data;

    },
    async deleteCommunity(sno, bno) {
        const response = await api.delete(`${BASE_URL}/${sno}/community/${bno}`);
        console.log('COMMUNITY DELETE: ', response.data); // 여기서 response.data를 확인
        return response.data;
    },

    async getCommunity(sno){
        const{data}= await api.get(`${BASE_URL}/${sno}/community`);
        console.log('GET COMMUNITY',data);
        return data;
    },
    async submitComment(sno, commentData) {
        const { data } = await api.post(`${BASE_URL}/${sno}/community`, commentData);
        console.log('POST comment', data);
        return data;
    }
}