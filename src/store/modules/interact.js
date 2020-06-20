import {
    sendCommentAPI,
    getCommentAPI,
    getEvalAPI,
    evaluateAPI,
    checkIfCollectedAPI,
    toggleCollectAPI,
    getCollection,
} from"../../api/interact";

const interact = {
    state: {
        storyComments:[],
        evaluation:'none',
        collected:false,
        collectionList:[]

    },
    mutations: {
        set_storyComment:function (state, data) {
            state.storyComments=data;
        },
        set_eval:function (state, data) {
            state.evaluation=data.type;
        },
        set_collected:function (state, data) {
            state.collected=data;
        },
        reverse_collected:function (state) {
            state.collected=!state.collected;
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
            const res=await sendCommentAPI(data);
            const res2=await getCommentAPI(data.storyId);
            commit('set_storyComment',res2);
        },
        getEval:async ({state,commit},storyId)=>{
            const res=await getEvalAPI(storyId);
            if(res)commit('set_eval',res);
        },
        evalStory:async ({state,commit},data)=>{
            const res=await evaluateAPI(data);
            const res2=await getEvalAPI(data.storyId);
            if(res)commit('set_eval',res2);
        },
        toggleCollect:async ({state,commit},storyId)=>{
            const res=await toggleCollectAPI(storyId);
            commit('reverse_collected');
        }
        ,
        checkIfCollected:async ({state,commit},storyId)=>{
            const res=await checkIfCollectedAPI(storyId);
            commit('set_collected',res);
        },
        getCollection:async ({state,commit})=>{
            const res=await getCollection();
            commit('set_collections',res);
        }

    }
}
export default interact