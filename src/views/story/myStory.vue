<template>
    <div style="padding: 150px 40px 0;width:75%;margin: 0 auto">
            <div class="list">
                <div class="table">
                    <div style="font-size: large ;padding-left: 20px;padding-bottom: 20px">我的创作 </div>
                    <a-list
                            :data-source="myList"
                            :pagination="pagination"
                            bordered
                    >
                        <a-list-item slot="renderItem" slot-scope="item">
                            <div style="width: 10%;text-align: center"><a-icon type="fire"/>{{item.popularity}}</div>
                            <div style="width: 30%;text-align: center;color: #4a76af" >{{item.rootTitle}}</div>
                            <a-popover title="故事简介" trigger="hover">
                                <template slot="content">
                                    <p>{{item.description}}</p>
                                </template>
                                <div style="width: 30%;text-align: center;color: #4a76af"  v-if="item.depth>0">续{{item.depth}}：{{item.title}}</div>
                                <div style="width: 30%;text-align: center;color: #4a76af" v-else>首篇</div>
                            </a-popover>
                            <div style="width: 15%;text-align: center"><a-icon type="tag"/>{{item.tag}}</div>
                            <div style="width: 15%;text-align: center"><a-icon type="eye" v-if="item.open"/><a-icon type="eye-invisible" v-if="!item.open"/></div>
                            <div style="width: 5%"></div>
                            <a-button shape="round" size="small" @click="writogether(item)">WriTogether!</a-button>
                        </a-list-item>
                    </a-list>
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
                console.log(this.storyList);
                for (let i = 0; i < this.storyList.length; i++) {
                    if (this.storyList[i].authorId == this.userId) {
                        let obj = {};
                        obj.id=this.storyList[i].id;
                        obj.rootTitle=this.storyList[i].rootTitle;
                        obj.open=this.storyList[i].open;
                        obj.authorName=this.storyList[i].authorName;
                        obj.popularity = this.storyList[i].popularity;
                        obj.title = this.storyList[i].title;
                        obj.depth = this.storyList[i].depth;
                        obj.tag = this.storyList[i].tag;
                        console.log(obj)
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
            padding: 15px 20px;
            border-radius: 10px;

        }
    }
</style>
