<template>
    <div class="storyList">
        <a-table
            :columns="columns_storyList"
            :datasrc="storyList"
            bordered
        >
            <span>
                <a-button size="small">👍 {{like_count}}</a-button>
            </span>
            <span>
                <a-button size="small">👎 {{dislike_count}}</a-button>
            </span>
            <span>
                <a-button size="small">❤ {{collect}}</a-button>
            </span>
        </a-table>
    </div>
</template>

<script>
    import { mapGetters, mapActions, mapMutations } from 'vuex'
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
            dataIndex:'author_id',
        },
        {
            title:'类型',
            dataIndex:'tag'
        }
    ];
    export default {
        name: "storyList",
        components:{

        },
        data(){
            return{
                like_count:0,
                dislike_count:0,
                collect:0,
                columns_storyList
            }
        },
        async mounted(){
            await this.getStoryList()
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
                []
            ),
            ...mapActions(
                [
                    'getStoryList'
                ]
            )
        },


    }
</script>

<style scoped lang="less">
    .storyList {
        padding: 50px;
        .chart {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 20px
        }
    }
</style>