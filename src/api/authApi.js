// src/api/authApi.js

import api from '@/api'; // Axios 인스턴스 가져오기

const BASE_URL = "/api/member";

const authApi = {
    // 이메일 중복 확인
    checkEmail(email) {
        return api.get(`${BASE_URL}/checkemail/${email}`);
    },

    // 닉네임 중복 확인
    checkName(name) {
        return api.get(`${BASE_URL}/checkname/${name}`);
    },

    // 회원 가입
    signUp(memberDTO) {
        return api.post(`${BASE_URL}/signup`, memberDTO);
    },

    // 회원 조회
    getMember(id) {
        return api.get(`${BASE_URL}/${id}`);
    },

    // 회원 투자 성향 결과 조회
    getMemberType(id) {
        return api.get(`${BASE_URL}/${id}/type`);
    },

    // 회원 탈퇴
    withdraw(id) {
        return api.delete(`${BASE_URL}/${id}/withdrawal`);
    },

    // 회원 닉네임 변경
    updateName(id, memberDTO) {
        return api.patch(`${BASE_URL}/${id}/name`, memberDTO);
    },

    // 회원 투자 성향 타입 변경
    updateType(id, memberDTO) {
        return api.patch(`${BASE_URL}/${id}/type`, memberDTO);
    },
};

export default authApi;
