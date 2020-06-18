<template>
    <div style="padding: 100px 200px;">
    <div class="storyList">
        <div style="background: #ffffff;padding: 20px 40px;border-top-left-radius: 10px;border-top-right-radius: 10px">
            <span style="font-size: large ">选择故事类型：</span>
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

        <a-button  @click="write" size="large"  shape="round" style="float: right">
            <a-icon type="plus"/>
            创作你的新故事！
        </a-button></div>
        <div class="table" >
        <a-table
            :columns="columns_storyList"
            :dataSource="storyList"
            :pagination="pagination"
            bordered
        >
            <span slot="action" slot-scope="record">
                <a-button style="background-color:aliceblue;color: #313c5b" shape="round" @click="writogether(record)">WriTogether!</a-button>
            </span>
        </a-table>
        </div>
        <QuickCreateModal></QuickCreateModal>
    </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions, mapMutations } from 'vuex'
    import QuickCreateModal from './quickCreate'
    const columns_storyList=[
        {
            title:'热度',
            dataIndex:'popularity',
            width:'10%',
        },
        {
            title:'标题',
            dataIndex:'title',
            width:'40%'
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
            title:'续次',
            dataIndex:'depth'
        },
        {
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
                storyType:'All Stories',
                popularity:0,
                pagination:{
                    pageSize:6
                }
            }
        },
         mounted(){
             this.getStoryList()
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
            },
            writogether(record){
                console.log(record)
                this.$router.push({
                    path:'/storyContent',
                    name:'content',
                    params:{
                        id:record.id
                    }
                })
            }

        },



    }
</script>

<style scoped lang="less">
    .storyList {
        border-radius: 10px;
        padding: 6px 6px;
        position: static;
        background-color:#313c5b;

        .table{
            background: #f0f2f5;
            padding: 40px 20px;
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;

        }


    }
</style>