<template>
    <div>
        <citation-results
            v-if="searchType === 'Citation'"
        ></citation-results>
        <substance-results
            v-else-if="searchType === 'Substance'"
        ></substance-results>
        <target-results
            v-else-if="searchType === 'Target'"
        ></target-results>
        <ask-entellect-results
            v-else
        ></ask-entellect-results>
    </div>
</template>

<script>
    import CitationResults from './CitationResults';
    import SubstanceResults from './SubstanceResults';
    import TargetResults from './TargetResults';
    import AskEntellectResults from './AskEntellectResults';

    export default {
        props: ['searchType'],
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
