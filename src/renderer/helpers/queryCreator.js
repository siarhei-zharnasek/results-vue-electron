export const addPrefixToActions = (entityName, actions) => {
    const modifiedActions = {};

    for (const [key, val] of Object.entries(actions)) {
        modifiedActions[key] = typeof val === 'object' ? addPrefixToActions(entityName, val) : `${entityName}_${val}`;
    }

    return modifiedActions;
};

const URL = 'http://192.168.1.22:4200';
const SEARCH_URL = `${URL}/search/`;

const createQueryParams = (searchType, query, facets) => {
    const q = encodeURIComponent(query.trim());
    let resultQuery;

    switch (searchType) {
        case 'citation': {
            resultQuery = `abstract=${q}&keywords=${q}&title=${q}`;
            break;
        }

        case 'substance': {
            resultQuery = `displayName.name=${q}&substanceNames.name=${q}`;
            break;
        }

        case 'target': {
            resultQuery = `altLabels=${q}&prefLabel=${q}&uniprotId=${q}`;
            break;
        }
    }

    for (const [key, values] of Object.entries(facets)) {
        values.forEach(val => resultQuery += `&${key}=${val}`);
    }

    return resultQuery;
};

export const createSearchParams = (queryKey, entity, queryValue, page, facets) =>
    `${SEARCH_URL}/${queryKey}/${entity}?_from=${(page - 1) * 20}&_size=20&${createQueryParams(queryKey, queryValue, facets)}`;

export const createDiseasesQuery = id => `${URL}/diseases/target/${id}/diseases`;
export const createRelatedInformationQuery = query => `${URL}/ri/target/relations?search=${encodeURIComponent(query)}`;
export const createSuggestionsQuery = query =>
    `${URL}/auto-complete/substance/auto-complete?query=${encodeURIComponent(query)}`;

export const createRelatedInformationSubstanceQuery = query =>
    `${URL}/substance/substance/search?@id=${encodeURIComponent(query)}`;

export const createAskEntellectQuery = query =>
    `${URL}/ask-entellect/ask-entellect?search=${encodeURIComponent(query)}`;

export const createRelatedInformationEffectsQuery = (id, query) =>
    `${URL}/effects/target/relations/effect?substance=${encodeURIComponent(id)}&target=${encodeURIComponent(query)}`;
