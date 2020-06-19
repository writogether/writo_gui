import {axios} from '../utils/request';

const api = {
    storyPre: '/api/story',
};

export function getAllStoryAPI() {
    return axios({
        url: `${api.storyPre}/allStory`,
        method: 'GET',
    });
}

export function getByTagAPI(data) {
    return axios({
        url: `${api.storyPre}/by-tag?tag=${data.tag}`,
        method: 'GET',
    });
}

export function uploadNewStoryAPI(data) {
    return axios({
        url: `${api.storyPre}/upload`,
        method: 'POST',
        data,
    });

}

export function getStoryByIdAPI(id) {
    return axios({
        url: `${api.storyPre}/storyInfo/${id}`,
        method: 'GET',
    });
}

export function getStoryContentAPI(id) {
    return axios({
        url: `${api.storyPre}/content/${id}`,
        method: 'GET',
    });
}

export function recreateAPI(data) {
    return axios({
        url: `${api.storyPre}/recreate`,
        method: 'POST',
        data,
    });
}

