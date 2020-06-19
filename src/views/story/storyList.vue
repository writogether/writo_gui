<template>
    <div style="padding-top: 150px ;width:75%;margin: 0 auto">
        <div class="storyList">
            <div style="background: #ffffff;padding: 20px 40px;border-top-left-radius: 10px;border-top-right-radius: 10px">
                <span style="font-size: large ">选择故事类型：</span>
                <a-select v-model="storyType"
                          v-decorator="[
                              'storyType',
                              { rules: [{ required: true, message: '请选择故事类型' }] }]"
                          @change="changeStoryType"
                >
                    <a-select-option value='All'>All Stories</a-select-option>
                    <a-select-option value='Adventure'>Adventure</a-select-option>
                    <a-select-option value='Romantic'>Romantic</a-select-option>
                    <a-select-option value='Suspense'>Suspense</a-select-option>
                    <a-select-option value='Other'>Other</a-select-option>
                    <a-select-option value='Horror'>Horror</a-select-option>
                    <a-select-option value='Funny'>Funny</a-select-option>
                </a-select>
                
                <a-button @click="write" size="large" shape="round" style="float: right">
                    <a-icon type="plus" />
                    创作你的新故事！
                </a-button>
            </div>
            <div class="table">
                <a-list
                    :data-source="storyList"
                    bordered
                >
                    <a-list-item slot="renderItem" slot-scope="item">
                        <div style="width: 10%;text-align: center">热度{{item.popularity}}</div>
                        <div style="width: 40%;text-align: center">《{{ item.title }}》</div>
                        <div style="width: 10%;text-align: center" v-if="item.depth>0">第{{item.depth}}续</div>
                        <div style="width: 10%;text-align: center" v-else>首篇</div>
                        <div style="width: 20%;text-align: center">{{item.tag}}</div>
                        <div style="width: 5%"></div>
                        <a-button shape="round" size="small" @click="writogether(item)">WriTogether!</a-button>
                    </a-list-item>
                </a-list>
            </div>
            <QuickCreateModal></QuickCreateModal>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters, mapMutations} from 'vuex';
    import QuickCreateModal from './quickCreate';

    const columns_storyList = [
        {
            title: '热度',
            dataIndex: 'popularity',
            width: '10%',
        },
        {
            title: '标题',
            dataIndex: 'title',
            width: '40%',
        },
        {
            title: '续写者',
            dataIndex: 'authorId',
        },
        {
            title: '类型',
            dataIndex: 'tag',
        },
        {
            title: '续次',
            dataIndex: 'depth',
        },
        {
            key: 'action',
            scopedSlots: {customRender: 'action'},
        },

    ];
    export default {
        name: 'storyList',
        components: {
            QuickCreateModal,
        },
        data() {
            return {
                like_count: 0,
                dislike_count: 0,
                collect: 0,
                columns_storyList,
                storyType: 'All Stories',
                popularity: 0,
                pagination: {
                    pageSize: 6,
                },
            };
        },
        mounted() {
            this.getStoryList();
            console.log(this.storyList);
        },
        computed: {
            ...mapGetters(
                [
                    'storyList',
                ],
            ),
        },
        methods: {
            ...mapMutations(
                [
                    'set_storyList',
                    'set_quickCreateModalVisible',
                ],
            ),
            ...mapActions(
                [
                    'getStoryList',
                    'getByTag',
                ],
            ),
            async changeStoryType() {
                if (this.storyType === 'All') this.getStoryList();
                else this.getByTag({tag:this.storyType});
            },

            write() {
                this.set_quickCreateModalVisible(true);
            },
            writogether(record) {
                console.log(record);
                this.$router.push({
                    path: '/storyContent',
                    name: 'content',
                    params: {
                        id: record.id,
                    },
                });
            },

        },

    };
</script>

<style scoped lang="less">
    .storyList {
        
        border-radius: 10px;
        padding: 6px 6px;
        position: static;
        background-color: #313c5b;
        
        .table {
            background: #f0f2f5;
            padding: 40px 20px;
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
            
        }
        
        
    }
</style>
