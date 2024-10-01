import api from '@/api';

const BASE_URL='/api/member';
`${BASE_URL}/checkname/${name}`
export default {
    async checkId(id) {
        const { data } = await api.get(`${BASE_URL}/checkemail/${id}`);
        console.log('AUTH GET CHECKUSERNAME', data);
        return data;
    },
    async create(member) {
        const { data } = await api.post(`${BASE_URL}/signup`, member, {
            headers: {
                'Content-Type': 'application/json', // JSON 형식으로 전송
            },
        });

        console.log('AUTH POST', data);
        return data;
    },
    async checkName(name){
        const {data}=await api.get(`${BASE_URL}/checkname/${name}`);
        console.log('login get checkname',data);
        return data;
    },
    async update(member) {
        const formData=new FormData();
        // formData.append('id', member.id);
        // formData.append('password', member.password);
        formData.append('name', member.name);


        const {data} = await api.put(`${BASE_URL}/${member.id}/name`,formData,headers);
        console.log('AUTH PUT : ',data);
        return data;
    },
    // async changePassword(formData) {
    //     const{data}=await api.put(`${BASE_URL}/${formData.username}/changepassword`,formData);
    //     console.log('AUTH PUT: ',data);
    //     return data;
    // },
}