<template>
    <div>
        <div
            class="container"
            v-for="result in results"
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
    import {mapState} from 'vuex';
    import ToggleVisibility from './ToggleVisibility.vue';

    export default {
        computed: {
            ...mapState('Ask Entellect', {
                results: ({results}) => results.entities
            })
        },
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
