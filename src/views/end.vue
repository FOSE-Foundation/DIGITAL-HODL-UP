<script setup>
    import { ref } from "vue";
    import { useRouter } from "vue-router";
    import playerIcon from "../components/playerIcon.vue";

    import { gameState } from "@/stores/game.js";
    const game = gameState();
    const router = useRouter();

    const leaderboard = game.players
        .filter(p => p.type == "CPU" || p.type == "player")
        .sort((a, b) => { if ((a.bitcoin.hot + a.bitcoin.cold) < (b.bitcoin.hot + b.bitcoin.cold)) return 1; else return -1; });
    const topPlayer = ref(leaderboard[0]);

    function playAgain() {
        game.resetGame();
        router.push({ name: "game" });
    }

    if (game.blocks.length == 0 || game.blocks.length == 1 && game.blocks[0].miner == 'Satoshi') {
        router.push({ name: "game" }); //Redirect, the game never started.
    }
</script>

<template>
    <div class="container has-text-centered">
        <h2 class="is-size-1">Congratulations!</h2>
        <p class="is-size-3">
            <player-icon :value="topPlayer.id" size="medium" />
            <span class="ml-5">{{ topPlayer.name }}</span>
        </p>
        <div class="is-size-4">
            wins the game<br /> {{ topPlayer.bitcoin.hot + topPlayer.bitcoin.cold }} bitcoin
        </div>
        <div>
            <o-button size="medium" class="mt-3" @click="playAgain">Play Again</o-button>
        </div>
    </div>
</template>