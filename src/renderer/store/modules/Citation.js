import {api} from '../../helpers';

const state = {
    appliedQuery: '',
    results: {},
    pagination: {
        currentPage: 1,
        maxPage: 0
    },
    facets: {},
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
        state.results = {...response};
    },
    ERROR(state, error) {
        state.error = error;
    },
    CHANGE_PAGE(state, payload) {
        state.pagination = {...payload};
    },
    FACETS_SUCCEEDED(state, response) {
        state.facets = {...response};
    }
};

const actions = {
    changeSearchType({commit, state}) {
        commit('Main/CHANGE_QUERY', state.appliedQuery, {root: true});
    },
    async getResults({commit, state}, query) {
        const payload = {
            queryKey: 'citation',
            queryValue: query,
            currentPage: state.pagination.currentPage
        };

        commit('START_LOADING');

        try {
            const response = await api.searchResults(payload);

            commit('CHANGE_APPLIED_QUERY', query);
            commit('RESULTS_SUCCEEDED', response);
            commit('STOP_LOADING');
        } catch (e) {
            commit('ERROR', e.toString());
        }
    },
    async changeResults({commit, state, dispatch}, query) {
        if (state.appliedQuery !== query) {
            let payload = {
                currentPage: 1,
                maxPage: state.maxPage
            };

            commit('CHANGE_PAGE', payload);
            dispatch('getFacets', query);
            await dispatch('getResults', query);

            payload.maxPage = Math.ceil(state.results.totalHits / 20);

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
    },
    async getFacets({commit, state}, query) {
        const payload = {
            queryKey: 'citation',
            queryValue: query
        };

        try {
            const {facets} = await api.searchFacets(payload, state.facets);

            commit('FACETS_SUCCEEDED', facets);
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
