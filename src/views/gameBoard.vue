<script setup>
    import { watch, inject } from "vue";
    import { useRouter } from "vue-router";

    import wallet from "../components/wallet.vue";
    import drawCards from "../components/drawCards.vue";
    import buyMiner from "../components/buyMiner.vue";
    import coldStorage from "../components/coldStorage.vue";
    import difficulty from "../components/difficulty.vue";
    import blockReward from "../components/blockReward.vue";
    import nonce from "../components/nonce.vue";
    import gameLog from "../components/gameLog.vue";
    import jumbotron from "../components/jumbotron.vue";

    import helpModal from "../modals/help.vue";

    import { gameState } from "@/stores/game.js";
    const game = gameState();
    const router = useRouter();
    const oruga = inject("$oruga");



    watch(() => game.blocksRemaining(), (n, o) => {
        if (n <= 0) {
            router.push({ name: "end" });
        }
    })
</script>

<template>
    <div class="board is-flex is-flex-direction-column is-justify-content-space-between card-gap" style="max-height: 100%;">
        <div>
            <div class="is-flex is-justify-content-space-around is-flex-wrap-wrap my-1 mx-1" style="gap: 2px 15px;">
                <div v-for=" player in game.players" :key="player.id" class="is-flex-grow-1">
                    <wallet :player="player" :playing="game.currentPlayer.id == player.id" />
                </div>
            </div>
        </div>
        <div class="has-background-dark py-2">
            <gameLog v-if="true" />
        </div>
        <div class=" is-flex is-justify-content-space-between mx-1">
            <div class="is-flex is-flex-direction-column is-align-items-center">
                <div>Difficulty</div>
                <difficulty :difficulty="game.difficulty" />
            </div>
            <div class="is-flex is-flex-direction-column is-justify-content-space-between">
                <div>
                    <div>{{ game.blocksRemaining() }} blocks</div>
                    <div>remaining</div>
                </div>
                <div>
                    <div>{{ game.blocksUntilHalving() }} blocks</div>
                    <div>til halving</div>
                </div>
            </div>
            <div class="is-flex is-flex-direction-column is-justify-content-space-between is-align-items-center has-text-centered">
                <div>Epoch<br />{{ game.toRoman(game.epoch) }}</div>
                <block-reward :reward="game.epochReward(game.epoch)" />
            </div>
            <div class="is-flex is-flex-direction-column is-justify-content-space-between has-text-centered">
                <div>Last<br />nonce</div>
                <nonce :nonce="game.lastNonce" />
            </div>
        </div>
        <div class="mx-1">
            <wallet :player="game.players[0]" mode="player" />
        </div>
        <div class="mx-1">
            <div style="min-height: 110px;">
                <drawCards v-if="game.actions.current == 'draw'" />
                <buyMiner v-else-if="game.actions.current == 'buyMiner'" />
                <coldStorage v-else-if="game.actions.current == 'coldStorage'" />
                <jumbotron v-else :current-player="game.currentPlayer" />
            </div>
            <div class="is-flex is-justify-content-space-between is-flex-wrap-wrap card-gap mt-1 mb-4">
                <o-button @click="game.actions.setCurrent('draw')" size="small" :disabled="game.currentPlayer.id != 'B' || !game.actions.canDraw()" icon-left="bars">Draw</o-button>
                <o-button @click="game.actions.setCurrent('buyMiner')" size="small" :disabled="game.currentPlayer.id != 'B' || !game.actions.canBuyMiner()" icon-left="circle-plus">Miner</o-button>
                <o-button @click="game.actions.setCurrent('coldStorage')" size="small" :disabled="game.currentPlayer.id != 'B' || !game.actions.canColdStorage()" icon-left="snowflake">Store</o-button>
                <o-button @click="game.actions.endTurn" size="small" :disabled="game.currentPlayer.id != 'B'" icon-left="arrow-left">End turn</o-button>
                <o-button @click="game.actions.mine" size="small" :disabled="game.currentPlayer.id != 'B' || !game.actions.canMine()" icon-left="hammer">Mine</o-button>
            </div>
        </div>
    </div>
</template>

<style>



    .board {
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
        height: 100%;
    }

    .board-margin {
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
        height: 0;
    }

    .current {
        color: inherit;
    }

    .nonCurrent {
        color: #333;
    }

    .bitcoin {
        width: 16px;
        height: 16px;
        position: relative;
    }

    .is-xlarge {
        font-size: 4em;
        z-index: 0;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>