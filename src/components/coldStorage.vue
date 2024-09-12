<script setup>
    import { gameState } from "@/stores/game.js";
    const game = gameState();
</script>

<template>
    <div>
        <h1>Strategic Reserve</h1>

        <div class="is-flex is-justify-content-center card-gap">
            <o-button v-for="bitcoin in Math.min(2, game.currentPlayer.bitcoin.hot)" :key="bitcoin" @click="game.actions.coldStorage(bitcoin)">Transfer {{ bitcoin }} bitcoin</o-button>
        </div>
    </div>
</template>