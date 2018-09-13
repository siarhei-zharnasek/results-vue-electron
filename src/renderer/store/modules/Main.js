import {SEARCH_TYPES} from '../../helpers/constants';

const state = {
    searchType: {
        key: 'Citation',
        value: 'citation'
    }
};

const mutations = {
    CHANGE_SEARCH_TYPE(state, searchTypeKey) {
        state.searchType = SEARCH_TYPES.find(({key}) => searchTypeKey === key);
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
