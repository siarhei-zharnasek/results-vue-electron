<template>
    <div>
        <div class="title">{{searchType.key}}</div>
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
    </div>
</template>

<script>
    import {mapMutations, mapState} from 'vuex';
    import {SEARCH_TYPES} from '../../helpers/constants';

    export default {
        data() {
            return {
                searchTypes: SEARCH_TYPES
            }
        },
        methods: {
            ...mapMutations('Main', ['CHANGE_SEARCH_TYPE'])
        },
        computed: {
            ...mapState('Main', {
                searchType: ({searchType}) => searchType
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
