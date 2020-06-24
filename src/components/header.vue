<template>
    <div class="header">
        <div class="logout">
            <a-dropdown >
                <div class="user" @click="change_guide">
                    <img src="../assets/guider-off.png" style="height: 180px; " alt="导航" v-if="!guide">
                    <img src="../assets/guider-on.png" style="height: 180px; " alt="导航" v-if="guide">
                    <p v-if="!guide" style="background: white; color: #4a76af;font-size: 26px;font-family: 'Comic Sans MS',serif"><strong>-{{location[status]}}-</strong>
                    <a-icon style="margin-left: 3px; font-size: 16px" type="down"></a-icon>
                    </p>

                <a-menu class="aMenu" slot="overlay"  v-if="guide" style="padding-left: 10px;padding-top: 10px;padding-bottom: 10px;">
                    <a-menu-item style="font-size: 18px" @click="jumpToUserInfo()">
                        <a-icon type="user" style="color: #4a76af"/>
                        {{ userInfo.username }}
                    </a-menu-item>
                    <a-menu-item style="font-size: 18px" @click="jumpToHome()">
                        <a-icon type="home"></a-icon>
                        首页
                    </a-menu-item>
                    <a-menu-item style="font-size: 18px" @click="jumpToRecreate">
                        <a-icon type="edit"></a-icon>
                        故事创作
                </a-menu-item>
                    <a-menu-item style="font-size: 18px" @click="jumpToMyStory()">
                        <a-icon type="profile"></a-icon>
                        我的创作
                    </a-menu-item>
                    <a-menu-item style="font-size: 18px" @click="jumpToMyCollection()">
                        <a-icon type="star"></a-icon>
                        我的收藏
                    </a-menu-item>
                    <a-menu-item style="font-size: 18px" @click="quit()">
                        <a-icon type="poweroff"></a-icon>
                        退出登录
                    </a-menu-item>
                </a-menu>
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
            status:0,
            guide:true,
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
        this.refresh_guide();
    },
    methods: {
        ...mapMutations([
            'set_page_status'
        ]),
        ...mapActions([
            'logout',
            'getUserInfo'
        ]),
        refresh_guide(){
            if(this.$route.name==='home'||this.$route.name==='storyList')this.status=0;
            else if(this.$route.name==='writo')this.status=1;
            else if(this.$route.name==='myStory')this.status=2;
            else if(this.$route.name==='collection')this.status=3;
            else if(this.$route.name==='info')this.status=4;
        },
        change_guide(){
            this.guide=!this.guide;
        },
        async quit() {
            await this.$store.dispatch('logout')
            this.$router.push(`/login?redirect=${this.$route.fullPath}`)
        },
        jumpToMyStory() {
            this.status=2;
            this.$router.push({ name: 'myStory', params: { userId: this.userId } })
        },
        jumpToUserInfo(){
            this.status=4;
            this.$router.push({ name: 'info', params: { userInfo: this.userInfo } })
        },
        jumpToHome(){
            this.status=0;
            this.$router.push({ name: 'home'})
        },
        jumpToMyCollection(){
            this.status=3;
            this.$router.push({ name: 'collection'})
        },
        jumpToRecreate(){
            this.status=1;
            this.$router.push({ name: 'writo'})
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
