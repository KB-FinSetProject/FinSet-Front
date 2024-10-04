import axios from 'axios';

import {useLoginStore} from '@/stores/login';
import router from '@/router';

const instance=axios.create({
    timeout:5000,
});

instance.interceptors.request.use(
    (config)=>{
        const {getToken} = useLoginStore();
        const token=getToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
            console.log(config.headers.Authorization);
        }
        return config;
    },
    (error)=>{
        return Promise.reject(error);
    }
)
instance.interceptors.response.use(
    (response)=>{
        if (response.status === 200) {
            return response
        }
        if (response.status === 404) {
            return Promise.reject('404:페이지 없음' +response.request);
        }
        return response;
    },
    async (error)=>{
        if (error.response?.status === 401) {
            const {logout} = useLoginStore();
            logout();
            router.push('/auth/login?error=login_required');
            return Promise.reject({error:'로그인이 필요한 서비스입니다.'});
        }
        return Promise.reject(error);
    }
);
export default instance;