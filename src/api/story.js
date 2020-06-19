import { axios } from '../utils/request'
const api = {
    storyPre: '/api/story'
}
export function getAllStoryAPI() {
    return axios({
        url: `${api.storyPre}/all-story`,
        method: 'GET',
    })
}
export function getSuspenseAPI() {
    return axios({
        url: `${api.storyPre}/by-tag?tag=Suspense`,
        method: 'GET',
    })
}
export function getAdventureAPI() {
    return axios({
        url: `${api.storyPre}/by-tag?tag=Adventure`,
        method: 'GET',
    })
}
export function getOtherAPI() {
    return axios({
        url: `${api.storyPre}/by-tag?tag=Other`,
        method: 'GET',
    })
}
export function getHorrorAPI() {
    return axios({
        url: `${api.storyPre}/by-tag?tag=Horror`,
        method: 'GET',
    })
}
export function getRomanticAPI() {
    return axios({
        url: `${api.storyPre}/by-tag?tag=Romantic`,
        method: 'GET',
    })
}
export function getFunnyAPI() {
    return axios({
        url: `${api.storyPre}/by-tag?tag=Funny`,
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
export function getStoryByIdAPI(id) {
    return axios({
        url: `${api.storyPre}/storyInfo/${id}`,
        method: 'GET',
    })
}
export function getStoryByFatherAPI(id) {
    return axios({
        url: `${api.storyPre}/by-father?fatherId=${id}`,
        method: 'GET',
    })
}
export function getStoryContentAPI(id) {
    return axios({
        url: `${api.storyPre}/content/${id}`,
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

