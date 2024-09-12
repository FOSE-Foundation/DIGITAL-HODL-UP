<script setup>
    import card from "./card.vue";

    var props = defineProps({ cards: { type: Array, default: () => [] }, size: { type: String, default: 'small' }, showNonce: { type: Boolean, default: false } });
</script>

<template>
    <div class="cardContainer">
        <card v-for="c in cards" :key="c" :card="c" :show-nonce="showNonce" :size="size" />
    </div>
</template>

<style>
    .cardContainer {
        display: flex;
        flex-direction: row;
        align-items: center;
        position: relative;
        overflow: visible;
    }
</style>