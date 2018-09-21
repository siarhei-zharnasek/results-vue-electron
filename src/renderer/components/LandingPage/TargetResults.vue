<template>
    <div>
        <div
            class="container"
            v-for="result in resultsData"
        >
            <div class="block">{{result.prefLabel}}</div>
            <div class="block">
                <div class="title">Species Name</div>
                <div class="text">{{result.speciesName}}</div>
            </div>
            <div class="block">
                <div class="title">Synonyms</div>
                <span
                    v-for="label in result.altLabels"
                    class="keyword"
                >
                    {{label}}
                </span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['resultsData']
    }
</script>

<style scoped>
    .container {
        margin-bottom: 50px;
    }

    .block {
        margin-bottom: 5px;
        padding-bottom: 5px;
        border-bottom: 1px solid gray;
    }

    .title {
        font-weight: 500;
    }

    .text {
        font-size: 14px;
    }

    .keyword {
        margin-right: 10px;
    }
</style>
