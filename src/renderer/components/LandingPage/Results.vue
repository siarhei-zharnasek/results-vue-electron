<template>
    <div>
        <citation-results
            v-if="searchType === 'Citation'"
            v-bind:resultsData="resultsData"
        ></citation-results>
        <substance-results
            v-else-if="searchType === 'Substance'"
            v-bind:resultsData="resultsData"
        ></substance-results>
        <target-results
            v-else-if="searchType === 'Target'"
            v-bind:resultsData="resultsData"
        ></target-results>
        <ask-entellect-results
            v-else
            v-bind:resultsData="resultsData"
        ></ask-entellect-results>
    </div>
</template>

<script>
    import CitationResults from './CitationResults';
    import SubstanceResults from './SubstanceResults';
    import TargetResults from './TargetResults';
    import AskEntellectResults from './AskEntellectResults';

    export default {
        props: ['searchType', 'resultsData'],
        components: {
            CitationResults,
            SubstanceResults,
            TargetResults,
            AskEntellectResults
        }
    }
</script>

<style scoped>
</style>
