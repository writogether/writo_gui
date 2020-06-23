<template>
    <div style="padding: 150px 40px 0;width:75%;margin: 0 auto">
        <div style="padding-top: 20px ;margin: 0 auto">
            <div class="list">
                <div class="table">
                    <a-list
                            :data-source="collectionList"
                            :pagination="pagination"
                            bordered
                    >
                        <a-list-item slot="renderItem" slot-scope="item">
                            <div style="width: 10%;text-align: center"><a-icon type="fire"/>{{item.popularity}}</div>
                            <a-popover title="故事简介" trigger="hover">
                                <template slot="content">
                                    <p>{{item.description}}</p>
                                </template>
                                <div style="width: 40%;text-align: center;color: #4a76af"  v-if="item.depth>0">《{{item.rootTitle}}》-第{{item.depth}}续-《{{item.title}}》</div>
                                <div style="width: 40%;text-align: center;color: #4a76af" v-else>《{{item.title}}》-首篇</div>
                            </a-popover>
                            <div style="width: 15%;text-align: center"><a-icon type="user"/>{{ item.userName }}</div>
                            <div style="width: 15%;text-align: center"><a-icon type="tag"/>{{item.tag}}</div>
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
        name: 'myCollection',
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
            await this.getCollection();
            await this.add();
        },
        computed: {
            ...mapGetters(
                [
                    'collectionList',
                    'userId',
                    'userInfo',
                ],
            ),
        },
        methods: {
            ...mapMutations(
                [
                    'set_collections',
                ],
            ),
            ...mapActions(
                [
                    'getCollection',
                ],
            ),
            add() {
                console.log(this.storyList.length);
                for (let i = 0; i < this.storyList.length; i++) {
                    if (this.storyList[i].authorId === this.userId) {
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
            background: #ffffff;
            padding: 40px 20px;
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
        }
    }
</style>
