<script setup>
    var props = defineProps({ difficulty: { type: Number, default: 21 } });
</script>

<template>
    <div class="is-flex is-justify-content-space-between">
        <div v-for="n in 3" :key="n" class="is-flex is-flex-direction-column is-align-items-center">
            <o-icon icon="circle" size="large" :class="n == 2 ? 'current' : 'nonCurrent'" />
            {{ difficulty - (2 - n) }}
        </div>
    </div>
</template>

<style></style>