import router, {resetRouter} from '../../router';
import { getToken, setToken, removeToken } from '../../utils/auth'
import {message} from 'ant-design-vue';
import {getUserInfoAPI, loginAPI, registerAPI, updateUserInfoAPI} from '../../api/user';

const getDefaultState = () => {
    return {
        userId: '',
        userInfo: {},
    };
};

const user = {
    state: getDefaultState(),

    mutations: {
        reset_state: function (state) {
            state.token = '',
                state.userId = '',
                state.userInfo = {};
        },
        set_userId: (state, data) => {
            state.userId = data;
        },
        set_userInfo: (state, data) => {
            state.userInfo = {
                ...state.userInfo,
                ...data,
            };
        },
    },

    actions: {
        login: async ({dispatch, commit}, userData) => {
            const res = await loginAPI(userData);
            setToken(res.id)
                router.push('/story/storyList');

        },
        register: async ({commit}, data) => {
            const res = await registerAPI(data);
        },
        getUserInfo({state, commit}) {
            return new Promise((resolve, reject) => {
                getUserInfoAPI(state.userId).then(response => {
                    const data = response;
                    if (!data) {
                        reject('登录已过期，请重新登录');
                    }
                    commit('set_userInfo', data);
                    commit('set_userId', data.id);
                    resolve(data);
                }).catch(error => {
                    reject(error);
                });
            });
        },
        updateUserInfo: async ({state, dispatch}, data) => {
            const params = {
                id: state.userId,
                ...data,
            };
            const res = await updateUserInfoAPI(params);
                message.success('修改成功');

        },
        logout: async ({commit}) => {
            removeToken();
            resetRouter();
            commit('reset_state');
        },
    },
};

export default user;
