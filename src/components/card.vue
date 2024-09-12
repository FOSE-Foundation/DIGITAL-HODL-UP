<script setup>
    import { computed } from 'vue';
    import playerIcon from "../components/playerIcon.vue";

    const props = defineProps({ card: {}, size: { type: String, default: 'small' }, showNonce: { type: Boolean, default: true } });

    import { gameState } from "@/stores/game.js";

    const game = gameState();

</script>

<template>
    <div class="card is-flex is-justify-content-space-between is-flex-direction-column" :class="size">
        <div v-if="showNonce" class="is-align-self-flex-end">
            <span class="my-1 mx-1">{{ game.cardHash(props.card) }}</span>
        </div>
        <div class="value-icon is-align-self-center is-align-items-center is-align-content-center is-flex-grow-1">
            <div v-if="game.cardType(props.card) == 'b'" class="is-flex is-justify-content-space-around is-flex-wrap-wrap" :class="size == 'small' ? 'mx-1' : 'mx-2'">
                <img v-for="n in game.cardValue(props.card)" :key="n" src="@/assets/images/bitcoin.png" class="bitcoin" :class="size" />
            </div>
            <div v-else-if="game.cardType(props.card) == 'p'" class="is-flex is-justify-content-space-around">
                <playerIcon :value="game.cardValue(props.card)" :size="size" />
            </div>
            <div v-else class="hash" :class="size">
                {{ game.cardHash(props.card) }}
            </div>
        </div>

    </div>
</template>

<style lang="scss">
    .bitcoin {
        width: 13px;
        height: 13px;
    }

    .bitcoin.small {
        width: 8px;
        height: 8px;
    }

    .hash {
        font-size: 2em;
    }

    .hash.small {
        font-size: 1.2em;
    }

    .card.small {
        width: 30px;
        height: 35px;
        font-size: 12px;
    }

    .card.small .icon {
        font-size: 20px;
    }

    .card {
        background-color: #333;
        width: 60px;
        height: 70px;
        border: solid 1px #eee;
        color: inherit;
        margin-left: 5px;

    }

    .card.small {
        margin-left: -10px;
    }

    .card:first-child {
        margin-left: 0;
        z-index: 4;
    }

    .card:nth-child(2) {
        z-index: 3;

        .value-icon {
            margin-left: 0px;
        }
    }

    .card:nth-child(3) {
        z-index: 2;
    }

    .card:nth-child(4) {
        z-index: 1;
    }
</style>