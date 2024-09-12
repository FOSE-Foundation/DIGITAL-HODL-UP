<script setup>

    import draggable from 'vuedraggable-swap';
    import card from "../components/card.vue";

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
    <div class="is-flex pb-4" style="gap:25px">
        <div class=" is-flex is-flex-direction-column card-gap">
            <o-button @click="game.actions.draw('player')" size="small" :disabled="!game.actions.canDraw()" icon-left="user">Player</o-button>
            <o-button @click="game.actions.draw('bitcoin')" size="small" :disabled="!game.actions.canDraw()" icon-left="bitcoin-sign">Bitcoin</o-button>
            <o-button @click="game.actions.draw('hash')" size="small" :disabled="!game.actions.canDraw()" icon-left="hashtag">Hash</o-button>
        </div>
        <div class="is-flex is-flex-direction-column card-gap is-justify-content-space-between">
            Draw {{ game.currentPlayer.miners - (game.currentPlayer.transaction.drawCards.length || 0) }} cards
            <draggable :list="game.currentPlayer.transaction.drawCards" :move="onMove" swap="true" :item-key="getKey" group="cards" class="is-flex card-gap">
                <template #item="{ element }">
                    <card :card="element" size="large" />
                </template>
            </draggable>
        </div>
    </div>
</template>
