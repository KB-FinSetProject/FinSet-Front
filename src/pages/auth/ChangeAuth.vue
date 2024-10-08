<template>
    <HeaderSignUp/>

    <div class="container">
        <h1> 반갑습니다!</h1>

        <br>
        <br>
        <div class="col-12">
            <label for="id" class="form-label">*이메일</label>
            <div class="input-group">
                <span class="form-control"  style="width: 285px;">{{ authData.id }}</span> <!-- 텍스트로 표시 -->
            </div>
        </div>

        <br>

        <!-- <div class="col-12">
            <label for="password" class="form-label">*비밀번호</label>
            <span class="form-control" style="width: 285px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">{{ authData.password }}</span>
        </div> -->

        <br>
        <br>

        <div class="col-12">
            <label for="name" class="form-label">*닉네임</label>
            <div class="input-group">
                <input type="text" class="form-control" v-model="member.name" placeholder="{{ authData.name }}"/>            
                <button class="btn btn-custom" type="button" @click="checkName">중복 확인</button>
            </div>
            <span :class="disableSubmitName.value ? 'text-primary' : 'text-danger'" style="margin-top: 10px; display: block; margin-left:5px">{{ checkErrorName }}</span>
        </div>

        <br>
        <br>

        <button class="btn btn-signup" type="submit" @click="updateName">닉네임 변경</button>
    </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue';
import HeaderSignUp from '@/components/common/HeaderSignUp.vue';
import loginApi from "@/api/loginApi";
import authApi from "@/api/authApi"; // authApi 가져오기
import { useRouter } from 'vue-router';

const router = useRouter();
const checkError = ref('');
const checkErrorName = ref('');

const authData = JSON.parse(localStorage.getItem('auth')) || {
    id: '',
    password: '',
    password2: '',
    name: ''
};

const member = reactive({
    id: authData.id,
    password: authData.password,
    password2: authData.password2,
    name: authData.name
});

const disableSubmitName = ref(true);
const isEmailValid = computed(() => {
    return member.id.includes('@');
});

const checkName = async () => {
    if (!member.name) {
        return alert('사용자 닉네임을 입력해주셔야 됩니다.');
    } else {
        disableSubmitName.value = await loginApi.checkName(member.name);
        checkErrorName.value = disableSubmitName.value ? "이미 사용중인 닉네임 입니다" : "사용가능한 닉네임 입니다.";
    }
};

// 닉네임 변경 기능 추가
const updateName = async () => {
    if (!member.name) {
        return alert('닉네임을 입력해주셔야 합니다.');
    }
    try {
        await authApi.updateName(authData.id, { name: member.name }); // authData.id를 사용하여 닉네임 변경
        alert('닉네임이 변경되었습니다.');
        // 변경 후 authData를 업데이트하여 반영
        authData.name = member.name;
        localStorage.setItem('auth', JSON.stringify(authData));
    } catch (error) {
        alert('닉네임 변경 중 오류가 발생했습니다.');
        console.error("닉네임 변경 오류:", error);
    }
};

const join = async () => {
    if (member.password !== member.password2) {
        return alert('비밀번호가 일치하지 않습니다');
    }
    try {
        await loginApi.create(member);
        router.push('/');
    } catch (e) {
        console.error(e);
    }
};
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



.input-group .btn {
    border-left: none; /* 입력 필드와 버튼 사이의 테두리 제거 */
}

.text-danger {
    color: red; /* 오류 메시지 색상 */
}

.text-primary {
    color: green; /* 오류 메시지 색상 */
}


.form-label {
    color: gray; /* 라벨 색상을 회색으로 변경 */
}
</style>
