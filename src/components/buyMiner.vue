<script setup>
    import PlayerIcon from './playerIcon.vue';

    import { gameState } from "@/stores/game.js";
    const game = gameState();

</script>

<template>
    <div>
        <h1>Buy miner from</h1>
        <div class="is-flex is-justify-content-center">
            <div v-for="player in game.players.filter(p => p.miners > 0 && p.type == 'NPC')" :key="player.id">
                <PlayerIcon :value="player.id" @click="game.actions.buyMiner(player.id)" />
            </div>
        </div>
    </div>
</template>

<style></style>