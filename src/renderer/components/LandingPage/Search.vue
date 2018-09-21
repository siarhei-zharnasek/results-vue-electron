<template>
    <div>
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
            >{{suggestion}}</div>
        </div>
        <button @click="getResults()">GET RESULTS</button>
        <div>{{resultsData.totalHits}}</div>
        <results
            v-bind:searchType="searchType.key"
            v-bind:resultsData="resultsData.entities"
        ></results>
    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex';
    import {constants} from '../../helpers';
    import Results from './Results';

    export default {
        data() {
            return {
                searchTypes: constants.SEARCH_TYPES
            }
        },
        methods: {
            ...mapActions('Main', ['changeSearchType', 'getResults', 'changeQuery'])
        },
        computed: {
            ...mapState('Main', {
                searchType: ({searchType}) => searchType,
                query: ({query}) => query
            }),
            resultsData() {
                const {key} = this.searchType;
                return this.$store.state[key].results;
            },
            suggestions() {
                const {key} = this.searchType;
                return this.$store.state[key].suggestions;
            }
        },
        components: {
            Results
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
</style>
