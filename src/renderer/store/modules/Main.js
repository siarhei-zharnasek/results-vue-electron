import {constants, api} from '../../helpers';

const state = {
    query: '',
    appliedQuery: {
        citation: '',
        substance: '',
        target: '',
        askEntellect: ''
    },
    results: {
        citation: null,
        substance: null,
        target: null,
        askEntellect: null
    },
    searchType: {
        key: 'Citation',
        value: 'citation'
    },
    loading: false,
    error: ''
};

const mutations = {
    CHANGE_SEARCH_TYPE(state, searchTypeKey) {
        const {value} = state.searchType = constants.SEARCH_TYPES.find(({key}) => searchTypeKey === key);
        state.query = state.appliedQuery[value];
    },
    CHANGE_QUERY(state, query) {
        state.query = query;
    },
    CHANGE_APPLIED_QUERY(state, query) {
        state.appliedQuery[state.searchType.value] = query;
    },
    START_LOADING(state) {
        state.loading = true;
    },
    STOP_LOADING(state) {
        state.loading = false;
    },
    RESULTS_SUCCEEDED(state, response) {
        state.results[state.searchType.value] = response;
    },
    ERROR(state, error) {
        state.error = error;
    }
};

const actions = {
    async getResults({commit, state}) {
        let {query, searchType} = state;
        let payload = {
            queryKey: searchType.value,
            queryValue: query
        };

        commit('START_LOADING');

        try {
            if (searchType.value === 'askEntellect') {
                const response = await api.searchAskEntellect(query);

                payload = {
                    queryKey: response.entity.toLowerCase(),
                    queryValue: response.query
                };
            }

            const response = await api.searchResults(payload);

            commit('CHANGE_APPLIED_QUERY', payload.queryValue);
            commit('CHANGE_QUERY', payload.queryValue);
            commit('RESULTS_SUCCEEDED', response);
            commit('STOP_LOADING');
        } catch (e) {
            commit('ERROR', e.toString());
        }

    }
};

export default {
    state,
    mutations,
    actions,
    namespaced: true
}
