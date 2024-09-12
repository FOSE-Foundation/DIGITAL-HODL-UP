<script setup>
    var props = defineProps({ reward: { type: Number, default: 0 } });
</script>

<template>
    <div class="reward-container">
        <div class="reward-background">
            <o-icon class="reward-background" icon="square" size="xlarge" />
        </div>
        <div class="reward-overlay"><img v-for="n in reward" :key="n" src="@/assets/images/bitcoin.png" class="bitcoin" /></div>
    </div>
</template>

<style>
    .reward-container {
        position: relative;
        width: 50px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .reward-background {
        width: 100%;
        height: 100%;
    }

    .reward-overlay {
        padding: 2px;
        position: absolute;
        color: #333;
    }
</style>