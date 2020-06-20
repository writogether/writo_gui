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
export function getEvalAPI(storyId) {
    return axios({
        url: `${api.interactPre}/getEvaluation`,
        method: 'GET',
        params: {storyId: storyId},
    })
}

export function toggleCollectAPI(storyId) {
    return axios.post(
        `${api.interactPre}/collect?storyId=${storyId}`
    );
}

export function checkIfCollectedAPI(storyId) {
    return axios.get(
        `${api.interactPre}/checkIfCollected?storyId=${storyId}`,
    );
}

export function getCollection() {
    return axios.get(
        `${api.interactPre}/collect`
    );
}
