<script setup>
    import { computed } from 'vue';

    const props = defineProps(['player', 'value', 'size']);

    const playerId = computed(() => {
        return props.value || props.player?.id;
    });

    const iconSize = computed(() => {
        return props.size || 'large';
    });

</script>

<template>
    <o-icon v-if="playerId == 'B'" icon="cube" :size="iconSize" :class="playerId" />
    <o-icon v-else-if="playerId == 'R'" icon="infinity" :size="iconSize" :class="playerId" />
    <o-icon v-else-if="playerId == 'G'" icon="wrench" :size="iconSize" :class="playerId" />
    <o-icon v-else-if="playerId == 'Y'" icon="bolt-lightning" :size="iconSize" :class="playerId" />
    <o-icon v-else-if="playerId == 'O'" icon="capsules" :size="iconSize" :class="playerId" />
    <o-icon v-else-if="playerId == 'W'" icon="cat" :size="iconSize" :class="playerId" />
    <o-icon v-else icon="user" :size="iconSize" :class="playerId" />
</template>