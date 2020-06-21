<template>
    <div class="info-wrapper">
        <a-form-item :form="form" style="margin-top: 30px">
            <a-form-item label="用户名" :label-col="{ span: 3 }" :wrapper-col="{ span: 8, offset: 1  }">
                <a-descriptions v-if="!modify">
                    
                    <a-descriptions-item lable="userA">
                        userA
                    </a-descriptions-item>
                </a-descriptions>
                <a-input
                    placeholder="请填写用户名"
                    v-decorator="['userName', { rules: [{ required: true, message: '请输入用户名' }, { validator: this.checkUserName }] ,  validateTrigger: 'blur'}]"
                    v-if="modify"
                >
                    <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }" />
                </a-input>
            </a-form-item>
            <a-form-item label="手机号" :label-col="{ span: 3 }" :wrapper-col="{ span: 8, offset: 1 }">
                <a-descriptions v-if="!modify">
                    <a-descriptions-item>
                        无
                    </a-descriptions-item>
                </a-descriptions>
                <a-input
                    placeholder="请填写手机号"
                    v-decorator="['phoneNumber', { rules: [{ required: true, message: '请输入手机号' },{ validator: this.checkPhoneNumber }] ,  validateTrigger: 'blur'}]"
                    v-if="modify"
                >
                    <a-icon slot="prefix" type="book" :style="{ color: 'rgba(0,0,0,.25)' }" />
                </a-input>
            </a-form-item>
            <a-form-item label="个人介绍" :label-col="{ span: 3 }" :wrapper-col="{ span: 8, offset: 1  }">
                <a-descriptions v-if="!modify">
                    <a-descriptions-item>
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
                <div class="button">
                    <a-button type="primary" @click="modifyInfo">
                        修改信息
                    </a-button>
                </div>
            </a-form-item>
        </a-form-item>
    </div>
</template>

<script>

    import {mapActions, mapGetters, mapMutations} from 'vuex';

    export default {
        name: 'info',
        data() {
            return {
                modify: false,
                formLayout: 'horizontal',
                pagination: {},
                // columns,
                data: [],
                form: this.$form.createForm(this, {name: 'coordinated'}),
            };
        },
        components: {},
        computed: {
            ...mapGetters([
                'userId',
                'userInfo',
            ]),
        },
        async mounted() {
            await this.getUserInfo();
        },
        methods: {
            ...mapMutations(
                [
                    'set_userInfo',
                    'set_userId',
                ],
            ),
            ...mapActions([
                'getUserInfo',
                'updateUserInfo',
            ]),
            checkUserName(rule, value, callback) {
                if (value) {
                    callback();
                } else {
                    callback(new Error('请输入用户名'));
                }
                callback();
            },
            checkPhoneNumber(rule, value, callback) {
                const re = /^1[0-9]{10}$/;
                if (re.test(value)) {
                    callback();
                } else {
                    callback(new Error('请输入有效手机号'));
                }
                callback();
            },
            saveModify() {
                this.form.validateFields((err, values) => {
                    /*
                    if(!this.userInfo.username){
                        this.$message.error('请填写用户名');
                        return;
                    }
                    if(!this.userInfo.phoneNumber){
                        this.$message.error('请填写手机号');
                        return;
                    }
                     */
                    if (!err) {
                        const data = {
                            username: this.form.getFieldValue('userName'),
                            phoneNumber: this.form.getFieldValue('phoneNumber'),
                            description: this.form.getFieldValue('userDescription'),
                        };
                        this.$message.success('保存成功！');
                        this.modify = false;
                        this.updateUserInfo(data).then(() => {
                            this.modify = false;
                        });
                    }
                });
            },
            modifyInfo() {
                setTimeout(() => {
                    this.form.setFieldsValue({
                        'userName': this.userInfo.username,
                        'phoneNumber': this.userInfo.phoneNumber,
                        'userDescription': this.userInfo.userDescription,
                    });
                }, 0);
                this.modify = true;
            },
            cancelModify() {
                this.modify = false;
            },

        },
    };
</script>
<style scoped lang="less">
    .info-wrapper {
        padding: 150px 200px;
        
        .button {
            padding-top: 20px;
        }
        
        .chart {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 20px
        }
    }
</style>
