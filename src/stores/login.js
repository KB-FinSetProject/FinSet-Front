import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';

const initState={
    token:'',
    user:{
        id:'',
        name:'',
        roles:[],
    },
};

export const useLoginStore=defineStore('auth',()=>{
    const state=ref({...initState});

    const isLogin=computed(()=> !!state.value.user.id);
    const username=computed(()=>state.value.user.id);

    const email=computed(()=>state.value.user.name);

    const login= async (member)=>{
        // state.value.token='test token';
        // state.value.user={username:member.username, email: member.username+'@test.com'};

        const{data}=await axios.post('/api/auth/login',member);
        state.value={...data};

        localStorage.setItem('auth',JSON.stringify(state.value));
    };
    const logout=()=>{
        localStorage.clear();
        state.value={...initState};
    };
    const getToken=()=>state.value.token;

    const load=()=>{
        const auth=localStorage.getItem('auth');
        if (auth != null) {
            state.value=JSON.parse(auth);
            console.log(state.value);
        }
    };

    const changeProfile=(member)=>{
            state.value.user.name=member.name;
            localStorage.setItem('auth',JSON.stringify(state.value));


    };
    load();

    return{state,username,email,isLogin,changeProfile,login,logout,getToken};
});