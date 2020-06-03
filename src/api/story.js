import { axios } from '@/utils/request'
const api = {
    storyPre: '/api/story'
}
export function getStoryContentAPI() {
    return axios({
        url: `${api.storyPre}/content`,
        method: 'get',
    })
}
export function recreateAPI(data) {
    return axios({
        url: `${api.storyPre}/recreate`,
        method: 'POST',
        data,
    })
}