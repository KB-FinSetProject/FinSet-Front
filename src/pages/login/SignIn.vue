<template>

    <HeaderSignIn/>

    <div class="container">

        <h1 style="font-weight: 300;">FIND EASY,</h1>

        <h1>
            <span class="normal">FIN</span>
            <span class="highlight">D</span>
            <span class="normal">Y</span>
        </h1>

        <br>

        <div class="form-floating mb-3">
            <input type="id" class="form-control custom-input" id="floatingInput" placeholder="name@example.com" v-model="member.id">
            <label for="floatingInput">이메일 주소</label>
        </div>
        <div class="form-floating mb-3">
            <input type="password" class="form-control custom-input" id="floatingPassword" placeholder="Password" v-model="member.password">
            <label for="floatingPassword">비밀번호</label>
        </div>

        <br>

        <button class="custom-button" :disabled="disableSubmit" @click="login">로그인</button>

        <div class="mt-3 text-center">
            <router-link to="/signup" class="text-muted">회원가입</router-link> |
            <button @click="handleGoogleLogin" class="underline-button">간편 로그인</button>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png" alt="Google Logo" class="google-logo" />

        </div>

        

    </div>

</template>

<script setup>
import HeaderSignIn from '@/components/common/HeaderSignIn.vue';
import { computed, reactive, ref } from "vue";
import { useLoginStore } from "@/stores/login";
import loginApi from "@/api/loginApi";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const auth = useLoginStore();
const cr = useRoute();
const member = reactive({
  id: '',
  password: '',
});
const error = ref('');

const disableSubmit = computed(() => !(member.id && member.password));

const login = async () => {
  console.log(member);
  try {
    await auth.login(member);
    if (cr.query.next) {
      router.push({name: cr.query.name});
    } else {
      router.push('/');
    }
  } catch (e) {
    console.error("에러=========", e);
    error.value = e.response?.data || "로그인 실패. 다시 시도하세요.";
  }
};
</script>

<style scoped>
.container{
    margin-top: -70px;
}
.normal {
    color: #816843; /* FINDY의 기본 색상 */
}

.highlight {
    color: #FFBF0A; /* D의 색상 */
}

.custom-button {
    background-color: #FFBF0A; /* 배경색 */
    color: #ffffff; /* 글씨색 */
    border: none; /* 기본 테두리 제거 */
    border-radius: 30px; /* 모서리 둥글게 */
    width: 100%; /* 가로 폭을 100%로 설정 */
    padding: 0.5rem 0; /* 위아래 패딩 */
    transition: background-color 0.3s; /* 배경색 변화 시 부드러운 전환 */
}

.custom-button:hover {
    background-color: #e6a700; /* 호버 시 색상 변화 (선택사항) */
}

.custom-input {
    background-color: transparent; /* 배경을 투명하게 설정 */
    border: none; /* 기본 테두리 제거 */
    border-bottom: 2px solid #816843; /* 밑줄 설정 */
    border-radius: 0; /* 모서리 둥글게 제거 */
}

.custom-input:focus {
    outline: none; /* 포커스 시 테두리 제거 */
    border-bottom: 2px solid #FFBF0A; /* 포커스 시 밑줄 색상 변경 */
}

.custom-input::placeholder {
    color: transparent; /* 플레이스홀더 색상 투명하게 설정 (선택사항) */
}

.underline-button {
    background: none;  /* 배경 없음 */
    border: none;      /* 테두리 없음 */
    color: #6c757d;    /* 원하는 텍스트 색상 */
    text-decoration: underline; /* 밑줄 추가 */
    cursor: pointer;   /* 포인터 커서로 변경 */
}

.google-logo {
    width: 15px; /* 원하는 크기로 조정 */
    height: auto; /* 비율 유지 */
    margin-left: 5px; /* 간격 조정 */
}

</style>