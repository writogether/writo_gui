const getters = {
	//user
	userId: state => state.user.userId,
	userInfo: state => state.user.userInfo,

    //story
    storyList:state=>state.story.storyList,
    recreateList:state=>state.story.recreateList,
    storyHistory:state=>state.story.storyHistory,
    storyContent:state=>state.story.storyContent,
    storyParams: state => state.story.storyParams,
    quickCreateModalVisible:state=>state.story.quickCreateModalVisible,
    collection:state=>state.story.getCollection,

    //interact
    storyComments: state=>state.interact.storyComments,
    collectionList:state=>state.interact.collectionList
}

export default getters
