import {
    sendCommentAPI,
    getCommentAPI,
    getEvalAPI,
    evaluateAPI,
    checkIfCollectedAPI,
    toggleCollectAPI,
    getCollection,
} from"../../api/interact";
import {message} from "ant-design-vue";

const interact = {
    state: {
        storyComments:[],
        collectionList:[]

    },
    mutations: {
        set_storyComment:function (state, data) {
            state.storyComments=data;
        },
        set_collections:function (state, data) {
            state.collectionList=data;
        }

    },
    actions: {
        getCommentById:async ({state,commit},data)=>{
            const res=await getCommentAPI(data);
            commit('set_storyComment',res);
        },
        sendComment:async ({state,commit},data)=>{
            if(data.content=='')message.error('评论不能为空！')
            else {
                const res = await sendCommentAPI(data);
                const res2 = await getCommentAPI(data.storyId);
                commit('set_storyComment', res2);
            }
        },
        getEval:async ({state,commit},storyId)=>{
            const res= await getEvalAPI(storyId);
            return res.type;
        },
        evalStory:async ({state,commit},data)=>{
            const res=await evaluateAPI(data);
            message.success('评价成功');
        },
        toggleCollect:async ({state,commit},data)=>{
            const res=await toggleCollectAPI(data.storyId);
            console.log(data.status)
            if(data.status)message.success('收藏成功');
            else message.success('取消收藏成功');
        }
        ,
        checkIfCollected:async ({state,commit},storyId)=>{
            const res= await checkIfCollectedAPI(storyId);
            return res;
        },
        getCollection:async ({state,commit})=>{
            const res=await getCollection();
            commit('set_collections',res);
        }

    }
}
export default interact