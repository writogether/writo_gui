<template>

    <div class = "home">

        <banner></banner>

        <loading v-if = "code === 404"></loading>

    </div>

</template>

<script>



    export default {

        components: {

        },

        metaInfo(){

            return {

                title: "首页 -Write_Together",

                meta: [{vmid: "description",name: "description",content: "首页 -Write_Together"}]

            }

        },

        beforeRouteLeave(to,from,next){

            this.clear()

            next()

        },

    }

</script>

<style lang = "less" scoped>

    .none-article{

        padding: 20px;

        /*background: #F7EDED;*/

        background: #FAF7F7;

        margin-top: 10px;

    }

</style>