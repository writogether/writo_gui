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
    storyComments: state=>state.story.storyComments,
}

export default getters