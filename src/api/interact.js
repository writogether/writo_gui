import {axios} from '../utils/request';

const api = {
    interactPre: '/api/interact',
};

export function getCommentAPI(id) {
    return axios({
        url: `${api.interactPre}/getComment`,
        method: 'GET',
        params: {storyId: id},


    })
}
export function sendCommentAPI(data) {
    return axios({
        url: `${api.interactPre}/comment`,
        method: 'POST',
        data
    })
}

export function evaluateAPI(data) {
    return axios.post(
        `${api.interactPre}/evaluate`,
        data,
    );
}

export function toggleCollectAPI(data) {
    return axios.post(
        `${api.interactPre}/collect?storyId=${data.storyId}`,
        data,
    );
}



export function getCollection(data) {
    return axios.get(
        `${api.interactPre}/collect`,
        data,
    );
}
