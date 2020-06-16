<template>
    <div class="storyList">
        <div>
            <div class="start_button" >
                <a-button @click="write" size="large" type="primary" shape="round">
                    <a-icon type="plus"/>
                    创作你的新故事！
                </a-button>
            </div>
            <div class="search_card">
            <span >选择故事类型：</span>
            <a-select v-model="storyType"
                v-decorator="[
                'storyType',
                { rules: [{ required: true, message: '请选择故事类型' }] }]"
                @change="changeStoryType"

            >
                <a-select-option value='0'>All Stories</a-select-option>
                <a-select-option value='1'>Adventure</a-select-option>
                <a-select-option value='2'>Romantic</a-select-option>
                <a-select-option value='3'>Suspense</a-select-option>
                <a-select-option value='4'>Other</a-select-option>
                <a-select-option value='5'>Horror</a-select-option>
                <a-select-option value='6'>Funny</a-select-option>
            </a-select>
            </div>
            <a-divider></a-divider>
        </div>
        <div class="table">
        <a-table
            :columns="columns_storyList"
            :dataSource="storyList"
            size="medium"
            bordered
        >
            <span slot="action" >
                <button type="primary">👍 {{like_count}}</button>
            </span>
            <span slot="action" >
                <button type="danger">👎 {{dislike_count}}</button>
            </span>
            <span slot="action" >
                <button type="primary">❤ {{collect}}</button>
            </span>
        </a-table>
        </div>
        <a-divider></a-divider>
        <QuickCreateModal></QuickCreateModal>
    </div>
</template>

<script>
    import { mapGetters, mapActions, mapMutations } from 'vuex'
    import QuickCreateModal from './quickCreate'
    const columns_storyList=[
        {
            title:'id',
            dataIndex:'id',
        },
        {
            title:'标题',
            dataIndex:'title',
        },
        {
            title:'续写者',
            dataIndex:'authorId',
        },
        {
            title:'类型',
            dataIndex:'tag'
        },
        {
            title: '操作',
            key: 'action',
            scopedSlots: { customRender: 'action' },
        },

    ];
    export default {
        name: "storyList",
        components:{
            QuickCreateModal
        },
        data(){
            return{
                like_count:0,
                dislike_count:0,
                collect:0,
                columns_storyList,
                storyType:'All Stories'
            }
        },
        async mounted(){
            await this.getStoryList()
            console.log(this.storyList)
        },
        computed:{
            ...mapGetters(
                [
                    'storyList',
                ]
            )
        },
        methods:{
            ...mapMutations(
                [
                    'set_storyList',
                    'set_quickCreateModalVisible'
                ]
            ),
            ...mapActions(
                [
                    'getStoryList',
                    'getAdventure',
                    'getRomantic',
                    'getSuspense',
                    'getOther',
                    'getHorror',
                    'getFunny'
                ]
            ),
            async changeStoryType(v){
                this.storyType=v
                switch (v) {
                    case '0':
                        await this.getStoryList();
                        break;
                    case '1':
                        await this.getAdventure();break;
                    case '2':
                        await this.getRomantic();break;
                    case '3':
                        await this.getSuspense();break;
                    case '4':
                        await this.getOther();break;
                    case '5':
                        await this.getHorror();break;
                    case '6':
                        await this.getFunny();break;
                }
            },

            write(){
                this.set_quickCreateModalVisible(true);
            }
        },



    }
</script>

<style scoped lang="less">
    .storyList {
        font-size: medium;
        padding: 150px;
        position: center;
        .search_card{
            padding: 20px;
            float: left;
        }
        .start_button{
             float:right;
             margin:20px 0;
        }


    }
</style>