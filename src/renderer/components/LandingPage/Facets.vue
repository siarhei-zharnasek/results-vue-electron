<template>
    <div>
        <div
            class="container"
            v-if="facet.values.length"
            v-for="facet in facetsData"
        >
            <toggle-visibility>
                <template slot="title">
                    <div class="block">{{facet.filterKey}}</div>
                </template>
                <div
                    class="block"
                    v-for="el in facet.values"
                >
                    <div class="text">{{el.value}} - {{el.count}}</div>
                </div>
            </toggle-visibility>
        </div>
    </div>
</template>

<script>
    import ToggleVisibility from './ToggleVisibility.vue';

    export default {
        props: ['facetsData'],
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
