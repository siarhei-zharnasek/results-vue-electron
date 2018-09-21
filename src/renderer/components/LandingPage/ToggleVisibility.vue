<template>
    <div>
        <div @click="toggleVisibility()">
            <slot name="title"></slot>
        </div>
        <slot v-if="visible"></slot>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                visible: false
            }
        },
        methods: {
            toggleVisibility() {
                this.visible = !this.visible;
            }
        }
    }
</script>

<style scoped></style>
