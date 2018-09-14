import {constants, api} from '../../helpers';

const state = {
    query: '',
    searchType: {
        key: 'Citation',
        value: 'citation'
    }
};

const mutations = {
    CHANGE_SEARCH_TYPE(state, searchTypeKey) {
        state.searchType = constants.SEARCH_TYPES.find(({key}) => searchTypeKey === key);
    },
    CHANGE_QUERY(state, query) {
        state.query = query;
    }
};

const actions = {
    changeSearchType({commit, state, dispatch}, searchTypeKey) {
        commit('CHANGE_SEARCH_TYPE', searchTypeKey);
        dispatch(`${searchTypeKey}/changeSearchType`, null, {root: true});
    },
    getResults({state, dispatch}) {
        dispatch(`${state.searchType.key}/getResults`, state.query, {root: true});
    }
};

export default {
    state,
    mutations,
    actions,
    namespaced: true
}
