<script setup>
    import { gameState } from "@/stores/game.js";
    import playerIcon from "./playerIcon.vue";
    import bitcoin from "./bitcoin.vue";
    import cards from "./cards.vue";
    const game = gameState();
</script>

<template>
    <div class="game-log">
        <div class="is-flex turns">
            <div class="turn" v-for="turn in game.turnsReverse" :key="turn.id">
                <div class="is-flex turn-header mb-2 card-gap" :class="turn.player">
                    <div class="has-text-centered" :class="turn.player">
                        <playerIcon :value="turn.player" size="small" />
                    </div>
                    <div class="has-text-light">
                        {{ game.players.find(p => p.id == turn.player)?.name ?? 'Satoshi' }}
                    </div>
                </div>
                <div class="is-flex is-justify-content-center card-gap">
                    <div class="is-flex is-align-items-center card-gap">
                        <div v-if="turn.defender">
                            <playerIcon :value="turn.defender" size="large" />
                        </div>
                        <div class="is-flex is-flex-direction-column is-align-items-center">
                            <o-icon :icon="game.getTurnIcon(turn.action)" size="medium" />
                            <span>{{ game.getTurnText(turn.action) }}</span>
                        </div>
                        <playerIcon v-if="turn.seller" :value="turn.seller" size="large" />

                        <div v-if="turn.bitcoin" class="bitcoinContainer" :class="{ 'genesisBlock': turn.bitcoin === 6 }">
                            <bitcoin v-if="turn.bitcoin" :bitcoin="turn.bitcoin" size="medium" />
                        </div>
                        <cards v-if="turn.cards" :cards="turn.cards" :showNonce="false" size="small" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
    .turn-header.Satoshi {
        color: #eee;
        border-bottom: solid 1px #eee;
    }

    .turn-header.B {
        border-bottom: solid blue 1px;
    }

    .turn-header.G {
        border-bottom: solid green 1px;
    }

    .turn-header.R {
        border-bottom: solid red 1px;
    }

    .turn-header.Y {
        border-bottom: solid yellow 1px;
    }

    .turn-header.O {
        border-bottom: solid orange 1px;
    }

    .turn-header.W {
        border-bottom: solid white 1px;
    }

    .game-log {
        width: 100%;
        overflow-x: auto;
        scrollbar-width: none;
    }

    .bitcoin.medium {
        width: 15px;
        height: 15px;
    }


    .bitcoinContainer {
        padding: 3px;
        width: 40px;
        height: 25px;
    }

    .genesisBlock {
        width: 55px;
        height: 25px;
    }

    .turn {
        padding: 5px;
        min-width: 80px;
        background-color: #222;
        flex-shrink: 0;
    }

    .turns {
        gap: 10px;
    }
</style>