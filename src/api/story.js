import { axios } from '../utils/request'
const api = {
    storyPre: '/api/story'
}
export function getAllStoryAPI() {
    return axios({
        url: `${api.storyPre}/allStory`,
        method: 'GET',
    })
}
export function getStoryContentAPI() {
    return axios({
        url: `${api.storyPre}/content`,
        method: 'GET',
    })
}
export function recreateAPI(data) {
    return axios({
        url: `${api.storyPre}/recreate`,
        method: 'POST',
        data,
    })
}

