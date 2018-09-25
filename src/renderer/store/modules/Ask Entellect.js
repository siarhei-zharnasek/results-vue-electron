import {api} from '../../helpers';

const state = {
    appliedQuery: '',
    results: {},
    pagination: {
        currentPage: 1,
        maxPage: 0
    },
    facets: {},
    selectedFacets: {},
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
        state.pagination = {
            ...state.pagination,
            ...payload
        };
    },
    FACETS_SUCCEEDED(state, response) {
        state.facets = {...response};
    },
    TOGGLE_FACET(state, selectedFacets) {
        state.selectedFacets = selectedFacets;
    }
};

const actions = {
    changeSearchType({commit, state}) {
        commit('Main/CHANGE_QUERY', state.appliedQuery, {root: true});
    },
    async getResults({commit, state}, query) {
        const payload = {
            queryKey: 'target',
            queryValue: query,
            currentPage: state.pagination.currentPage
        };

        commit('START_LOADING');

        try {
            const response = await api.searchResults(payload, state.selectedFacets);

            commit('CHANGE_APPLIED_QUERY', query);
            commit('Main/CHANGE_QUERY', query, {root: true});
            commit('RESULTS_SUCCEEDED', response);
            commit('STOP_LOADING');

            let pagePayload = {
                maxPage: Math.ceil(response.totalHits / 20)
            };

            commit('CHANGE_PAGE', pagePayload);
        } catch (e) {
            commit('ERROR', e.toString());
        }

    },
    async changeResults({commit, state, dispatch}, query) {
        if (state.appliedQuery !== query) {
            commit('CHANGE_PAGE', {currentPage: 1});
            commit('TOGGLE_FACET', {});

            try {
                commit('START_LOADING');
                const askEntellectResponse = await api.searchAskEntellect(query);

                dispatch('getFacets', askEntellectResponse.query);
                dispatch('getResults', askEntellectResponse.query);
            } catch (e) {
                commit('ERROR', e.toString());
            }
        }
    },
    async changePage({commit, state, dispatch}, newPage) {
        const {currentPage, maxPage} = state.pagination;

        if (newPage > 0 && newPage !== currentPage && newPage < maxPage) {
            commit('CHANGE_PAGE', {currentPage: newPage});
            dispatch('getResults', state.appliedQuery);
        }

    },
    async getFacets({commit, state}, query) {
        const payload = {
            queryKey: 'target',
            queryValue: query
        };

        try {
            const {facets} = await api.searchFacets(payload, state.selectedFacets);

            commit('FACETS_SUCCEEDED', facets);
        } catch (e) {
            commit('ERROR', e.toString());
        }
    },
    async toggleFacet({commit, dispatch, state: {selectedFacets, appliedQuery}}, {facetName, facetValue}) {
        const newFacetName = `_filter.${facetName}`;
        const currentFacet = selectedFacets[newFacetName] || [];
        let newSelectedFacets;

        if (currentFacet && currentFacet.includes(facetValue)) {
            newSelectedFacets = {
                ...selectedFacets,
                [newFacetName]: currentFacet.filter(val => val !== facetValue)
            }
        } else {
            newSelectedFacets = {
                ...selectedFacets,
                [newFacetName]: [...currentFacet, facetValue]
            }
        }

        commit('TOGGLE_FACET', newSelectedFacets);
        commit('CHANGE_PAGE', {currentPage: 1});
        dispatch('getResults', appliedQuery);
        dispatch('getFacets', appliedQuery);
    }
};

export default {
    state,
    mutations,
    actions,
    namespaced: true
}
