import {
    getStoryContentAPI,
    recreateAPI,
} from '@/api/story'
import { message } from 'ant-design-vue'
import {
    getAdventureAPI,
    getAllStoryAPI, getFunnyAPI, getHorrorAPI,
    getOtherAPI,
    getRomanticAPI, getStoryByIdAPI,
    getSuspenseAPI, uploadNewStoryAPI
} from "../../api/story";

const story = {
    state: {
        storyList:[],
        recreateList: [
        ],
        Visible: false,
        storyParams: {
            id:'',
            fatherId:'',
            title:'',
            tag:'',
            depth:'',
            popularity:'',
            storyContent:'',
        },

        quickCreateModalVisible:false,
    },
    mutations: {
        set_storyList:function (state,data) {
            state.storyList=data
        },
        set_quickCreateModalVisible:function (state,data) {
            state.quickCreateModalVisible=data
        },
        set_currentStoryId:function (state,data) {
            console.log(data)
            state.storyParams.id=data;
        },
        set_storyParams:function (state, data) {
            state.storyParams.fatherId=data.fatherId;
            state.storyParams.title=data.title;
            state.storyParams.tag=data.tag;
            state.storyParams.popularity=data.popularity;
            state.storyParams.depth=data.depth;
        },
        set_storyContent:function (state, data) {
            state.storyParams.storyContent=data.content;
        }

    },
    actions: {
        getStoryList:async ({state,commit})=>{
            const res=await getAllStoryAPI()
            commit('set_storyList',res)
        },
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
        },
        getStoryById:async ({state,commit},data)=>{
            const res=await getStoryByIdAPI(data);
            commit('set_storyParams',res);
        },
        getContentById:async ({state,commit},data)=>{
            const res=await getStoryContentAPI(data);
            commit('set_storyContent',res);
        }
    }
}
export default story