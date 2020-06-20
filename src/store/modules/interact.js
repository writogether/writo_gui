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
            const res=await sendCommentAPI(data);
            const res2=await getCommentAPI(data.storyId);
            commit('set_storyComment',res2);
        },
        getEval:async ({state,commit},storyId)=>{
            const res= await getEvalAPI(storyId);
            return res.type;
        },
        evalStory:async ({state,commit},data)=>{
            const res=await evaluateAPI(data);
        },
        toggleCollect:async ({state,commit},storyId)=>{
            const res=await toggleCollectAPI(storyId);
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