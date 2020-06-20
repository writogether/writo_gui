<template>
    <div style="padding-top: 150px ;width:75%;margin: 0 auto">
        <a-tabs default-active-key="1" :tab-position="left">
            <a-tab-pane key="1" tab="我的创作">
                <div style="padding-top: 20px ;width:75%;margin: 0 auto">
                    <div class="list" >
                        <div class="table">
                            <a-list
                                    :data-source="myList"
                                    :pagination="pagination"
                                    bordered
                            >
                                <a-list-item slot="renderItem" slot-scope="item">
                                    <div style="width: 10%;text-align: center">热度{{item.popularity}}</div>
                                    <div style="width: 30%;text-align: center">《{{ item.title }}》</div>
                                    <div style="width: 15%;text-align: center"  v-if="item.depth>0">第{{item.depth}}续篇</div>
                                    <div style="width: 15%;text-align: center" v-else>首篇</div>
                                    <div style="width: 15%;text-align: center">{{item.tag}}</div>
                                    <div style="width: 5%"></div>
                                    <a-button  shape="round" size="small"  @click="writogether(item)">WriTogether!</a-button>
                                </a-list-item>
                            </a-list>
                        </div>
                    </div>
                </div>
            </a-tab-pane>
            <a-tab-pane key="2" tab="我的收藏">
                <div style="padding-top: 20px ;width:75%;margin: 0 auto">
                    <div class="list" >
                    <div class="table">
                        <a-list
                                :data-source="collectionList"
                                :pagination="pagination"
                                bordered
                        >
                            <a-list-item slot="renderItem" slot-scope="item">
                                <div style="width: 10%;text-align: center">热度{{item.popularity}}</div>
                                <div style="width: 30%;text-align: center">《{{ item.title }}》</div>
                                <div style="width: 15%;text-align: center"  v-if="item.depth>0">第{{item.depth}}续篇</div>
                                <div style="width: 15%;text-align: center" v-else>首篇</div>
                                <div style="width: 15%;text-align: center">{{item.tag}}</div>
                                <div style="width: 5%"></div>
                                <a-button  shape="round" size="small"  @click="writogether(item)">WriTogether!</a-button>
                            </a-list-item>
                        </a-list>
                    </div>
                    </div>
                </div>
            </a-tab-pane>
        </a-tabs>
    </div>
</template>

<script>
    import { mapGetters, mapActions, mapMutations } from 'vuex'
    export default {
        name: "myStory",
        components:{
        },
        data(){
            return{
                pagination:{
                    pageSize:12
                },
                myList:[]
            }
        },
        async mounted() {
            await this.getCollection()
            await this.getStoryList()
            await this.add()
        },
        computed:{
            ...mapGetters(
                [
                    'collectionList',
                    'storyList',
                    'userId'
                ]
            )
        },
        methods:{
            ...mapMutations(
                [
                    'set_collections',
                    'set_storyList'
                ]
            ),
            ...mapActions(
                [
                    'getCollection',
                    'getStoryList'
                ]
            ),
            add(){
                console.log(this.storyList)
                for(let i=0;i<this.storyList.length;i++){
                    if(this.storyList.title==='jj'){

                        let obj={}
                        obj.popularity = this.storyList[i].popularity
                        obj.title = this.storyList[i].title
                        obj.depth = this.storyList[i].depth
                        obj.tag = this.storyList[i].tag
                        this.myList.push(obj)
                    }
                 }
            },
            writogether(record){
                console.log(record)
                this.$router.push({
                    name:'storyContent',
                    params:{
                        id:record.id
                    }
                })
            }

        },



    }
</script>
<style scoped lang="less">
    .list {
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