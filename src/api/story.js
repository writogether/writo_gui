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
export function getSuspenseAPI() {
    return axios({
        url: `${api.storyPre}/by-type?tag=Suspense`,
        method: 'GET',
    })
}
export function getAdventureAPI() {
    return axios({
        url: `${api.storyPre}/by-type?tag=Adventure`,
        method: 'GET',
    })
}
export function getOtherAPI() {
    return axios({
        url: `${api.storyPre}/by-type?tag=Other`,
        method: 'GET',
    })
}
export function getHorrorAPI() {
    return axios({
        url: `${api.storyPre}/by-type?tag=Horror`,
        method: 'GET',
    })
}
export function getRomanticAPI() {
    return axios({
        url: `${api.storyPre}/by-type?tag=Romantic`,
        method: 'GET',
    })
}
export function getFunnyAPI() {
    return axios({
        url: `${api.storyPre}/by-type?tag=Funny`,
        method: 'GET',
    })
}
export function uploadNewStoryAPI(data) {
    return axios({
        url:`${api.storyPre}/upload`,
        method:'POST',
        data
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

