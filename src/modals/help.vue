<script setup>
    import cards from "../components/cards.vue";
    import difficulty from "../components/difficulty.vue";
    import nonce from "../components/nonce.vue";

    const emit = defineEmits(["close"]);

    function Close() {
        emit('close');
    }
</script>

<template>
    <div class="modal-card">
        <header class="modal-card-head has-background-black-ter">
            <p class="modal-card-title has-text-white">How to play</p>
        </header>
        <section class="modal-card-body has-background-black has-text-white">
            <div class="is-flex is-flex-direction-column card-gap">

                <div class="header">Goal</div>
                <div>
                    Accumulate the most bitcoin before the end of the third epoch
                </div>

                <div class="header" id="player-types">Player Types</div>
                <div class="is-flex is-flex-direction-column card-gap">
                    <div><o-icon icon="user" size="large" /> Human - plays turns, automatically defends</div>
                    <div><o-icon icon="robot" size="large" /> Bot - plays turns, automatically defends</div>
                    <div><o-icon icon="user-slash" size="large" /> NPC - does not play, sells miners, agrees to all transactions </div>

                </div>

                <div class="header" id="storage">Key storage</div>
                <div>
                    <div><o-icon icon="fire" class="hot-wallet" size="large" /><b>Hot Wallet</b> can be attacked by other players.</div>
                    <div><o-icon icon="snowflake" class="cold-storage" size="large" /><b>Cold storage</b> cannot be attacked by other players.</div>
                </div>

                <div class="header" id="card-types">Card Types</div>
                <div class="is-flex is-flex-direction-column card-gap">
                    <div>
                        <div><b>Player</b> cards determine the transaction sender and receiver</div>
                        <cards :cards="['pB0', 'pY4', 'pR3', 'pG-2', 'pO3', 'pW2']" size="large" />
                    </div>
                    <div>
                        <div><b>Bitcoin</b> cards determine the amount of bitcoin spent in a transactiom</div>
                        <cards :cards="['b42', 'b26', 'b27', 'b32', 'b11', 'b22']" size="large" />
                    </div>
                    <div>
                        <div><b>Hash</b> cards determine the nonce of the block</div>
                        <cards :cards="['h44', 'h-2-2', 'h55', 'h44', 'h88', 'h00']" size="large" /> <br />
                    </div>
                </div>

                <div class="header" id="card-order">Card order</div>
                <div>
                    <div class="is-flex is-size-7">
                        <div style="flex-basis: 65px">Sender</div>
                        <div style="flex-basis: 65px">Amount</div>
                        <div style="flex-basis: 65px">Receiver</div>
                        <div style="flex-basis: 65px">Nonce</div>
                    </div>
                    <cards :cards="['pB0', 'b42', 'pY4', 'h44']" size="large" />
                </div>
                <div>The sending and receiving player cards can be swapped at any time</div>

                <div class="header" id="valid-transactions">Valid transactions</div>
                <div>In order to be valid, the sum of the card values + the nonce of the last block must less than or equal to the current difficulty.</div>

                <div class="mb-4">
                    <div class="is-flex card-gap">
                        <cards :cards="['pG1', 'b22', 'pG3', 'h66']" size="large" showNonce="true" />
                        <nonce :nonce="8" />
                        <div>=</div>
                        <div>20</div>
                    </div>
                    <div class="is-flex">
                        <div style="max-width: 150px;">
                            <difficulty :difficulty="21" />
                        </div>
                        <o-icon icon="check" size="large" style="color: green;" />
                    </div>
                </div>

                <div class="is-flex card-gap">
                    <cards :cards="['pY8', 'b32', 'pR5', 'h55']" size="large" showNonce="true" />
                    <nonce :nonce="7" />
                    <div>=</div>
                    <div>27</div>
                </div>
                <div class="is-flex">
                    <div style="max-width: 150px;">
                        <difficulty :difficulty="25" />
                    </div>
                    <o-icon icon="xmark" size="large" style="color: red;" />
                </div>

                <div>The sending player must also have at least the amount of bitcoin in <a class="link" href="#storage">hot wallet</a> as the transaction amount.</div>

                <div class="header" id="defense">Attack / Defense</div>
                <div>When a transaction attacks your bitcoin, you are a forced sender in another miner's transaction. You are given a 50/50 chance of defending this attack.</div>
                <div><o-icon icon="shield" size="large" />If the defense is successful, the amount of bitcoin that was attacked is moved your <a class="link" href="#storage">cold storage</a>.</div>
                <div><o-icon icon="hammer" size="large" />If the defense fails, the block is mined and your bitcoin is lost</div>

                <div class="header" id="mining">Mining a block</div>
                <div>
                    <div>Depending on player type of the <a class="link" href="#card-order">sender</a></div>
                    <div><o-icon icon="user" size="large" /> Humans automatically defend</div>
                    <div><o-icon icon="robot" size="large" /> Bots automatically defend</div>
                    <div><o-icon icon="user-slash" size="large" /> NPCs agree to all transactions</div>

                    <div class="my-6">A block is mined when the miner has a valid transaction and the sending player either agrees to the transaction or <a class="link" href="#defense">defense</a> fails.</div>

                    <div>Mining a block</div>
                    <ul>
                        <li>Adds the block to the timechain</li>
                        <li>Confirms the miner's transaction</li>
                        <li>Spends the bitcoin from the sender to the receiver</li>
                        <li>Rewards the miner with the block reward</li>
                        <li>Ends the turn</li>
                    </ul>
                </div>

                <div class="header" id="difficulty">Difficulty</div>

                <div>Difficulty starts at 21</div>
                <div style="max-width: 150px;">
                    <difficulty :difficulty="21" />
                </div>

                <div>After each players turn, difficulty is adjusted.</div>

                <div><b>This may seem counterintuitive</b></div>
                <div>When difficulty increases the target number is lowered, making it harder to mine the next block.</div>
                <div>When difficulty descreases the target number is raised, making it easier to mine the next block.</div>

                <div>Mining a block increases difficulty by 1.</div>
                <div style="max-width: 150px;">
                    <difficulty :difficulty="20" />
                </div>
                <div>All other actions will decrease difficulty by 1.</div>
                <div style="max-width: 150px;">
                    <difficulty :difficulty="22" />
                </div>

                <div class="header" id="your-turn">Your turn</div>
                <div>At anytime you can</div>
                <div><o-button icon-left="arrow-left">End Turn</o-button></div>
                <div>When you have a valid transaction, you can attempt to <a class="link" href="#mining">mine the next block</a></div>
                <div><o-button icon-left="hammer">Mine</o-button></div>

                <div>Or select one of the following actions</div>
                <div class="is-flex is-justify-content-space-between">
                    <o-button icon-left="bars">Draw</o-button>
                    <o-button icon-left="circle-plus">Miner</o-button>
                    <o-button icon-left="snowflake">Store</o-button>
                </div>

                <div class="mt-4"><o-button icon-left="bars" size="small">Draw</o-button></div>
                <div>You can draw as many cards as you have miners. Draw cards to build a <a class="link" href="#valid-transactions">valid transaction</a>. Draw any <a class="link" href="#card-types">card type</a> and swap with a similar card in your hand.</div>

                <div><o-button icon-left="circle-plus" size="small">Miner</o-button></div>
                <div>Purchase an available miner from an NPC. You can purchase 1 per turn. Miners cost 1 bitcoin each. Buying a miner will allow you to draw one additional card each round for the rest of the game.</div>

                <div><o-button icon-left="snowflake" size="small">Store</o-button></div>
                <div class="mb-6">Transfer up to 2 bitcoin from your hot wallet to your cold storage per turn. Bitcoin in cold storage cannot be attacked by other players.</div>
            </div>
        </section>
    </div>
</template>

<style>
    .header {
        font-size: 1.5em;
        border-bottom: 1px solid white;
        margin: .5em 0;
    }

    ul {
        list-style: circle;
        padding-left: 2em;
    }

    ol {
        padding-left: 2em;
    }
</style>