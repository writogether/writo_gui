<template>
    <div class="text">
        <textarea placeholder="在此创作" cols="90"></textarea>
        <p style="text-align:right;"><button class="button">结束</button></p>
    </div>
</template>

<script>
    export default {
        name: "recreate"
    }
</script>

<style scoped>
    .button{

    }
    .text{
        width: 90%;
        border-top:1px solid gainsboro;
        border-bottom:1px solid gainsboro;
        word-wrap:break-word;
    }
</style>