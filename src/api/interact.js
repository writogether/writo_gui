import {axios} from '../utils/request';

const api = {
    interactPre: '/api/interact',
};

export function commentAPI(data) {
    return axios.post(
        `${api.interactPre}/comment`,
        data,
    );
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

export function getCommentAPI(data) {
    return axios.get(
        `${api.interactPre}/comment?storyId=${data.storyId}`,
        data,
    );
}

export function getCollection(data) {
    return axios.get(
        `${api.interactPre}/collect`,
        data,
    );
}
