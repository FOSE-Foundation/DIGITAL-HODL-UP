<script setup>
    import { inject } from "vue";
    import helpModal from "../modals/help.vue";

    var props = defineProps({ currentPlayer: { type: Object, default: {} } })

    const oruga = inject("$oruga");

    function showHelp() {
        oruga.modal.open({
            component: helpModal
        });
    }
</script>

<template>
    <div class="is-flex is-flex-direction-column is-justify-content-space-between">
        <div class="has-text-centered">
            <a href="https://www.freemarketkids.com/collections/games-1" class="link is-size-5" target="_blank">Hodlup - a bitcoin mining game</a>
        </div>
        <div v-if="currentPlayer.id == 'B'" class="has-text-centered my-4">
            It is your turn. Please choose an action.
            <div class="is-clickable" @click="showHelp">
                <o-icon icon="circle-question" size="medium"></o-icon>
            </div>
        </div>
    </div>
</template>

<style></style>