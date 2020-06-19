<template>
    <a-modal
            :visible="quickCreateModalVisible"
            title="开始写作"
            cancelText="取消"
            okText="确定"
            @cancel="cancel"
            @ok="handle">
        <a-form :form="form" style="margin-top: 30px" v-bind="formItemLayout">
            <a-form-item label="标题">
                <a-input
                        placeholder="请给故事取个标题吧！"
                        v-decorator="['title', { rules: [{ required: true, message: '请输入故事标题' }] }]"
                />
            </a-form-item>
            <a-form-item label="故事类型"
                         placeholder="请给故事选个类型吧！"
            >

                <a-select
                          v-decorator="[
            'storyType',
            { rules: [{ required: true, message: '请选择故事类型' }] }]"

                >
                    <a-select-option value='0'>Adventure</a-select-option>
                    <a-select-option value='1'>Romantic</a-select-option>
                    <a-select-option value='2'>Suspense</a-select-option>
                    <a-select-option value='3'>Other</a-select-option>
                    <a-select-option value='4'>Horror</a-select-option>
                    <a-select-option value='5'>Funny</a-select-option>
                </a-select>
            </a-form-item>
            <a-divider>开始你的创作吧！</a-divider>
            <a-textarea id="content"
                class="text" rows="10"
            >

            </a-textarea>



        </a-form>
    </a-modal>
</template>

<script>
    import { mapGetters, mapMutations, mapActions } from 'vuex'
    import AFormItem from "ant-design-vue/es/form/FormItem";
    import ATextarea from "ant-design-vue/es/input/TextArea";
    export default {
        name: "quickCreate",
        components: {ATextarea, AFormItem},
        data(){
            return{
                formItemLayout: {
                    labelCol: {
                        xs: { span: 12 },
                        sm: { span: 6 },
                    },
                    wrapperCol: {
                        xs: { span: 24 },
                        sm: { span: 16 },
                    },
                },
                storyType:'Adventure',
                title:'',
                content:'',
            }
        },
        computed:{
            ...mapGetters([
                'quickCreateModalVisible',
                'userId'
            ])
        },
        beforeCreate() {
            this.form = this.$form.createForm(this, { name: 'quickCreate' });
        },
        methods:{
            ...mapMutations([
                'set_quickCreateModalVisible'
            ]),
            ...mapActions([
                'uploadStory',
                'getStoryList'
            ]),
            cancel(){
                this.set_quickCreateModalVisible(false);
            },
            handle(e){
                e.preventDefault();
                this.form.validateFieldsAndScroll((err, values) => {
                    if (!err) {
                        const data={
                            fatherId:0,
                            authorId:this.userId,
                            title:this.form.getFieldValue('title'),
                            content:document.getElementById('content').value,
                            tag:'Other'
                            //tag:this.form.getFieldValue('storyType')
                        }
                        console.log(data)
                        this.uploadStory(data)
                    }
                });
            }
        }



    }
</script>

<style scoped>
    .text{
        font-size: medium;
    }
</style>