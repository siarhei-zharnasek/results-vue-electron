<template>
    <div>
        <div
            class="container"
            v-for="result in resultsData"
        >
            <div class="block">{{result.title}}</div>
            <div class="block">
                <div class="title">Abstract</div>
                <div class="text">{{result.abstract}}</div>
            </div>
            <div class="block">
                <div class="title">Keywords</div>
                <span
                    v-for="keyword in result.keywords"
                    class="keyword"
                >
                    {{keyword}}
                </span>
            </div>
            <div class="block">
                <div class="title">Journal Title</div>
                <div class="text">{{result.publicationDetail.publicationname}}</div>
            </div>
            <div class="block">
                <div class="title">Year</div>
                <div class="text">{{result.publicationDetail.hasPublicationYear}}</div>
            </div>
            <div class="block">
                <div class="title">Authors</div>
                <span
                        v-for="cr in result.creator"
                        class="keyword"
                >
                    {{cr.name}}
                </span>
            </div>
            <div class="block">
                <div class="title">Source</div>
                <div class="text">{{result.provenance.supplier.name}}</div>
            </div>
            <div class="block">
                <div class="title">PUI</div>
                <div class="text">{{result.pui}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['resultsData']
    }
</script>

<style scoped>
    .container {
        margin-bottom: 50px;
    }

    .block {
        margin-bottom: 5px;
        padding-bottom: 5px;
        border-bottom: 1px solid gray;
    }

    .title {
        font-weight: 500;
    }

    .text {
        font-size: 14px;
    }

    .keyword {
        margin-right: 10px;
    }
</style>
