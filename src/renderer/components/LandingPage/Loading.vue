<template>
    <div
        class="wrapper"
        v-if="showLoading"
    >
        loading
    </div>
</template>

<script>
    export default {
        props: ['showLoading']
    }
</script>

<style scoped>
    .wrapper {
        background: lightgray;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        opacity: 0.9;
    }
</style>
