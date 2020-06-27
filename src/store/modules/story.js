import {
    getAdventureAPI,
    getAllStoryAPI,
    getFunnyAPI,
    getHorrorAPI,
    getOtherAPI,
    getRomanticAPI,
    getStoryByIdAPI,
    getStoryByFatherAPI,
    getStoryContentAPI,
    getSuspenseAPI,
    uploadNewStoryAPI,
    getStoryHistoryAPI,
    getPrivateStoryAPI,
    getPublicStoryAPI,
} from "../../api/story";

const story = {
    state: {
        storyList:[],
        recreateList: [],
        Visible: false,
        storyHistory:[],
        storyParams: {
            id:'',
            depth:'',
        },
        storyContent:'',
        quickCreateModalVisible:false,
        privateStoryList:[],
        publicStoryList:[],
    },
    mutations: {
        set_storyList:function (state,data) {
            state.storyList=data
        },
        set_storyHistory:function(state,list){
            state.storyHistory=list
        },
        set_recreateList:function (state,data) {
            state.recreateList=data
        },
        set_storyParams:function (state,depth) {
            state.storyParams.depth=depth;
        }
        ,
        set_quickCreateModalVisible:function (state,data) {
            state.quickCreateModalVisible=data
        },
        set_currentStoryId:function (state,data) {
            console.log(data)
            state.storyParams.id=data;
        },
        set_storyContent:function (state, data) {
            state.storyContent=data.content;
        },
        set_privateStoryList:function (state,data) {
            state.privateStoryList=data
        },
        set_publicStoryList:function (state,data) {
            state.publicStoryList=data
        },

    },
    actions: {
        getStoryList:async ({state,commit})=>{
            const res=await getAllStoryAPI()
            commit('set_storyList',res)
        },
        getStoryParams:async ({state,commit})=>{
            const list=await getStoryHistoryAPI(state.storyParams.id)
            const depth=list.length-1
            console.log('history:',list)
            commit('set_storyParams',depth)
            commit('set_storyHistory',list)
            const res=await getStoryContentAPI(state.storyParams.id);
            commit('set_storyContent',res);
        }
        ,
        getAdventure:async ({state,commit,data})=> {
            const res = await getAdventureAPI();
            commit('set_storyList', res)
        },
        getRomantic:async ({state,commit,data})=> {
            const res = await getRomanticAPI();
            commit('set_storyList', res)
        },
        getSuspense:async ({state,commit,data})=> {
            const res = await getSuspenseAPI();
            commit('set_storyList', res)
        },
        getOther:async ({state,commit,data})=> {
            const res = await getOtherAPI();
            commit('set_storyList', res)
        },
        getHorror:async ({state,commit,data})=> {
            const res = await getHorrorAPI();
            commit('set_storyList', res)
        },
        getFunny:async ({state,commit,data})=> {
            const res=await getFunnyAPI();commit('set_storyList',res)
        },
        uploadStory:async ({state,commit},data)=>{
            const res=await uploadNewStoryAPI(data);
            commit('set_quickCreateModalVisible', false);
            const res2=await getAllStoryAPI()
            commit('set_storyList',res2)
        },
        getStoryByFather:async ({state,commit},data)=>{
            const res=await getStoryByFatherAPI(data);
            commit('set_recreateList',res);
        },
        getContentById:async ({state,commit},data)=>{
            const res=await getStoryContentAPI(data);
            commit('set_storyContent',res);
        },
        getPublicStory:async ({state,commit},data)=>{
            const res=await getPublicStoryAPI(data);
            commit('set_publicStoryList',res);
        },
        getPrivateStory:async ({state,commit})=>{
            const res=await getPrivateStoryAPI();
            commit('set_privateStoryList',res);
        },
    }
}
export default story