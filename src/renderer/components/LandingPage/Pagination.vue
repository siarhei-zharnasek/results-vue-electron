<template>
    <div v-if="data.maxPage">
        <span
            v-if="data.currentPage > 1"
            @click="changePage(data.currentPage - 1)"
        >
            <
        </span>
        <span>{{data.currentPage}} / {{data.maxPage}}</span>
        <span
            v-if="data.currentPage < data.maxPage"
            @click="changePage(data.currentPage + 1)"
        >
            >
        </span>
    </div>
</template>

<script>
    export default {
        props: ['data', 'changePage']
    }
</script>

<style scoped></style>
