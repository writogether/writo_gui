<template>
    <div style="padding: 150px 40px 0;width:75%;margin: 0 auto">
        <a-tabs default-active-key="1" @change="setKey">
            <a-tab-pane key="1" tab="故事阅读">
                <div class="content">
                    <a-layout class="a_layout">
                        <a-layout-content class="story_board">
                            <div  style="font-size: 26px;text-align: center;padding-top: 20px">
                                <span class="value" v-if="this.storyHistory[this.section].depth>0">续{{ this.storyHistory[this.section].depth }} {{ this.storyHistory[this.section].title }}</span>
                                <span class="value" v-else>{{ this.storyHistory[this.section].title }}</span>
                            </div>
                            <div  style="font-size: 15px;text-align: center;padding-top: 30px">
                                <span class="value" style="padding: 0 20px"><a-icon type="fire"/> {{this.storyHistory[this.section].popularity}}</span>
                                <span class="value" style="padding: 0 20px"><a-icon type="user"/> {{this.storyHistory[this.section].authorName }}</span>
                                <span class="value" style="padding: 0 20px" v-if="this.storyHistory[this.section].depth>0"><a-icon type="book"/>《{{this.storyHistory[this.section].rootTitle}}》</span>
                                <span class="value" style="padding: 0 20px" v-else><a-icon type="book"/>《{{this.storyHistory[this.section].rootTitle}}》</span>
                                <a-tooltip class="toolTip" defaultVisible=true title="点击回到本篇章，寻找其它续写，发现更多可能！" v-if="this.storyHistory[this.section].depth<this.storyParams.depth&&this.key==1">
                                    <a-button type="link" size="small" style="color: #4a76af;" @click="goBackToHistory" v-if="this.storyHistory[this.section].depth<this.storyParams.depth">回到这篇>></a-button>
                                </a-tooltip>
                            </div>
                            <a-divider></a-divider>
                            <div style="font-size: 20px;height: 60%;text-align: left">
                                <span class="value">{{ storyContent}}</span>
                            </div>
                            <div  style="width: 100%;padding: 20px 200px" v-if="storyParams.depth>0">
                                    <a-slider style="float: left;width: 85%" v-model="section" @change="readHistory" :min="0" :max="storyParams.depth"  />
                                    <a-input-number style="float: right;width:10%" v-model="section" :min="0" :max="storyParams.depth"   />

                            </div>
                            <div style="font-size: 20px;text-align: center;padding: 20px 20px" v-if="this.storyHistory[this.section].depth===this.storyParams.depth">
                                <span >
                                    <span v-if="evaluation==='Like'"><a-icon type="smile"/> Like it!</span>
                                    <span v-else-if="evaluation==='Dislike'"><a-icon type="meh"/> Emm..</span>
                                    <a-button-group  v-else>
                                        <a-button @click="likeEval"><a-icon type="like"/>like</a-button>
                                        <a-button @click="dislikeEval"><a-icon type="dislike"/>dislike</a-button>
                                    </a-button-group>
                                </span>
                                <span style="padding: 0 20px">
                                    <a-button v-if="collected"  @click="collectStory"><a-icon type="star" theme="filled"/>已收藏</a-button>
                                    <a-tooltip class="toolTip" title="点击收藏，下次阅读更方便哦！" v-if="!this.collected">
                                    <a-button v-if="!collected"  @click="collectStory"><a-icon type="star"/>收藏</a-button>
                                    </a-tooltip>
                                </span>
                            </div>
                        </a-layout-content>
                    </a-layout>
                </div>
                <a-divider style="padding: 20px 50px">
                    <a-button @click="find_recreate" v-if="this.storyParams.depth>0">寻找 续{{this.storyParams.depth}}《{{this.storyHistory[this.storyParams.depth].title}}》的续篇</a-button>
                    <a-button @click="find_recreate" v-else> 寻找《{{this.storyHistory[this.storyParams.depth].title}}》的续篇</a-button>
                </a-divider>
                <div style="padding: 10px 50px" v-if="findRecreate">
                    <a-list
                            :data-source="recreateList"
                            :pagination="pagination"
                            bordered
                    >
                        <a-list-item slot="renderItem" slot-scope="item">
                            <div style="width: 10%;text-align: center"><a-icon type="fire"/>{{item.popularity}}</div>
                            <div style="width: 30%;text-align: center">《{{ item.title }}》</div>
                            <div style="width: 10%;text-align: center"><a-icon type="user"/>{{ item.userName }}</div>
                            <div style="width: 20%;text-align: center"  v-if="item.depth>0"><a-icon type="edit"/>第{{item.depth}}续篇</div>
                            <div style="width: 20%;text-align: center" v-else><a-icon type="edit"/>首篇</div>
                            <div style="width: 10%;text-align: center"><a-icon type="tag"/>{{item.tag}}</div>
                            <div style="width: 5%"></div>
                            <a-button  shape="round" size="small"  @click="writogether(item)">WriTogether!</a-button>
                        </a-list-item>
                    </a-list>
                </div>
            </a-tab-pane>
            <a-tab-pane key="2" tab="故事续写">
                <div class="content_half">
                    <a-layout class="a_layout">
                        <a-layout-content class="story_board_half">
                            <div  style="font-size: 26px;text-align: center;padding-top: 20px">
                                <span class="value" v-if="this.storyHistory[this.section].depth>0">续{{ this.storyHistory[this.section].depth }} {{ this.storyHistory[this.section].title }}</span>
                                <span class="value" v-else>{{ this.storyHistory[this.section].title }}</span>
                            </div>
                            <div  style="font-size: 15px;text-align: center;padding-top: 30px">
                                <span class="value" style="padding: 0 20px"><a-icon type="fire"/> {{this.storyHistory[this.section].popularity}}</span>
                                <span class="value" style="padding: 0 20px"><a-icon type="user"/> {{this.storyHistory[this.section].authorName }}</span>
                                <span class="value" style="padding: 0 20px" v-if="this.storyHistory[this.section].depth>0"><a-icon type="book"/>《{{this.storyHistory[this.section].rootTitle}}》</span>
                                <span class="value" style="padding: 0 20px" v-else><a-icon type="book"/>《{{this.storyHistory[this.section].rootTitle}}》</span>
                            </div>
                            <a-divider></a-divider>
                            <div style="font-size: 20px;height: 75%;text-align: left">
                                <span class="value">{{ storyContent }}</span>
                            </div>
                            <div  style="width: 100%;padding: 10px 50px;" v-if="storyParams.depth>0">
                                <a-slider style="float: left;width: 85%" @change="readHistory" v-model="section" :min="0" :max="storyParams.depth"  />
                                <a-input-number style="float: right;width:10%" v-model="section" :min="0" :max="storyParams.depth"   />
                            </div>

                        </a-layout-content>
                    </a-layout>
                </div>
                <div style="width: 45%;float: right;padding: 10px 0;height: 100%">
                    <p style="margin-top: 10px;font-size: 16px;" v-if="this.storyParams.depth==0">为《{{this.storyHistory[this.storyParams.depth].title}}》写下你的续篇吧！</p>
                    <p style="margin-top: 10px;font-size: 16px;" v-if="this.storyParams.depth>0">为 续{{this.storyParams.depth}}《{{this.storyHistory[this.storyParams.depth].title}}》写下你的续篇吧！</p>
                    <a-form :form="form" style="margin-top: 10px;" >
                        <a-form-item >
                            <a-input
                                    style="font-size: 16px;"
                                    placeholder="请给故事取个标题吧！"
                                    v-decorator="['title', { rules: [{ required: true, message: '请输入故事标题' }] }]"
                            />
                        </a-form-item>
                        <a-form-item>
                            <a-textarea style="font-size: 16px;" id="description" placeholder="简要地介绍一下你的续写片段吧！"></a-textarea>
                        </a-form-item>
                        <a-divider></a-divider>
                        <a-textarea style="font-size: 16px;height: 600px" id="recreation" placeholder="开始你的创作吧！"></a-textarea>
                        <a-divider></a-divider>
                        <a-form-item placeholder="请给故事选个类型吧！">
                            <span>故事类型：</span>
                            <a-select
                                    style="width: 30%"
                                    v-model="storyType"
                            >
                                <a-select-option value='Adventure'>Adventure</a-select-option>
                                <a-select-option value='Romantic'>Romantic</a-select-option>
                                <a-select-option value='Suspense'>Suspense</a-select-option>
                                <a-select-option value='Other'>Other</a-select-option>
                                <a-select-option value='Horror'>Horror</a-select-option>
                                <a-select-option value='Funny'>Funny</a-select-option>
                            </a-select>
                            <span style="padding-left: 5%;">是否公开：</span>
                            <a-select
                                    style="width: 15%"
                                    v-model="setOpen"
                            >
                                <a-select-option value='0'>是</a-select-option>
                                <a-select-option value='1'>否</a-select-option>
                            </a-select>
                            <a-popconfirm
                                    style="float: right;"
                                    placement="topLeft"
                                    ok-text="Yes"
                                    cancel-text="No"
                                    title="是否确认提交？"
                                    @confirm="submit"
                            >
                                <a-button>提交续写</a-button>
                            </a-popconfirm>
                        </a-form-item>
                    </a-form>
                    <a-divider></a-divider>
                </div>
            </a-tab-pane>
            <a-tab-pane key="3" tab="评论区">
                <div style="width:60%;float: left;padding-top: 20px;padding-left: 20px;">
                    <a-list
                            :data-source="storyComments"
                            :pagination="pagination"
                            style="height: 300px;padding-left: 20px"
                            bordered>
                        <a-list-item slot="renderItem" slot-scope="item">
                            <div style="font-size: 16px">{{item.userName}} : {{item.content}}</div>
                        </a-list-item>
                    </a-list>
                </div>
                <div style="width:35%;float: right;" >
                    <p style="padding: 20px 0 0 0 ">
                        <span style="color:#313c5b;font-size: 16px;" v-if="this.storyParams.depth==0">你认为《{{this.storyHistory[this.storyParams.depth].title}}》写的怎么样呢？</span>
                        <span style="color:#313c5b;font-size: 16px;" v-else>你认为 续{{this.storyParams.depth}}《{{this.storyHistory[this.storyParams.depth].title}}》写的怎么样呢？</span>
                    </p>
                    <p><textarea style="width: 100%;height: 200px;line-height: 1.5;padding:5px 10px"  placeholder="说说你的看法吧！" id="comment_content" ></textarea></p>
                    <p style="text-align:right;"><a-button class="button" @click="Comment">发表</a-button></p>
                </div>
                <a-divider></a-divider>
            </a-tab-pane>
        </a-tabs>
    </div>
</template>
<script>
    import { mapGetters, mapActions, mapMutations } from 'vuex'
    import AListItem from "ant-design-vue/es/list/Item";
    import ATextarea from "ant-design-vue/es/input/TextArea";
    import AFormItem from "ant-design-vue/es/form/FormItem";
    //import  from './components/'
    export default{
        inject:["reload"],
        name: "storyContent",
        components: {AFormItem, ATextarea, AListItem},
        component: {
        },
        data(){
            return{
                key:1,
                title:'',
                section:'',
                setOpen:'是',
                storyType:'',
                recreateVisible:false,
                evaluation:'',
                collected:false,
                pagination:{
                    pageSize:6
                },
                findRecreate:false,
            }
        },
        beforeCreate() {
            this.form = this.$form.createForm(this, { name: 'write' });
        },
        computed:{
            ...mapGetters([
                'storyParams',
                'storyContent',
                'storyComments',
                'userId',
                'recreateList',
                'storyHistory'
            ])
        },
        async mounted() {
            console.log(this.$route.params.id),
            await this.set_currentStoryId(Number(this.$route.params.id))
            await this.getStoryParams()
            this.section=this.storyParams.depth
            console.log('storyParams:',this.storyParams)
            console.log('storyParams2:',this.storyHistory,this.section,this.storyHistory[this.section])

            await this.getCommentById(this.storyParams.id)
            this.evaluation=await this.getEval(this.storyParams.id)
            this.collected=await this.checkIfCollected(this.storyParams.id)
            this.getStoryByFather(this.storyParams.id)
            this.storyType=this.storyHistory[this.section].tag
        },
        methods: {
            ...mapMutations([
                'set_currentStoryId',
            ]),
            ...mapActions([
                'getCommentById',
                'sendComment',
                'getStoryByFather',
                'getEval',
                'checkIfCollected',
                'evalStory',
                'toggleCollect',
                'uploadStory',
                'getStoryParams',
                'getContentById'

            ]),
            setKey(v){
                this.key=v;
                this.section=this.storyParams.depth;
            }
            ,
            readHistory(v){
                console.log(v)
                this.getContentById(this.storyHistory[v].id)
            },
            goBackToHistory(){
                this.$router.push({
                    name:'storyContent',
                    params:{
                        id:this.storyHistory[this.section].id
                    }
                }).then(this.reload());
            }
            ,
             likeEval(){
                const evalData={
                    likerId:this.userId,
                    storyId:this.storyParams.id,
                    type:'Like'
                };
                this.evalStory(evalData);
                this.evaluation='Like';
            },
            dislikeEval(){
                const evalData={
                    likerId:this.userId,
                    storyId:this.storyParams.id,
                    type:'Dislike'
                };
                this.evalStory(evalData);
                this.evaluation='Dislike';
            }
            ,
            collectStory(){
                this.collected=!this.collected;
                console.log(this.collected,'!')
                if(this.collected) {
                    this.toggleCollect(
                        {storyId: this.storyParams.id, status: true}
                    );
                }
                else this.toggleCollect(
                    {storyId: this.storyParams.id, status: false}
                    );
            }
            ,
            find_recreate(){
                this.findRecreate=!this.findRecreate;
            }
            ,
            Comment(){
                const data={
                    storyId:this.storyParams.id,
                    commenterId:this.userId,
                    content:document.getElementById('comment_content').value
                }
                this.sendComment(data);
                document.getElementById('comment_content').value="";

            },
            writogether(record){
                console.log(record)
                this.$router.push({
                    name:'storyContent',
                    params:{
                        id:record.id
                    }
                }).then(this.reload());
            },
            submit(){
                if(this.setOpen=='是')this.setOpen='0'
                const data={
                    fatherId:this.storyParams.id,
                    authorId:this.userId,
                    title:this.form.getFieldValue('title'),
                    open:this.form.getFieldValue('setOpen')=='0',
                    description:document.getElementById("description").value,
                    content:document.getElementById("recreation").value,
                    tag:this.form.getFieldValue('storyType'),
                }
                console.log(data);
                this.uploadStory(data).then(this.reload());
            }
        }
    }
</script>
<style scoped>
    .content{
        padding-top: 20px;
        background: none;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;

    }
    .content_half{
        padding-top: 20px;
        float: left;
        width:50%;
        background: none;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;

    }
    .a_layout{
        background-color: #313c5b;
        padding: 7px;
        border-radius: 20px;
    }
    .story_board{
        height: 700px;
        background: white;
        padding: 10px 100px;
        border-radius: 20px;

    }
    .story_board_half{
        height: 900px;
        background: white;
        padding: 10px 50px;
        border-radius: 20px;

    }
    .value{
        color: #313c5b;
    }
    .items{
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;

    }
    .text-area{
        width: 90%;
        margin: 0.75rem  0;
        padding-left: 1.125rem;
        height: 6.5rem ;
        word-wrap:break-word;
    }
    .toolTip{
        background-color: white;
        color: #313c5b;
    }

</style>
