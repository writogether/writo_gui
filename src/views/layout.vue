<template>
    <div id="layout">
        <!--        <Header></Header>-->
        <side-nav></side-nav>
        <writo-bg></writo-bg>
        <transition name="fade-transform" mode="out-in">
            <router-view />
        </transition>
    </div>
</template>
<script>
    // import Header from '../components/header';
    import sideNav from '../components/side-nav';
    import writoBg from '../components/writo-bg';

    export default {
        name: 'layout',
        components: {
            // Header,
            sideNav,
            writoBg,
        },
    };
</script>

<style scoped>
    #layout {
        display: grid;
        grid-template-columns: 1fr 6fr;
        grid-template-rows: 35vh 65vh;
        grid-template-areas: 'a b' 'a c';
    }
    
    .side-nav {
        grid-area: a;
    }

</style>
