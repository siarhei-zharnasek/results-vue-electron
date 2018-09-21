<template>
    <div>
        <div
            class="container"
            v-for="result in resultsData"
        >
            <toggle-visibility>
                <template slot="title">
                    <div class="block">{{result.prefLabel}}</div>
                </template>
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
            </toggle-visibility>
        </div>
    </div>
</template>

<script>
    import ToggleVisibility from './ToggleVisibility.vue';

    export default {
        props: ['resultsData'],
        components: {
            ToggleVisibility
        }
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
