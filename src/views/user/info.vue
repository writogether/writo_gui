<template>
    <div class="info-wrapper">
        <a-tabs>
            <a-tab-pane tab="个人信息" key="1">
                <a-form-item :form="form" style="margin-top: 30px" >
                    <a-form-item label="用户名" :label-col="{ span: 3 }" :wrapper-col="{ span: 8, offset: 1  }">
                        <a-descriptions v-if="!modify">

                            <a-descriptions-item lable="userA">
                                userA
                            </a-descriptions-item>
                        </a-descriptions>
                        <a-input
                                placeholder="请填写用户名"
                                v-decorator="['userName', { rules: [{ required: true, message: '请输入用户名' }] }]"
                                v-if="modify"
                        />
                    </a-form-item>
                    <a-form-item label="手机号" :label-col="{ span: 3 }" :wrapper-col="{ span: 8, offset: 1 }">
                        <a-descriptions v-if="!modify">
                            <a-descriptions-item>
                                无
                            </a-descriptions-item>
                        </a-descriptions>
                        <a-input
                                placeholder="请填写手机号"
                                v-decorator="['phoneNumber', { rules: [{ required: true, message: '请输入手机号' }] }]"
                                v-if="modify"
                        />
                    </a-form-item>
                    <a-form-item label="个人介绍" :label-col="{ span: 3 }" :wrapper-col="{ span: 8, offset: 1  }">
                        <a-descriptions v-if="!modify">
                            <a-descriptions-item >
                                无
                            </a-descriptions-item>
                        </a-descriptions>
                        <a-textarea
                                v-model="value"
                                placeholder="请填写个人介绍"
                                :auto-size="{ minRows: 3, maxRows: 5 }"
                                v-decorator="['description', { rules: [{ required: true, message: '请输入个人介绍' }] }]"
                                v-if="modify"
                        />
                    </a-form-item>
                 <!--         <a-form-item label="原密码" :label-col="{ span: 3 }" :wrapper-col="{ span: 8, offset: 1  }">
                             <a-input
                                     placeholder="请输入原密码"
                                     v-decorator="['password', { rules: [{ required: true, message: '请输入原密码' }] }]"
                             />
                         </a-form-item>
                         <a-form-item label="新密码" :label-col="{ span: 3 }" :wrapper-col="{ span: 8, offset: 1 }" v-if="modify">
                             <a-input
                                     placeholder="请输入新密码"
                                     v-decorator="['password', { rules: [{ required: true, message: '请输入新密码' }] }]"
                             />
                         </a-form-item>
                         -->
                    <a-form-item :wrapper-col="{ span: 12, offset: 5 }" v-if="modify">
                        <a-button type="primary" @click="saveModify">
                            保存
                        </a-button>
                        <a-button type="default" style="margin-left: 30px" @click="cancelModify">
                            取消
                        </a-button>
                    </a-form-item>
                    <a-form-item :wrapper-col="{ span: 8, offset: 0 }" v-else>
                        <a-button type="primary" @click="modifyInfo">
                            修改信息
                        </a-button>
                    </a-form-item>
                </a-form-item>
            </a-tab-pane>
        </a-tabs>
    </div>
</template>

<script>

    import {mapActions, mapGetters, mapMutations} from 'vuex';

export default {
    name: 'info',
    data(){
        return {
            modify: false,
            formLayout: 'horizontal',
            pagination: {},
            // columns,
            data: [],
            form: this.$form.createForm(this, { name: 'coordinated' }),
        }
    },
    components: {
    },
    computed: {
        ...mapGetters([
            'userId',
            'userInfo',
        ])
    },
    async mounted() {
        await this.getUserInfo()
    },
    methods: {
        ...mapMutations(
            [
                'set_userInfo',
                'set_userId'
            ]
        ),
        ...mapActions([
            'search',
            'update'
        ]),
        saveModify() {
            this.form.validateFields((err, values) => {
                if (!err) {
                    const data = {
                        username: this.form.getFieldValue('userName'),
                        phoneNumber: this.form.getFieldValue('phoneNumber'),
                        description:this.form.getFieldValue('userDescription')
                    };
                    this.updateUserInfo(data).then(()=>{
                        this.modify = false
                    })
                }
            });
            this.modify = false
        },
        modifyInfo() {
            setTimeout(() => {
                this.form.setFieldsValue({
                    'userName': this.userInfo.username,
                    'phoneNumber': this.userInfo.phoneNumber,
                    'userDescription': this.userInfo.userDescription,
                })
            }, 0)
            this.modify = true
        },
        cancelModify() {
            this.modify = false
        },
        
    }
}
</script>
<style scoped lang="less">
    .info-wrapper {
        padding: 50px;
        .chart {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 20px
        }
    }
</style>
<style lang="less">
    .info-wrapper {
        .ant-tabs-bar {
            padding-left: 30px
        }
    }
</style>
<style lang="less">

</style>
