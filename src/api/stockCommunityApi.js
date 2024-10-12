import api from '@/api'; // Axios 인스턴스 가져오기

const BASE_URL = '/api/stocks'; // 기본 URL 설정

const stockCommunityApi = {
    // 모든 주식 정보 가져오기 (정렬 기준은 'volume'이 기본값)
    getAllStocks(sort = 'volume') {
        return api.get(`${BASE_URL}?sort=${sort}`);
    },

    // 특정 주식 정보 가져오기
    getStock(sno) {
        return api.get(`${BASE_URL}/${sno}`);
    },

    // 특정 주식의 차트 정보 가져오기
    getStockChart(sno) {
        return api.get(`${BASE_URL}/${sno}/chart`);
    },

    // 특정 주식의 심볼 정보 가져오기
    getStockSymbol(sno) {
        return api.get(`${BASE_URL}/${sno}/symbol`);
    },

    // 특정 주식 커뮤니티 게시글 목록 가져오기
    getCommunities(sno, sort = 'latest') {
        return api.get(`${BASE_URL}/${sno}/community`, {
            params: {
                sort: sort
            }
        });
    },

    // 커뮤니티 게시글 작성
    createCommunity(sno, communityDTO) {
        return api.post(`${BASE_URL}/${sno}/community`, communityDTO);
    },

    // 커뮤니티 게시글 수정
    updateCommunity(sno, bno, communityDTO) {
        return api.patch(`${BASE_URL}/${sno}/community/${bno}`, communityDTO);
    },

    // 커뮤니티 게시글 삭제
    deleteCommunity(sno, bno) {
        return api.delete(`${BASE_URL}/${sno}/community/${bno}`);
    },

    // 커뮤니티 게시글에 좋아요 추가
    addLike(sno, like) {
        return api.post(`${BASE_URL}/${sno}/community/likes`, like);
    },

    // 커뮤니티 게시글에 좋아요 삭제
    deleteLike(sno, like) {
        return api.delete(`${BASE_URL}/${sno}/community/likes`, { data: like });
    }
};

export default stockCommunityApi;
