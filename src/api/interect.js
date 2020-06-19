import {axios} from '../utils/request';

const api = {
    interectPre: '/api/interect',
};

export function commentAPI(data) {
    return axios.post(
        `${api.interectPre}/comment`,
        data,
    );
}

export function evaluateAPI(data) {
    return axios.post(
        `${api.interectPre}/evaluate`,
        data,
    );
}

export function toggleCollectAPI(data) {
    return axios.post(
        `${api.interectPre}/collect?storyId=${data.storyId}`,
        data,
    );
}

export function getCommentAPI(data) {
    return axios.get(
        `${api.interectPre}/comment?storyId=${data.storyId}`,
        data,
    );
}

export function getCollection(data) {
    return axios.get(
        `${api.interectPre}/collect`,
        data,
    );
}
