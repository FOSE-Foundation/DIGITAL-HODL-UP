<script setup>
    const props = defineProps({ bitcoin: { type: Number, default: 0 }, size: { type: String, default: 'small' } });
</script>

<template>
    <div class="is-flex is-justify-content-space-around is-flex-wrap-wrap is-align-content-center">
        <img v-for="n in bitcoin" :key="n" src="@/assets/images/bitcoin.png" class="bitcoin" :class="size" />
    </div>
</template>

<style></style>