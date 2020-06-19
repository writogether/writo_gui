<template>
    <div style="padding-top: 195px ;width:75%;margin: 0 auto">
    <div class="content">
        <a-layout class="a_layout">
            <a-layout-content class="story_board">
                <div  style="font-size: 30px;text-align: center;padding-top: 20px">
                    <span class="value">{{ storyParams.title }}</span>
                </div>
                <div  style="font-size: 15px;text-align: center;padding-top: 30px">
                    <span class="value" >热度：{{storyParams.popularity}}</span>
                    <span style="padding: 0 40px"></span>
                    <span class="value" >作者：{{ storyParams.authorName }}</span>
                    <span style="padding: 0 40px"></span>
                    <span class="value"  v-if="storyParams.depth>0">第{{ storyParams.depth }}续篇</span>
                    <span class="value"  v-else>首篇</span>

                </div>

                <a-divider></a-divider>
                <div style="font-size: 20px;text-align: left">
                    <span class="value">{{ storyParams.story }}</span>
                </div>
                <div style="padding-bottom: 30px"></div>
            </a-layout-content>
       </a-layout>
   </div>

        <div style="padding: 40px 50px">
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
                }
            }
        },
        computed:{
            ...mapGetters([
                'storyParams',
                'storyComments',
                'userId'
            ])
        },
        mounted() {
            console.log(this.$route.params.id),
            this.set_currentStoryId(Number(this.$route.params.id))
            this.getStoryById(this.storyParams.id)
            this.getContentById(this.storyParams.id)
            this.getCommentById(this.storyParams.id)
            console.log(this.storyParams)
            console.log(this.storyComments)
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
                'sendComment'
            ]),
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
