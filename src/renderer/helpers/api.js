import {
    createSearchParams, createDiseasesQuery, createRelatedInformationQuery, createSuggestionsQuery,
    createRelatedInformationSubstanceQuery, createRelatedInformationEffectsQuery, createAskEntellectQuery
} from './queryCreator';

const requestWrapper = (url, options = {}) => fetch(url, options).then(res => res.json());

const api = {
    searchResults({queryKey: type, queryValue, currentPage = 1}, facets = {}) {
        console.log(createSearchParams(type, 'search', queryValue, currentPage, facets));
        return requestWrapper(createSearchParams(type, 'search', queryValue, currentPage, facets));
    },
    searchFacets({queryKey: type, queryValue}, facets) {
        console.log(createSearchParams(type, 'facets', queryValue, 1, facets));
        return requestWrapper(createSearchParams(type, 'facets', queryValue, 1, facets));
    },
    searchDiseases({id}) {
        console.log(createDiseasesQuery(id));
        return requestWrapper(createDiseasesQuery(id));
    },
    searchRelatedInformation({queryValue}) {
        console.log(createRelatedInformationQuery(queryValue));
        return requestWrapper(createRelatedInformationQuery(queryValue));
    },
    searchSuggestions(query) {
        console.log(createSuggestionsQuery(query));
        return requestWrapper(createSuggestionsQuery(query));
    },
    searchRelatedInformationSubstance(id) {
        const splittedId = id.split('#')[1];
        console.log(createRelatedInformationSubstanceQuery(splittedId));
        return requestWrapper(createRelatedInformationSubstanceQuery(splittedId));
    },
    searchRelatedInformationEffects(id, query) {
        console.log(createRelatedInformationEffectsQuery(id, query));
        return requestWrapper(createRelatedInformationEffectsQuery(id, query));
    },
    searchAskEntellect(queryValue) {
        console.log(createAskEntellectQuery(queryValue));
        return requestWrapper(createAskEntellectQuery(queryValue));
    }
};

export default api;
