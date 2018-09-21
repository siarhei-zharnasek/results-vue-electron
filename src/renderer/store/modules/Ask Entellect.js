import {api} from '../../helpers';

const state = {
    appliedQuery: '',
    results: {},
    pagination: {
        currentPage: 1,
        maxPage: 0
    },
    loading: false,
    error: ''
};

const mutations = {
    CHANGE_APPLIED_QUERY(state, query) {
        state.appliedQuery = query;
    },
    START_LOADING(state) {
        state.loading = true;
    },
    STOP_LOADING(state) {
        state.loading = false;
    },
    RESULTS_SUCCEEDED(state, response) {
        state.results = response;
    },
    ERROR(state, error) {
        state.error = error;
    },
    CHANGE_PAGE(state, payload) {
        state.pagination = payload;
    }
};

const actions = {
    changeSearchType({commit, state}) {
        commit('Main/CHANGE_QUERY', state.appliedQuery, {root: true});
    },
    async getResults({commit, state}, query) {
        let payload = {
            queryKey: 'askEntellect',
            queryValue: query,
            currentPage: state.pagination.currentPage
        };

        commit('START_LOADING');

        try {
            const askEntellectResponse = await api.searchAskEntellect(query);

            payload = {
                queryKey: askEntellectResponse.entity.toLowerCase(),
                queryValue: askEntellectResponse.query
            };

            const response = await api.searchResults(payload);

            commit('CHANGE_APPLIED_QUERY', payload.queryValue);
            commit('Main/CHANGE_QUERY', payload.queryValue, {root: true});
            commit('RESULTS_SUCCEEDED', response);
            commit('STOP_LOADING');
        } catch (e) {
            commit('ERROR', e.toString());
        }

    },
    async changeResults({commit, state, dispatch}, query) {
        if (state.appliedQuery !== query) {
            await dispatch('getResults', query);
            const maxPage = Math.ceil(state.results.totalHits / 20);
            const payload = {
                currentPage: 1,
                maxPage
            };
            commit('CHANGE_PAGE', payload);
        }
    },
    async changePage({commit, state, dispatch}, newPage) {
        const {currentPage, maxPage} = state.pagination;

        if (newPage > 0 && newPage !== currentPage && newPage < maxPage) {
            const payload = {
                currentPage: newPage,
                maxPage
            };
            commit('CHANGE_PAGE', payload);
            dispatch('getResults', state.appliedQuery);
        }

    }
};

export default {
    state,
    mutations,
    actions,
    namespaced: true
}
