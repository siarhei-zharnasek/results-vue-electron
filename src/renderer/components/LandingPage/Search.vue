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
        <input
            type="text"
            :value="query"
            @input="CHANGE_QUERY($event.target.value)"
        >
        <button @click="getResults()">GET RESULTS</button>
        <results v-bind:searchType="searchType.key"></results>
    </div>
</template>

<script>
    import {mapMutations, mapState, mapActions} from 'vuex';
    import {constants} from '../../helpers';
    import Results from './Results';

    export default {
        data() {
            return {
                searchTypes: constants.SEARCH_TYPES
            }
        },
        methods: {
            ...mapMutations('Main', ['CHANGE_QUERY']),
            ...mapActions('Main', ['changeSearchType', 'getResults'])
        },
        computed: {
            ...mapState('Main', {
                searchType: ({searchType}) => searchType,
                query: ({query}) => query
            })
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
