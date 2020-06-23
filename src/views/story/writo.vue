<template>
    <div style="padding-top: 150px ;padding-left:50px;padding-right: 50px;width:75%;margin: 0 auto">
        <div class="a_layout">
            <div class="story_board">
                <a-textarea style="font-size: 16px;" id="title" placeholder="请给故事取一个标题吧！"></a-textarea>
                <div style="padding: 10px 0"></div>
                <a-textarea style="font-size: 16px;" id="description" placeholder="简要地介绍一下你的故事吧！"></a-textarea>
                <div style="padding: 10px 0"></div>
                <div class="search_card">
                    <span >选择故事类型：</span>
                    <a-select v-model="storyType"
                              style="width: 15%"
                    >
                        <a-select-option value='1'>Adventure</a-select-option>
                        <a-select-option value='2'>Romantic</a-select-option>
                        <a-select-option value='3'>Suspense</a-select-option>
                        <a-select-option value='4'>Other</a-select-option>
                        <a-select-option value='5'>Horror</a-select-option>
                        <a-select-option value='6'>Funny</a-select-option>
                    </a-select>
                    <span style="padding-left: 5%;">是否公开：</span>
                    <a-select
                            style="width: 15%"
                            v-model="setOpen"
                    >
                        <a-select-option value='0'>是</a-select-option>
                        <a-select-option value='1'>否</a-select-option>
                    </a-select>
                    <a-divider></a-divider>
                </div>
                <div class="text">
                    <a-textarea placeholder="请开始你的创作吧！"  style="height: 500px;font-size: 16px" id="creation"></a-textarea>
                </div>
                 <a-divider></a-divider>
                <a-popconfirm
                        placement="topLeft"
                        ok-text="Yes"
                        cancel-text="No"
                        title="是否确认提交？"
                        @confirm="submit"
                >
                    <a-button  >上传作品</a-button>
                </a-popconfirm>

            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions, mapMutations } from 'vuex'
    import ATextarea from "ant-design-vue/es/input/TextArea";
    export default {
        name: "recreate",
        components:{ATextarea},
        data(){
            return{
                storyType:'',
                setOpen:''
            }
        },
        computed:{
            ...mapGetters([
                'userId'
            ])
        },
        async mounted(){

        },
        methods: {
            ...mapMutations([
            ]),
            ...mapActions([
                'uploadStory'
            ]),
            submit(){
                const data={
                    fatherId:0,
                    authorId:this.userId,
                    title:document.getElementById("title").value,
                    open:this.setOpen==='0',
                    description:document.getElementById("description").value,
                    content:document.getElementById("creation").value,
                    tag:this.storyType,
                }
                console.log(data);
                this.uploadStory(data);
                this.$router.push({name:'home'});
            }
        }
    }

</script>

<style scoped>
    .a_layout{
        background-color: #313c5b;
        padding: 7px;
        border-radius: 20px;
    }
    .story_board{
        height: 950px;
        background: white;
        padding: 50px 100px;
        border-radius: 20px;

    }
    .search_card{
        padding: 10px 0;
    }
</style>