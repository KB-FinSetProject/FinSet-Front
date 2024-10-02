import api from '@/api';

const BASE_URL='/api/stocks';
const headers={'Content-Type': 'application/json'};
export default {
    async getList(params){
        const {data} = await api.get(BASE_URL,{params});
        console.log('BOARD GET LIST :',data);
        return data;
    },
    // async create(stock){
    //     const formData=new FormData();
    //     formData.append('sno',stock.sno);
    //     formData.append('writer',stock.writer);
    //     formData.append('content',stock .content);
    //     formData.append('content',stock .content);
    //     formData.append('content',stock .content);
    //     formData.append('content',stock .content);
    //     formData.append('content',stock .content);
    //
    //
    //
    //     const {data} = await api.post(BASE_URL,formData,{headers});
    //     console.log('BOARD POST: ',data);
    //     return data;
    //
    // },
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
        const {data}= await api.get(`${BASE_URL}/${sno}/symbol`);
        console.log(`BOARD GET`,data);
        return data;
    },
    async deleteAttachment(no){
        const {data} = await api.delete(`${BASE_URL}/deleteAttachment/${no}`);

        console.log('ATTACHMENT DELETE: ',data);
        return data;
    }

}