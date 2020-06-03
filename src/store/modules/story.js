import {
    getStoryContentAPI,
    recreateAPI,
} from '@/api/story'
import { message } from 'ant-design-vue'

const story = {
    state: {
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

    },
    actions: {

    }
}
export default story