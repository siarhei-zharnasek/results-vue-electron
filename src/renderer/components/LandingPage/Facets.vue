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
                    <div
                        class="text"
                        :class="computeActive(facet.filterKey, el.value)"
                        @click="facetClick(facet.filterKey, el.value)"
                    >{{el.value}} - {{el.count}}</div>
                </div>
            </toggle-visibility>
        </div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex';
    import ToggleVisibility from './ToggleVisibility.vue';

    export default {
        props: ['facetsData', 'selectedFacetsData'],
        components: {
            ToggleVisibility
        },
        methods: {
            ...mapActions('Main',
                ['toggleFacet']
            ),
            facetClick(facetName, facetValue) {
                this.toggleFacet({facetName, facetValue});
            },
            computeActive(facetName, facetValue) {
                const facet = this.selectedFacetsData[facetName];

                return {
                    active: facet && facet.includes(facetValue)
                }
            }
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

    .active {
        font-weight: bold;
    }
</style>
