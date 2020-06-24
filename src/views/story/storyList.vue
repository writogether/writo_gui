<template>
    <div style="padding: 150px 40px 0;width:75%;margin: 0 auto">
    <div class="storyList">
        <div style="background: #ffffff;padding: 20px 40px;border-top-left-radius: 10px;border-top-right-radius: 10px">
            <span style="font-size: large ">故事列表 </span>
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
        <div class="table" >
        <a-list
            :data-source="storyList"
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
                <div style="width: 15%;text-align: center"><a-icon type="user"/>{{ item.authorName }}</div>
                <div style="width: 15%;text-align: center"><a-icon type="tag"/>{{item.tag}}</div>
                <div style="width: 5%"></div>
                <a-button  shape="round" size="small"  @click="writogether(item)"><a-icon type="edit"/>WriTogether!</a-button>
            </a-list-item>
        </a-list>
        </div>
        <QuickCreateModal></QuickCreateModal>
    </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions, mapMutations } from 'vuex'
    import QuickCreateModal from './quickCreate'

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
                storyType:'All Stories',
                popularity:0,
                pagination:{
                    pageSize:12
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
    .storyList {

        border-radius: 10px;
        padding: 6px 6px;
        position: static;
        background-color:#313c5b;

        .table{
            background: #ffffff;
            padding: 0px 20px;
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;

        }


    }
</style>
