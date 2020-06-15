import {
    getStoryContentAPI,
    recreateAPI,
} from '@/api/story'
import { message } from 'ant-design-vue'
import {getAllStoryAPI} from "../../api/story";

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

        ]
    },
    mutations: {
        set_storyList:function (state,data) {
            state.storyList=data
        }

    },
    actions: {
        getStoryList:async ({state,commit})=>{
            const res=await getAllStoryAPI()
            commit('set_storyList',res)
        }

    }
}
export default story