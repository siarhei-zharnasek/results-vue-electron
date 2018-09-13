import {SEARCH_TYPES} from '../../helpers/constants';

const state = {
    query: '',
    appliedQuery: {
        citation: '',
        substance: '',
        target: '',
        askEntellect: ''
    },
    searchType: {
        key: 'Citation',
        value: 'citation'
    }
};

const mutations = {
    CHANGE_SEARCH_TYPE(state, searchTypeKey) {
        const {value} = state.searchType = SEARCH_TYPES.find(({key}) => searchTypeKey === key);
        state.query = state.appliedQuery[value];
    },
    CHANGE_QUERY(state, query) {
        state.query = query;
    }
};

const actions = {
    someAsyncTask({commit}) {
        // do something async
        commit('INCREMENT_MAIN_COUNTER')
    }
};

export default {
    state,
    mutations,
    actions,
    namespaced: true
}
