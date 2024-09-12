<script setup>
    var props = defineProps({ nonce: { type: Number, default: 0 } });
</script>

<template>
    <div class="nonce-container">
        <div class="nonce-background">
            <o-icon class="nonce-background" icon="square" size="xlarge" />
        </div>
        <div class="nonce-overlay">{{ nonce }}</div>
    </div>
</template>

<style>
    .nonce-container {
        position: relative;
        width: 50px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .nonce-background {
        width: 100%;
        height: 100%;
    }

    .nonce-overlay {
        position: absolute;
        font-size: 2em;
        color: #333;
    }
</style>