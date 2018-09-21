<template>
    <div>
        <div
            class="container"
            v-for="result in resultsData"
        >
            <toggle-visibility>
                <template slot="title">
                    <div class="block">{{result.displayName.name}}</div>
                </template>
                <div class="block">
                    <div class="title">Abstract</div>
                    <div class="text">{{result.abstract}}</div>
                </div>
                <div class="block">
                    <div class="title">Synonyms</div>
                    <span
                        v-for="substanceName in result.substanceNames"
                        class="keyword"
                    >
                        {{substanceName.name}}
                    </span>
                </div>
                <div class="block">
                    <div class="title">MP °C</div>
                    <span
                        v-for="mp in result.meltingPoint"
                        class="keyword"
                    >
                        {{mp.temperature.displayValue}}
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
