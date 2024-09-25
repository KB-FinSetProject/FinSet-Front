<template>
    <HeaderSignUp/>

    <div class="container">
        <h1> 반갑습니다!</h1>

        <br>
        <br>

        <div class="col-12">
            <label for="email" class="form-label">*이메일</label>
            <div class="input-group">
                <input type="text" class="form-control" id="email" placeholder="hongildong@kb.com" required>
                <button class="btn btn-custom" type="button">인증하기</button>
            </div>
            <div class="invalid-feedback">
                이메일을 입력해주세요.
            </div>
        </div>

        <br>

        <div class="col-12">
            <label for="password" class="form-label">*비밀번호</label>
            <input type="text" class="form-control" id="password" placeholder="1234" v-model="password" required>
            <div class="invalid-feedback">
                비밀번호를 입력해주세요.
            </div>
        </div>

        <br>

        <div class="col-12">
            <label for="passwordcheck" class="form-label">*비밀번호 확인</label>
            <span v-if="passwordMismatch" class="text-danger ms-2">비밀번호가 일치하지 않습니다.</span>
            <div class="d-flex align-items-center">
                <input type="text" class="form-control" id="passwordcheck" placeholder="1234" v-model="passwordCheck" required>
            </div>
            <div class="invalid-feedback">
                비밀번호를 확인해주세요.
            </div>
        </div>

        <br>

        <div class="col-12">
            <label for="name" class="form-label">*닉네임</label>
            <div class="input-group">
                <input type="text" class="form-control" id="name" placeholder="키키핑" required>
                <button class="btn btn-custom" type="button">중복 확인</button>
            </div>
            <div class="invalid-feedback">
                닉네임을 입력해주세요.
            </div>
        </div>

        <br>
        <br>

        <button class="btn btn-signup" type="submit">회원가입</button>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import HeaderSignUp from '@/components/common/HeaderSignUp.vue';

const password = ref('');
const passwordCheck = ref('');
const passwordMismatch = ref(false);

// Watcher to check for password mismatch
watch([password, passwordCheck], () => {
    passwordMismatch.value = password.value !== passwordCheck.value;
});
</script>

<style scoped>
.btn-custom {
    background-color: #FFBF0A; /* 버튼 배경색 */
    color: white; /* 버튼 글씨색 */
    border: none; /* 테두리 없음 */
    border-radius: 5px; /* 모서리 둥글게 */
}

.btn-signup {
    background-color: #FFBF0A; /* 버튼 배경색 */
    color: white; /* 버튼 글씨색 */
    border: none; /* 테두리 없음 */
    border-radius: 30px; /* 모서리 둥글게 */
    width: 100%; /* 버튼 너비를 100%로 설정 */
    padding: 10px; /* 패딩 추가 */
    margin-top: 20px; /* 위쪽 여백 추가 */
}

.input-group {
    display: flex; /* 입력 필드와 버튼을 수평으로 정렬 */
}

.input-group .form-control {
    border-right: none; /* 입력 필드와 버튼 사이의 테두리 제거 */
}

.input-group .btn {
    border-left: none; /* 입력 필드와 버튼 사이의 테두리 제거 */
}

.text-danger {
    color: red; /* 오류 메시지 색상 */
}

.container {
    margin-bottom: 150px; /* 원하는 크기로 조정 */
}

.form-label {
    color: gray; /* 라벨 색상을 회색으로 변경 */
}
</style>
