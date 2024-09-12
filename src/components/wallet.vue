<script setup>
    import { computed } from 'vue';
    import draggable from 'vuedraggable-swap'

    import cards from "../components/cards.vue";
    import card from "../components/card.vue";
    import playerIcon from "../components/playerIcon.vue";

    const props = defineProps({ player: {}, playing: false, mode: { type: String, default: "status" } });

    import { gameState } from "@/stores/game.js";

    const game = gameState();

    const onMove = (event) => {
        if (game.cardType(event.draggedContext.element) === game.cardType(event.relatedContext.element)) {
            return true;
        }
        return false;
    };

    const getKey = (item) => {
        return item;
    };
</script>

<template>
    <div :class="{ 'hand': true, 'is-playing': playing }">
        <div class="is-flex is-justify-content-space-between">
            <div>
                <playerIcon :value="player.id" size="medium" />
                <span>
                    {{ player.name }}
                </span>
            </div>
            <div class="is-align-self-flex-end">
                <o-icon v-if="player.type == 'player'" icon="user" size="small" />
                <o-icon v-else-if="player.type == 'CPU'" icon="robot" size="small" />
                <o-icon v-else icon="user-slash" size="small" />
            </div>
        </div>
        <div class="is-flex is-flex-direction-column is-justify-content-space-between wallet" :class="player.color">
            <div class="is-flex is-justify-content-space-between is-flex-grow-1">
                <div v-if="mode == 'player'" class="is-flex is-justify-content-space-between">
                    <draggable :list="player.transaction.cards" :item-key="getKey" :swap="true" :move="onMove" group="cards" class="cardContainer">
                        <template #item="{ element }">
                            <card :card="element" :show-nonce="mode == 'status' ? false : true" :size="mode == 'status' ? 'small' : 'large'" />
                        </template>
                    </draggable>
                </div>
                <cards v-else :cards="player.transaction.cards" :showNonce="mode != 'status'" :size="mode == 'status' ? 'small' : 'large'" class="cardContainer" />
                <div class="is-flex is-flex-direction-column is-justify-content-space-between">
                    <div v-if="mode == 'status' ? false : true">
                        <o-icon v-if="player.transaction.valid" icon="check" size="small" style="color: green;" />
                        <o-icon v-else icon="xmark" size="small" style="color: red;" />
                    </div>
                    <div class="is-flex is-flex-wrap-wrap">
                        <o-icon v-for="x in player.miners" :key="x" icon="plug" class="miner" size="small" />
                    </div>
                    <div class="is-flex is-justify-content-space-between" style="gap: 10px;">
                        <div>
                            <div style="position: relative; display: inline-block;"><span style="position: relative; z-index: 10;" class="is-size-5 has-text-weight-bold">{{ player.bitcoin.hot }}</span><o-icon icon="fire" :size="mode == 'status' ? 'medium' : 'large'" class="hot-wallet" style="z-index: 1; position: absolute; top: 50%; left: 50%;transform: translate(-50%, -50%);" /></div>
                        </div>
                        <div>|</div>
                        <div>
                            <div style="position: relative; display: inline-block;"><span style="position: relative; z-index: 10;" class="is-size-5 has-text-weight-bold">{{ player.bitcoin.cold }}</span><o-icon icon="snowflake" :size="mode == 'status' ? 'medium' : 'large'" class="strategic-reserve" style="z-index: 1; position: absolute; top: 50%; left: 50%;transform: translate(-50%, -50%);" /></div>
                        </div>
                    </div>
                </div>

            </div>

        </div>

    </div>

</template>

<style>
    .hand {
        min-width: 150px;
    }

    .wallet {
        border-top: 1px solid black;
        padding: 5px 0 0 0;
    }

    img.profile {
        width: 20px;
        height: 20px;
        border-radius: 50%;
    }

    .is-playing {
        background: #222;
    }

    .red {
        border-color: red
    }

    .blue {
        border-color: blue;
    }

    .green {
        border-color: green;
    }

    .yellow {
        border-color: yellow;
    }

    .orange {
        border-color: orange;
    }

    .white {
        border-color: white;
    }
</style>