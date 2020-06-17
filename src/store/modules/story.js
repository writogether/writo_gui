import {
    getStoryContentAPI,
    recreateAPI,
} from '@/api/story'
import { message } from 'ant-design-vue'
import {
    getAdventureAPI,
    getAllStoryAPI, getFunnyAPI, getHorrorAPI,
    getOtherAPI,
    getRomanticAPI,
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
        },
        storyContentParams:{
            id:'',
            content:''
        },
        currentStoryInfo:[

        ],
        quickCreateModalVisible:false,
    },
    mutations: {
        set_storyList:function (state,data) {
            state.storyList=data
        },
        set_quickCreateModalVisible:function (state,data) {
            state.quickCreateModalVisible=data
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

        }
    }
}
export default story