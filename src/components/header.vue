<template>
    <div class="header">
        <div class="logout">
            <a-dropdown >

                <div class="user" @click="change_guide">

                    <img src="../assets/guider-off.png" style="height: 200px; " alt="导航" v-if="!guide">
                    <img src="../assets/guider-on.png" style="height: 200px; " alt="导航" v-if="guide">
                    <a-icon style="margin-left: 3px; font-size: 16px" type="down"></a-icon>

                <a-menu class="aMenu" slot="overlay"  v-if="guide" style="padding-left: 10px;padding-top: 10px;padding-bottom: 10px;">
                    <a-menu-item>
                        <a-icon type="user" style="color: #4a76af"/>{{ userInfo.username }}
                    </a-menu-item>
                    <a-menu-item @click="jumpToHome()">
                        <a-icon type="home"></a-icon>
                        首页
                    </a-menu-item>
                    <a-menu-item>
                        <a-icon type="edit"></a-icon>
                        故事创作
                </a-menu-item>
                    <a-menu-item @click="jumpToMyStory()">
                        <a-icon type="profile"></a-icon>
                        我的创作
                    </a-menu-item>
                    <a-menu-item @click="jumpToMyCollection()">
                        <a-icon type="star"></a-icon>
                        我的收藏
                    </a-menu-item>
                    <a-menu-item @click="jumpToUserInfo()">
                    <a-icon type="setting"/>个人设置
                </a-menu-item>
                    <a-menu-item @click="quit()">
                        <a-icon type="poweroff"></a-icon>
                        退出登录
                    </a-menu-item>
                </a-menu>
                    <p v-if="!guide" style="color: #4a76af;font-size: 26px;font-family: 'Comic Sans MS',serif"><strong>-{{location[state]}}-</strong></p>
                </div>
            </a-dropdown>
        </div>
        
    </div>
    
</template>
<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
    name: '',
    components:{
    },
    data() {
        return {
            state:0,
            guide:false,
            location:['Home Page','Writogether','My Creation','My Collection','Settings']
        }
    },
    computed: {
        ...mapGetters([
            'userId',
            'userInfo'
        ])
    },
    async mounted() {
        await this.getUserInfo();

        if (this.$route.name === 'home') {
            this.current = ['1']
        }else if(this.$route.name === 'myStory') {
            this.current = ['2']
        }


    },
    methods: {
        ...mapMutations([

        ]),
        ...mapActions([
            'logout',
            'getUserInfo'
        ]),
        change_guide(){
            this.guide=!this.guide;
        },
        selectMenu(){
        },
        async quit() {
            await this.$store.dispatch('logout')
            this.$router.push(`/login?redirect=${this.$route.fullPath}`)
        },
        jumpToMyStory() {
            this.state=2;
            this.$router.push({ name: 'myStory', params: { userId: this.userId } })
        },
        jumpToUserInfo(){
            this.state=4;
            this.$router.push({ name: 'info', params: { userInfo: this.userInfo } })
        },
        jumpToHome(){
            this.state=0;
            this.$router.push({ name: 'home'})
        },
        jumpToMyCollection(){
            this.state=3;
            this.$router.push({ name: 'collection'})
        }
    }
}
</script>
<style scoped lang="less">
    .header {
        display: flex;
        line-height: 44px;
        height: 44px;
        justify-content: space-between;
        .label{
            height: 44px;
            line-height: 44px;
            vertical-align: middle;
        }
        .aMenu{
            width: 180px;
            background: white url("../assets/menu.jpg") no-repeat left;
        }
    }
</style>
