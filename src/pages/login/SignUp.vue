<template>
    <HeaderSignUp/>

    <div class="container">
        <h1> 반갑습니다!</h1>

        <br>
        <br>

        <div class="col-12">
            <label for="id" class="form-label">*이메일</label>
            <div class="input-group">
                <input type="text" class="form-control" id="id" placeholder="hongildong@kb.com" required>
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
            <label for="password2" class="form-label">*비밀번호 확인</label>
            <span v-if="passwordMismatch" class="text-danger ms-2">비밀번호가 일치하지 않습니다.</span>
            <div class="d-flex align-items-center">
                <input type="text" class="form-control" id="password2" placeholder="1234" v-model="passwordCheck" required>
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

        <button class="btn btn-signup" type="submit" @click="join">회원가입</button>

    </div>
</template>

<script setup>
import {reactive, ref, watch} from 'vue';
import HeaderSignUp from '@/components/common/HeaderSignUp.vue';
import loginApi from "@/api/loginApi";
import {useRouter} from'vue-router';

const router=useRouter();
const checkError=ref('')
const password = ref('');
const passwordCheck = ref('');
const passwordMismatch = ref(false);

const member=reactive({
  id:'',
  password:'',
  password2:'',
  name:''
})

const disableSubmit=ref(true);
const checkId=async ()=>{
  if(!member.id){
    return alert('사용자 ID를 입력하세요')
  }
  disableSubmit.value=await loginApi.checkId(member.id);
  console.log(disableSubmit.value,typeof disableSubmit.value);
  checkError.value=disableSubmit.value ? "이미 사용중인 아이디 입니다" : "사용가능한 아이디 입니다.";
}
const changeUsername=()=>{
  disableSubmit.value=true;
  if(member.id){
    checkError.value='ID 중복 체크를 하셔야 합니다.';

  }else{
    checkError.value='';
  }
};


const join=async ()=>{
  if(member.password!=member.password2){
    return alert('비밀번호가 일치하지 않습니다')
  }
  try{
    await loginApi.create(member);
    router.push({name:'home'});
  }catch(e){
    console.error(e);
  }
};
// Watcher to check for password mismatch
// watch([password, passwordCheck], () => {
//     passwordMismatch.value = password.value !== passwordCheck.value;
// });
</script>

<style scoped>
.container {
    margin-top: -70px;
}

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

.form-label {
    color: gray; /* 라벨 색상을 회색으로 변경 */
}
</style>
