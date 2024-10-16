import api from '@/api'; // Axios 인스턴스 가져오기

const BASE_URL = "/api/search";

const searchApi = {
    // 최신 검색 키워드 조회
    async getKeywords(memberId) {
        try {
            const response = await api.get(`${BASE_URL}`, {
                headers: {
                    'Authorization': `Bearer ${memberId}` // 인증 토큰이 필요하다면 여기에 추가
                }
            });
            return response.data; // 키워드 리스트 반환
        } catch (error) {
            console.error("키워드 조회 실패:", error);
            throw error; // 에러를 다시 던져 호출자에게 알림
        }
    },

    // 검색 키워드 저장
    async createKeyword(keyword, memberId) {
        try {
            // keyword 객체에 uno 필드를 추가하여 API에 전달
            const response = await api.post(`${BASE_URL}`, { keyword: keyword, uno: memberId }, {
                headers: {
                    'Authorization': `Bearer ${memberId}` // 인증 토큰이 필요하다면 여기에 추가
                }
            });
            return response.data; // 생성된 키워드 반환
        } catch (error) {
            console.error("키워드 저장 실패:", error);
            throw error; // 에러를 다시 던져 호출자에게 알림
        }
    },


    // 검색 키워드 삭제
    async deleteKeyword(keno) {
        try {
            const response = await api.delete(`${BASE_URL}/${keno}`);
            return response.data; // 삭제 결과 메시지 반환
        } catch (error) {
            console.error("키워드 삭제 실패:", error);
            throw error; // 에러를 다시 던져 호출자에게 알림
        }
    },

};

export default searchApi;
