<template>
    <div>
        <div class="title">{{searchType.key}}</div>
        <div class="title">{{results.totalHits}}</div>
        <select
            :value="searchType.key"
            @change="CHANGE_SEARCH_TYPE($event.target.value)"
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
    </div>
</template>

<script>
    import {mapMutations, mapState, mapActions} from 'vuex';
    import {constants} from '../../helpers';

    export default {
        data() {
            return {
                searchTypes: constants.SEARCH_TYPES
            }
        },
        methods: {
            ...mapMutations('Main', ['CHANGE_SEARCH_TYPE', 'CHANGE_QUERY']),
            ...mapActions('Main', ['getResults'])
        },
        computed: {
            ...mapState('Main', {
                searchType: ({searchType}) => searchType,
                query: ({query}) => query,
                results: ({searchType, results}) => results[searchType.value] || {}
            })
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
