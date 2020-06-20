<template>
    <div class="side-nav">
        <a-menu class="menu"
                mode="inline"
                theme="dark"
                :defaultOpenKeys="['compass','user']"
        >
            <a-sub-menu key="compass">
                <span slot="title"><a-icon type="compass" /><span>导航</span></span>
                <a-menu-item key="home" @click="jumpToHome()">
                    <a-icon type="home" />
                    <span>首页</span>
                </a-menu-item>
                <a-menu-item key="hot" @click="jumpToHome()">
                    <a-icon type="fire" />
                    <span>热门</span>
                </a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="user">
                <span slot="title"><a-icon type="user" /><span>个人</span></span>
                <a-menu-item key="collection" @click="jumpToUserInfo()">
                    <a-icon type="info" />
                    <span>信息</span>
                </a-menu-item>
                <a-menu-item key="myStory" @click="jumpToMyStory()">
                    <a-icon type="appstore" />
                    <span>创作</span>
                </a-menu-item>
                <a-menu-item key="collect" @click="jumpToCollection()">
                    <a-icon type="inbox" />
                    <span>收藏</span>
                </a-menu-item>
            </a-sub-menu>
        </a-menu>
    </div>
</template>

<script>
    import {mapActions, mapGetters, mapMutations} from 'vuex';

    export default {
        name: 'side-nav',
        data() {
            return {};
        },
        computed: {
            ...mapGetters([
                'userId',
                'userInfo',
            ]),
        },
        methods: {
            ...mapMutations([]),
            ...mapActions([
                'logout',
            ]),
            async quit() {
                await this.$store.dispatch('logout');
                await this.$router.push(`/login?redirect=${this.$route.fullPath}`);
            },
            jumpToHome() {
                this.$router.push({
                    name: 'home',
                });
            },
            jumpToUserInfo() {
                this.$router.push({
                    name: 'info',
                    params: {userInfo: this.userInfo},
                });
            },
            jumpToMyStory() {
                this.$router.push({
                    name: 'myStory',
                    params: {userId: this.userId},
                });
            },
            jumpToCollection() {
                this.$router.push({
                    name: 'collection',
                    params: {userId: this.userId},
                });
            },
        },
    };
</script>

<style scoped>
    .side-nav {
    }
    
    .menu {
        height: 100vh;
    }
    
    .label {
        height: 44px;
        line-height: 44px;
        vertical-align: middle;
        min-width: 350px;
    }
    
    .logo {
        height: 44px;
        vertical-align: top;
        border-style: none;
        cursor: pointer;
    }
    
    .title {
        font-size: 33px;
        color: rgba(0, 0, 0, .85);
        font-family: Avenir, 'Helvetica Neue', Arial, Helvetica, sans-serif;
        font-weight: 600;
        position: relative;
        top: 2px;
    }
    
    .search {
        width: 300px;
        margin-left: 30px
    }
    
    .logout {
        margin-right: 40px;
    }
    
    .user {
        cursor: pointer;
        display: flex;
        align-items: center;
    }
    
    span {
        margin-left: 5px;
        font-size: 18px;
    }
    
    a-menu-item {
        font-family: SimSun, sans-serif;
    }

</style>
