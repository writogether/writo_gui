<template>
        <div style="padding-top: 150px ;width:75%;margin: 0 auto">
        <div style="padding-top: 20px ;margin: 0 auto">
            <div class="list">
                <div class="table">
                    <a-list
                            :data-source="myList"
                            :pagination="pagination"
                            bordered
                    >
                        <a-list-item slot="renderItem" slot-scope="item">
                            <div style="width: 10%;text-align: center"><a-icon type="fire"/>{{item.popularity}}</div>
                            <div style="width: 30%;text-align: center">《{{ item.title }}》</div>
                            <div style="width: 20%;text-align: center"  v-if="item.depth>0"><a-icon type="edit"/>第{{item.depth}}续篇</div>
                            <div style="width: 20%;text-align: center" v-else><a-icon type="edit"/>首篇</div>
                            <div style="width: 10%;text-align: center"><a-icon type="tag"/>{{item.tag}}</div>
                            <div style="width: 5%"></div>
                            <a-button shape="round" size="small" @click="writogether(item)">WriTogether!</a-button>
                        </a-list-item>
                    </a-list>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import {mapActions, mapGetters, mapMutations} from 'vuex';

    export default {
        name: 'myStory',
        components: {},
        data() {
            return {
                pagination: {
                    pageSize: 12,
                },
                myList: [],
            };
        },
        async mounted() {
            await this.getStoryList();
            await this.add();
        },
        computed: {
            ...mapGetters(
                [
                    'storyList',
                    'userId',
                    'userInfo',
                ],
            ),
        },
        methods: {
            ...mapMutations(
                [
                    'set_storyList',
                ],
            ),
            ...mapActions(
                [
                    'getStoryList',
                ],
            ),
            add() {
                console.log(this.storyList.length);
                for (let i = 0; i < this.storyList.length; i++) {
                    if (this.storyList[i].authorId == this.userId) {
                        let obj = {};
                        obj.popularity = this.storyList[i].popularity;
                        obj.title = this.storyList[i].title;
                        obj.depth = this.storyList[i].depth;
                        obj.tag = this.storyList[i].tag;
                        this.myList.push(obj);
                    }
                }
            },
            writogether(record) {
                console.log(record);
                this.$router.push({
                    name: 'storyContent',
                    params: {
                        id: record.id,
                    },
                });
            },

        },

    };
</script>
<style scoped lang="less">
    .list {
        border-radius: 10px;
        padding: 6px 6px;
        position: static;
        background-color: #313c5b;

        .table {
            background:#ffffff;
            padding: 40px 20px;
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
        }
    }
</style>
