<template>
  <div id="app" v-title data-title="Write Together">
    <transition name="fade-transform" mode="out-in">
      <router-view v-if="isRouterAlive"></router-view>
    </transition>
  </div>

</template>
<script>
export default {
  name:"app",
  provide(){
    return{
      reload:this.reload
    };
  },
  data(){
    return{
      isRouterAlive:true
    }
  },
  components: {
  },
  methods:{
    reload(){
      this.isRouterAlive=false;
      this.$nextTick(function () {
        this.isRouterAlive=true;
      })
    }
  }
}
</script>
<style>
#app {
  width: 100%;
  padding: 200px 150px;
  background: white url('assets/backGround.jpg') no-repeat ;
  background-position-x: center;

}
</style>
