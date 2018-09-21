import {constants} from '../../helpers';

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
    changeSearchType({commit, dispatch}, searchTypeKey) {
        commit('CHANGE_SEARCH_TYPE', searchTypeKey);
        dispatch(`${searchTypeKey}/changeSearchType`, null, {root: true});
    },
    getResults({state, dispatch}, query = state.query) {
        dispatch(`${state.searchType.key}/changeResults`, query, {root: true});
    },
    changeQuery({commit, state, dispatch}, query) {
        commit('CHANGE_QUERY', query);

        if (state.searchType.key === 'Substance') {
            dispatch('Substance/changeQuery', query, {root: true});
        }
    },
    changePage({state, dispatch}, page) {
        dispatch(`${state.searchType.key}/changePage`, page, {root: true});
    }
};

export default {
    state,
    mutations,
    actions,
    namespaced: true
}
