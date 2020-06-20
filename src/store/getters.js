const getters = {
	//user
	token: state => state.user.token,
	userId: state => state.user.userId,
	userInfo: state => state.user.userInfo,
    //story
    storyList:state=>state.story.storyList,
    recreateList:state=>state.story.recreateList,
    storyParams: state => state.story.storyParams,
    quickCreateModalVisible:state=>state.story.quickCreateModalVisible,

    //interact
    storyComments: state=>state.interact.storyComments,
    evaluation:state=>state.interact.evaluation,
    collected:state=>state.interact.collected,
    collectionList:state=>state.interact.collectionList
}

export default getters