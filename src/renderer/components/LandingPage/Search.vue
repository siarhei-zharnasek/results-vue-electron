<template>
    <div class="container">
        <div class="title">{{searchType.key}}</div>
        <select
            :value="searchType.key"
            @change="changeSearchType($event.target.value)"
        >
            <option
                v-for="type in searchTypes"
                v-bind:value="type.key"
            >
                {{type.key}}
            </option>
        </select>
        <div>
            <input
                type="text"
                :value="query"
                @input="changeQuery($event.target.value)"
            >
            <div
                v-for="suggestion in suggestions"
                @click="getResults(suggestion)"
            >
                {{suggestion}}
            </div>
        </div>
        <button @click="getResults()">GET RESULTS</button>
        <div>{{resultsData.totalHits}}</div>
        <Pagination
            v-bind:data="pagination"
            v-bind:changePage="changePage"
        />
        <div class="content">
            <div v-if="loading">
                <Loading/>
            </div>
            <facets
                v-bind:facetsData="facets"
                v-bind:selectedFacetsData="selectedFacets"
            ></facets>
            <results
                v-bind:searchType="searchType.key"
                v-bind:resultsData="resultsData.entities"
            ></results>
        </div>
    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex';
    import {constants} from '../../helpers';
    import Results from './Results';
    import Facets from './Facets';
    import Loading from './Loading';
    import Pagination from './Pagination';

    export default {
        data() {
            return {
                searchTypes: constants.SEARCH_TYPES
            }
        },
        methods: {
            ...mapActions('Main',
                ['changeSearchType', 'getResults', 'changeQuery', 'changePage']
            )
        },
        computed: {
            ...mapState('Main', {
                searchType: ({searchType}) => searchType,
                query: ({query}) => query
            }),
            currentSearchEntity() {
                return this.$store.state[this.searchType.key];
            },
            resultsData() {
                return this.currentSearchEntity.results;
            },
            suggestions() {
                return this.currentSearchEntity.suggestions;
            },
            pagination() {
                return this.currentSearchEntity.pagination;
            },
            facets() {
                return this.currentSearchEntity.facets;
            },
            selectedFacets() {
                return this.currentSearchEntity.selectedFacets;
            },
            loading() {
                return this.currentSearchEntity.loading;
            }
        },
        components: {
            Results,
            Facets,
            Loading,
            Pagination
        }
    }
</script>

<style scoped>
    .title {
        color: #888;
        font-size: 18px;
        font-weight: initial;
        letter-spacing: .25px;
        margin-top: 10px;
    }

    .items {
        margin-top: 8px;
    }

    .item {
        display: flex;
        margin-bottom: 6px;
    }

    .item .name {
        color: #6a6a6a;
        margin-right: 6px;
    }

    .item .value {
        color: #35495e;
        font-weight: bold;
    }

    .container {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    .content {
        position: relative;
        flex: 1;
        width: 100%;
    }
</style>
