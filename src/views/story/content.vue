<template>
    <div class="content">
        <a-layout class="a_layout">
            <a-layout-content class="story_board">
                <div class="items" style="font-size: 30px;text-align: center;padding-top: 30px">
                    <span class="value">{{ storyParams.title }}</span>
                </div>
                <a-divider></a-divider>
                <div class="items-text" style="font-size: 20px;text-align: center">
                    <span class="value">{{ storyParams.storyContent }}</span>
                </div>
                <!--
                <div class="items-recreate">
                    <p style="text-align:right;"><button class="button"><li v-for="fatherId in storyParams" :key="fatherId">
                        {{storyParams.title}}
                    </li></button></p>
                </div>
                -->
                <a-divider></a-divider>
                <h3><strong><span style="color:blue;font-weight:bold">发表评论</span></strong></h3>
                <p><textarea rows="10" cols="90" class="text-area" placeholder="在此发表"></textarea></p>
                <p style="text-align:right;"><button class="button">发表</button></p>
            </a-layout-content>
       </a-layout>
   </div>
</template>
<script>
    import { mapGetters, mapActions, mapMutations } from 'vuex'
    //import  from './components/'
    export default{
        name: "content",
        component: {

        },
        data(){
            return{

            }
        },
        computed:{
            ...mapGetters([
                'storyParams'
            ])
        },
        mounted() {
            console.log(this.$route.params.id),
            this.set_currentStoryId(Number(this.$route.params.id))
            this.getStoryById(this.storyParams.id)
            this.getContentById(this.storyParams.id)
            console.log(this.storyParams)
        },
        beforeRouteUpdate(to, from, next) {

        },
        methods: {
            ...mapMutations([
                'set_currentStoryId',
            ]),
            ...mapActions([
                'getStoryById',
                'getContentById'
            ])
        }
    }
</script> <style scoped>
    .content{
        background: none;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        padding: 220px 100px;

    }
    .a_layout{
        background-color: #313c5b;
        padding: 7px;
        border-radius: 20px;
    }
    .story_board{
        background: whitesmoke;
        padding: 0px 100px;
        border-radius: 20px;

    }
    .value{
        color: #313c5b;
    }
    .button{

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
    .button{
        background-color: #555555;
        font-size: 16px;
        width: 25px;
        border-radius: 8px;
        box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
    }
</style>
