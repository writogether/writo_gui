<template>
    <div class="writing_board">
        <div class="search_card">
            <span >选择故事类型：</span>

            <a-select v-model="storyType"
                      v-decorator="[
            'storyType',
            { rules: [{ required: true, message: '请选择故事类型' }] }]"
                      @change="changeStoryType"

            >
                <a-select-option value='1'>Adventure</a-select-option>
                <a-select-option value='2'>Romantic</a-select-option>
                <a-select-option value='3'>Suspense</a-select-option>
                <a-select-option value='4'>Other</a-select-option>
                <a-select-option value='5'>Horror</a-select-option>
                <a-select-option value='6'>Funny</a-select-option>
            </a-select>
            <a-divider></a-divider>
        </div>
    <div class="text">
        <a-textarea placeholder="请开始你的创作吧！"  cols="90" rows="30"></a-textarea>
    </div>
        <a-divider></a-divider>
        <a-button class="button" type="primary"  >上传作品</a-button>
    </div>
</template>

<script>
    import { mapGetters, mapActions, mapMutations } from 'vuex'
    export default {
        name: "recreate",
        components:{},
        data(){
            return{
                storyType:'Adventure',
            }
        }
    }

</script>

<style scoped>
    .writing_board {
        font-size: 18px;
        padding-top: 150px;
        padding-left: 400px;
        .button {
        }

        .text {
            position: center;
            width: 300px;
            height: 500px;
            border-top: 1px solid gainsboro;
            border-bottom: 1px solid gainsboro;
        }
    }
</style>