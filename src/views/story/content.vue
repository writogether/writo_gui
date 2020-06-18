<template>
    <div style="padding-top: 195px ;width:75%;margin: 0 auto">
    <div class="content">
        <a-layout class="a_layout">
            <a-layout-content class="story_board">
                <div class="items" style="font-size: 30px;text-align: center;padding-top: 20px">
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
                <div style="padding-bottom: 30px"></div>
            </a-layout-content>
       </a-layout>
   </div>
        <a-divider></a-divider>
        <div class="content">
            <a-layout class="a_layout">
                <a-layout-content class="story_board">
                    <h3 style="padding: 20px 0 "><span style="color:#313c5b;font-weight:bold;">发表评论</span></h3>
                    <p><a-textarea rows="10" cols="90"  placeholder="在此发表"></a-textarea></p>
                    <p style="text-align:right;"><a-button class="button">发表</a-button></p>
                </a-layout-content>
            </a-layout>
        </div>
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
