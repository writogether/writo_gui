<template>
    <div class="content">
        <a-layout>
            <a-layout-content>
                <div class="items" v-if="currentStoryParams.title">
                    <span class="value">{{ currentStoryParams.title }}</span>
                </div>
                <div class="items-text" v-if="currentStoryContentParams.content">
                    <span class="value">{{ currentStoryContentParams.content }}</span>
                </div>
                <div class="items-recreate">
                    <p style="text-align:right;"><button class="button"><li v-for="fatherId in storyParams" :key="fatherId">
                        {{storyParams.title}}
                    </li></button></p>
                </div>
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
            return
        },
        computed:{
            ...mapGetters([
                'currentStoryContentParams',
                'currentStoryParams',
                'storyParams'
            ])
        },
        mounted() {
            this.set_currentStoryId(Number(this.$route.params.storyId))
            this.getContentById()
        },
        beforeRouteUpdate(to, from, next) {

        },
        methods: {
            ...mapMutations([
                'set_currentStoryId',
            ]),
            ...mapActions([
                'getStoryTitleById',
                'getContentById'
            ])
        }
    }
</script> <style scoped>
    .button{

    }
    .items{

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
