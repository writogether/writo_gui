<template>
    <div style="padding-top: 195px ;width:75%;margin: 0 auto">
        <div class="content">
        <a-layout class="a_layout">
            <a-layout-content class="story_board">
                <div  style="font-size: 30px;text-align: center;padding-top: 20px">
                    <span class="value">{{ storyParams.title }}</span>
                </div>
                <div  style="font-size: 15px;text-align: center;padding-top: 30px">
                    <span class="value" style="padding: 0 20px"><a-icon type="fire"/> {{storyParams.popularity}}</span>
                    <span class="value" style="padding: 0 20px"><a-icon type="user"/> {{ storyParams.authorName }}</span>
                    <span class="value" style="padding: 0 20px" v-if="storyParams.depth>0"><a-icon type="edit"/> 第{{ storyParams.depth }}续篇</span>
                    <span class="value" style="padding: 0 20px" v-else><a-icon type="edit"/> 首篇</span>

                </div>

                <a-divider></a-divider>
                <div style="font-size: 20px;text-align: left">
                    <span class="value">{{ storyParams.story }}</span>
                </div>
                <a-divider></a-divider>
                <div style="font-size: 20px;text-align: center">
                    <span style="padding: 0 20px">
                        <a-button-group  v-if="evaluation==='none'">
                            <a-button @click="likeEval"><a-icon type="like"/>like</a-button>
                            <a-button @click="dislikeEval"><a-icon type="dislike"/>dislike</a-button>
                        </a-button-group>
                        <span v-if="evaluation==='Like'"><a-icon type="smile"/> Like it!</span>
                        <span v-if="evaluation==='Dislike'"><a-icon type="meh"/> Emm..</span>
                    </span>
                    <span style="padding: 0 20px"><a-button><a-icon type="star"/>收藏</a-button></span>
                </div>
                <div style="padding-bottom: 30px"></div>
            </a-layout-content>
       </a-layout>
    </div>
        <div style="padding: 40px 50px">
            <div  v-if="storyParams.depth>0">
            <p style="text-align: center">回溯前篇</p>
            <a-row >
                <a-col :span="12">
                    <a-slider v-model="inputValue1" :min="0" :max="storyParams.depth"  />
                </a-col>
                <a-col :span="4">
                    <a-input-number v-model="inputValue1" :min="0" :max="storyParams.depth"   />
                </a-col>
            </a-row>
        </div>
            <a-divider style="padding: 40px 0;text-align: center"><a-button  @click="set_find_recreate">寻找续篇</a-button></a-divider>
            <div v-if="find_recreate">
                <a-list
                        :data-source="recreateList"
                        :pagination="pagination"
                        bordered
                >
                    <a-list-item slot="renderItem" slot-scope="item">
                        <div style="width: 10%;text-align: center">热度{{item.popularity}}</div>
                        <div style="width: 40%;text-align: center">《{{ item.title }}》</div>
                        <div style="width: 10%;text-align: center">{{ item.userName }}</div>
                        <div style="width: 15%;text-align: center">{{item.tag}}</div>
                        <div style="width: 5%"></div>
                        <a-button  shape="round" size="small"  @click="writogether(item)">WriTogether!</a-button>
                    </a-list-item>
                </a-list>
            </div>
            <a-divider style="padding-bottom: 20px">评论区</a-divider>
            <div style="width:60%;float: left">
                <a-list
                    :data-source="storyComments"
                    :pagination="pagination"
                    style="height: 360px"
                    bordered>

                    <a-list-item slot="renderItem" slot-scope="item">
                        <div style="font-size: 16px">{{item.userName}} : {{item.content}}</div>
                    </a-list-item>
                </a-list>
            </div>
            <div style="width:30%;float: right;" >
                <h3 style="padding: 20px 0 "><span style="color:#313c5b;font-weight:bold;">发表评论</span></h3>
                <p><a-textarea rows="10"   placeholder="在此发表" id="comment_content" ></a-textarea></p>
                <p style="text-align:right;"><a-button class="button" @click="Comment">发表</a-button></p>
            </div>
        </div>
</div>
</template>
<script>
    import { mapGetters, mapActions, mapMutations } from 'vuex'
    import AListItem from "ant-design-vue/es/list/Item";
    //import  from './components/'
    export default{

        name: "content",
        components: {AListItem},
        component: {
        },
        data(){
            return{
                pagination:{
                    pageSize:6
                },
                inputValue1: 0,
                find_recreate:false,
            }
        },
        computed:{
            ...mapGetters([
                'storyParams',
                'storyComments',
                'userId',
                'recreateList',
                'evaluation',
                'collected'
            ])
        },
        mounted() {
            console.log(this.$route.params.id),
            this.set_currentStoryId(Number(this.$route.params.id))
            this.getStoryById(this.storyParams.id)
            this.getContentById(this.storyParams.id)
            this.getCommentById(this.storyParams.id)
            this.inputValue1=Number(this.storyParams.depth)
            this.getEval(this.storyParams.id)
            console.log(this.evaluation)
            this.checkIfCollected(this.storyParams.id)
        },
        beforeRouteUpdate(to, from, next) {

        },
        methods: {
            ...mapMutations([
                'set_currentStoryId',
            ]),
            ...mapActions([
                'getStoryById',
                'getContentById',
                'getCommentById',
                'sendComment',
                'getStoryByFather',
                'getEval',
                'checkIfCollected',
                'evalStory'

            ]),
            likeEval(){
                const evalData={
                    likerId:this.userId,
                    storyId:this.storyParams.id,
                    type:'Like'
                };
                this.evalStory(evalData);
            },
            dislikeEval(){
                const evalData={
                    likerId:this.userId,
                    storyId:this.storyParams.id,
                    type:'Dislike'
                };
                this.evalStory(evalData);
            }
            ,
            set_find_recreate(){
                this.find_recreate=!this.find_recreate;

                if(this.find_recreate){
                    this.getStoryByFather(this.storyParams.id);
                }
            }
            ,
            Comment(){
                const data={
                    storyId:this.storyParams.id,
                    commenterId:this.userId,
                    content:document.getElementById('comment_content').value
                }
                document.getElementById("comment_content").value='';
                this.sendComment(data);

            }
        }
    }
</script>
<style scoped>
    .content{
        background: none;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;

    }
    .a_layout{
        background-color: #313c5b;
        padding: 7px;
        border-radius: 20px;
    }
    .story_board{
        background: whitesmoke;
        padding: 10px 100px;
        border-radius: 20px;

    }
    .value{
        color: #313c5b;
    }
    .items{
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;

    }
    .text-area{
        width: 90%;
        margin: 0.75rem  0;
        padding-left: 1.125rem;
        height: 6.5rem ;
        word-wrap:break-word;
    }

</style>
