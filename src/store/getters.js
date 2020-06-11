const getters = {
	//user
	token: state => state.user.token,
	userId: state => state.user.userId,
	userInfo: state => state.user.userInfo,
    //story
    storyContent: state => state.story.storyContent,
    recreateList: state => state.story.recreateList,
    storyParams: state => state.user.storyParams
}

export default getters