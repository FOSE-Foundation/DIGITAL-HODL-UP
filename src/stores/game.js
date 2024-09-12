import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'

export const gameState = defineStore('game', () => {
    const players = ref([
        {
            id: 'B',
            color: 'blue',
            name: "You",
            type: "player",
            npub: "npub12qpq7wzdcnu8v2dtv06kayl2lqlv4jdgk5luxyhqrk6m693jmdaqqp597j",
            bitcoin: {
                hot: 0,
                cold: 0
            },
            miners: 0,
            transaction:
            {
                cards: [],
                drawCards: [],
                get valid() {
                    if (!this.cards.length)
                        return false;

                    return validateTransaction(this.cards);
                }
            }
        },
        {
            id: 'G',
            color: 'green',
            name: "Alice",
            type: 'CPU',
            npub: "",
            bitcoin: {
                hot: 0,
                cold: 0
            },
            miners: 0,
            transaction:
            {
                cards: [],
                drawCards: [],
                get valid() {
                    if (!this.cards.length)
                        return false;

                    return validateTransaction(this.cards);
                }
            }
        },
        {
            id: 'O',
            color: 'orange',
            name: "Bob",
            type: 'CPU',
            npub: "",
            bitcoin: {
                hot: 0,
                cold: 0
            },
            miners: 0,
            transaction:
            {
                cards: [],
                drawCards: [],
                get valid() {
                    if (!this.cards.length)
                        return false;

                    return validateTransaction(this.cards);
                }
            }
        },
        {
            id: 'R',
            color: 'red',
            name: "Carol",
            type: 'CPU',
            npub: "",
            bitcoin: {
                hot: 0,
                cold: 0
            },
            miners: 0,
            transaction:
            {
                cards: [],
                drawCards: [],
                get valid() {
                    if (!this.cards.length)
                        return false;

                    return validateTransaction(this.cards);
                }
            }
        },
        {
            id: 'W',
            color: 'white',
            name: "Dave",
            type: 'NPC',
            npub: "",
            bitcoin: {
                hot: 0,
                cold: 0
            },
            miners: 0,
            transaction:
            {
                cards: [],
                drawCards: [],
                get valid() {
                    if (!this.cards.length)
                        return false;

                    return validateTransaction(this.cards);
                }
            }
        },
        {
            id: 'Y',
            color: 'yellow',
            name: "Erin",
            type: 'NPC',
            npub: "",
            bitcoin: {
                hot: 0,
                cold: 0
            },
            miners: 0,
            transaction:
            {
                cards: [],
                drawCards: [],
                get valid() {
                    if (!this.cards.length)
                        return false;

                    return validateTransaction(this.cards);
                }
            }
        }
    ]);

    const turns = ref([]);
    const turnsReverse = computed(() => turns.value.slice().reverse().filter(x => x.type != 'NPC'));

    const turnOrder = ['B', 'G', 'O', 'R', 'W', 'Y'];

    const currentPlayer = computed(() => {
        var index = (turns.value.length - 1) % turnOrder.length;

        if (index < 0) {
            index = 0;
        }
        var player = players.value.find(player => player.id === turnOrder[index]);
        return player;
    });

    watch(currentPlayer, (newPlayer) => {
        if (newPlayer.type === 'NPC') {
            actions.value.endTurn(true);
        }
        else if (newPlayer.type === 'CPU') {
            setTimeout(() => {
                cpuTurn();
            }, 2000);
        }
    });

    function resetGame() {
        for (const player of players.value) {
            player.bitcoin.hot = 0;
            player.bitcoin.cold = 0;
            player.miners = 0;
            player.transaction.cards = [];
        }

        resetDeck("player");
        resetDeck("bitcoin");
        resetDeck("hash");

        blocks.value = [];
        turns.value = [];

        mineGenesisBlock();
    }

    function getRandomTurnPlay() {
        return Math.floor(Math.random() * 3);
    }

    function cpuTurn() {
        if (actions.value.canMine()) {
            actions.value.mine();
        }
        actions.value.swapSenderReceiver(currentPlayer.value.transaction.cards);
        if (actions.value.canMine()) {
            actions.value.mine();
        }

        var play = getRandomTurnPlay();

        var i = 0;
        while (true && i < 20) {
            if (play == 0 && actions.value.canDraw()) {

                while (actions.value.canDraw()) {

                    var drawnCard;
                    var rng = getRandomTurnPlay();

                    if (rng == 0) {
                        drawnCard = actions.value.draw('player');
                        if (cardValue(currentPlayer.value.transaction.cards[0]) > cardValue(drawnCard) || cardHash(currentPlayer.value.transaction.cards[0]) > cardHash(drawnCard)) {
                            currentPlayer.value.transaction.cards[0] = drawnCard;
                        }
                        else if (cardValue(currentPlayer.value.transaction.cards[2]) > cardValue(drawnCard) || cardHash(currentPlayer.value.transaction.cards[2]) > cardHash(drawnCard)) {
                            currentPlayer.value.transaction.cards[2] = drawnCard;
                        }
                    }
                    else {
                        drawnCard = actions.value.draw('bitcoin');
                        if (cardValue(currentPlayer.value.transaction.cards[1]) > cardValue(drawnCard) || cardHash(currentPlayer.value.transaction.cards[1]) > cardHash(drawnCard)) {
                            currentPlayer.value.transaction.cards[1] = drawnCard;
                        }
                    }
                }

                if (actions.value.canMine()) {
                    actions.value.mine();
                }
                actions.value.swapSenderReceiver(currentPlayer.value.transaction.cards);
                if (actions.value.canMine()) {
                    actions.value.mine();
                }
                else {
                    actions.value.endTurn();
                }
                break;
            }
            else if (play == 1 && actions.value.canBuyMiner()) {
                actions.value.buyMiner();
                break;
            }
            else if (play == 2 && actions.value.canColdStorage()) {
                actions.value.coldStorage(1);
                break;
            }
            else {
                play = getRandomTurnPlay();
            }
            i++;
        }
        //actions.value.endTurn();
    }

    const decks = ref({
        player: initPlayerDeck(),
        bitcoin: initBitcoinDeck(),
        hash: initHashDeck()
    });

    function defenseSuccessful() {
        return Math.random() < 0.5;
    }

    const actions = ref({});
    actions.value = {
        current: null,

        setCurrent: function (action) {
            if (actions.value.current == action) {
                if (action == 'draw' && currentPlayer.value.transaction.drawCards.length > 0) {
                    return;
                }
                actions.value.current = null;
            }
            else
                actions.value.current = action;
        },
        swapSenderReceiver: function (cards) {
            [cards[0], cards[2]] = [cards[2], cards[0]];
        },
        canDraw: function () {
            return (!actions.value.current || actions.value.current == 'draw') && currentPlayer.value.miners - (currentPlayer.value.transaction.drawCards.length || 0) > 0;
        },
        draw: function (deck) {

            var card = decks.value[deck].pop();

            if (decks.value[deck].length == 0) {
                resetDeck(deck);
            }

            currentPlayer.value.transaction.drawCards.push(card);

            return card;
        },
        canMine: function () {
            return currentPlayer.value.transaction.valid;
        },
        mine: function () {
            var reward = epochReward();

            var cards = currentPlayer.value.transaction.cards;

            var sender = cardValue(cards[0]);
            var sendingPlayer = players.value.find(player => player.id == sender);
            if (sendingPlayer.type != 'NPC') {
                if (defenseSuccessful()) {
                    actions.value.defense(currentPlayer.value.transaction.cards);
                    return;
                }
            }

            currentPlayer.value.bitcoin.hot += reward;

            processTransaction(cards);

            var playedCards = currentPlayer.value.transaction.cards.slice();

            currentPlayer.value.transaction.cards = [];
            currentPlayer.value.transaction.cards.push(decks.value.player.pop());
            currentPlayer.value.transaction.cards.push(decks.value.bitcoin.pop());
            currentPlayer.value.transaction.cards.push(decks.value.player.pop());
            currentPlayer.value.transaction.cards.push(decks.value.hash.pop());

            currentPlayer.value.transaction.drawCards = [];

            addBlock(playedCards, reward, currentPlayer.value.id);

            increaseDifficulty();
            actions.value.current = null;
        },
        canBuyMiner: function () {
            return (actions.value.current == null || actions.value.current == 'buyMiner') && currentPlayer.value.bitcoin.hot >= 1 && players.value.some(x => x.miners > 0 && x.type == 'NPC');
        },
        buyMiner: function (sellerId) {
            var seller = players.value.find(x => x.miners > 0 && x.type == 'NPC');
            if (sellerId)
                seller = players.value.find(x => x.id == sellerId);

            currentPlayer.value.bitcoin.hot--;
            seller.bitcoin.hot++;

            seller.miners--;
            currentPlayer.value.miners++;

            turns.value.push({ player: currentPlayer.value.id, type: currentPlayer.value.type, action: 'buyMiner', seller: seller.id });
            decreaseDifficulty();
            actions.value.current = null;
        },
        canColdStorage: function () {
            return (!actions.value.current || actions.value.current == 'coldStorage') && currentPlayer.value.bitcoin.hot >= 1;
        },
        coldStorage: function (bitcoin) {
            currentPlayer.value.bitcoin.hot -= bitcoin;
            currentPlayer.value.bitcoin.cold += bitcoin;

            decreaseDifficulty();
            turns.value.push({ player: currentPlayer.value.id, type: currentPlayer.value.type, action: 'coldStorage', bitcoin: bitcoin });
            actions.value.current = null;
        },
        defense: function (cards) {
            var sender = cardValue(cards[0]);
            var sendingPlayer = players.value.find(player => player.id == sender);

            var bitcoin = cardValue(cards[1]);
            sendingPlayer.bitcoin.hot -= bitcoin;
            sendingPlayer.bitcoin.cold += bitcoin;

            currentPlayer.value.transaction.drawCards = [];

            turns.value.push({ player: currentPlayer.value.id, type: currentPlayer.value.type, action: 'defense', defender: sender, bitcoin: bitcoin });
            actions.value.current = null;
        },

        endTurn: function (skipDifficultyAdjustment = false) {
            currentPlayer.value.transaction.drawCards = [];
            turns.value.push({ player: currentPlayer.value.id, type: currentPlayer.value.type, action: 'endTurn' });

            if (!skipDifficultyAdjustment)
                decreaseDifficulty();
            actions.value.current = null;
        }

    };

    function processTransaction(cards) {
        var sender = cardValue(cards[0]);
        var receiver = cardValue(cards[2]);
        var bitcoin = cardValue(cards[1]);

        var senderPlayer = players.value.find(player => player.id == sender);
        var receiverPlayer = players.value.find(player => player.id == receiver);

        senderPlayer.bitcoin.hot -= bitcoin;
        receiverPlayer.bitcoin.hot += bitcoin;
    }

    function validateTransaction(cards) {
        //sum of the hashes less than or equal to the difficulty
        var nonce = cards.reduce((acc, card) => {
            return acc + cardHash(card);
        }, 0);

        nonce += lastNonce.value;

        if (nonce > difficulty.value)
            return false;

        if (cardType(cards[0]) != 'p')
            return false;
        else if (cardType(cards[1]) != 'b')
            return false;
        else if (cardType(cards[2]) != 'p')
            return false;
        else if (cardType(cards[3]) != 'h')
            return false;
        else {
            //check sender has enough corn
            var sender = cardValue(cards[0]);
            var senderBitcoin = players.value.find(player => player.id == sender).bitcoin.hot;
            var bitcoin = cardValue(cards[1]);
            if (senderBitcoin < bitcoin)
                return false;
        }

        return true;
    }

    const cardParser = /^([pbh])(-?\d|[GROWBY])(-?\d)/;

    function cardType(card) {
        const matches = card.match(cardParser);
        return matches ? matches[1] : null;
    }

    function cardValue(card) {
        const matches = card.match(cardParser);
        if (cardType(card) == 'b')
            return Number(matches ? matches[2] : null);
        else
            return matches ? matches[2] : null;
    }

    function cardHash(card) {
        const matches = card.match(cardParser);
        return Number(matches ? matches[3] : null);
    }

    function resetDeck(deckType) {
        switch (deckType) {
            case "player":
                initPlayerDeck();
                break;
            case "bitcoin":
                initBitcoinDeck();
                break;
            case "hash":
                initHashDeck();
                break;
        }
    }

    function initPlayerDeck() {
        let deck = [];
        for (let p = 0; p < 6; p++) {
            var player = 'B';
            switch (p) {
                case 0: player = 'B'; break;
                case 1: player = 'G'; break;
                case 2: player = 'O'; break;
                case 3: player = 'R'; break;
                case 4: player = 'W'; break;
                case 5: player = 'Y'; break;
            }
            for (let nonce = -2; nonce <= 9; nonce++) {
                deck.push('p' + player + nonce);
            }
        }
        shuffle(deck);
        return deck;

    }

    function initBitcoinDeck() {
        let deck = [];
        for (let i = 0; i < 4; i++) {
            for (let b = 1; b <= 4; b++) {
                for (let nonce = -2; nonce < 9; nonce++) {
                    deck.push('b' + b + nonce);
                }
            }
            shuffle(deck);
        }
        return deck;
    }

    function initHashDeck() {
        let deck = [];
        for (let i = 0; i <= 4; i++) {
            for (let nonce = -2; nonce < 9; nonce++) {
                deck.push('h' + nonce + nonce);
            }
        }
        shuffle(deck);
        return deck;
    }

    function shuffle(array) {
        for (let i = 0; i < 10; i++) {
            array.sort(() => Math.random() - 0.5);
        }
    }

    const difficulty = ref(21);
    function increaseDifficulty() {
        if (difficulty.value > 11)
            difficulty.value--;
    }
    function decreaseDifficulty() {
        if (difficulty.value < 31)
            difficulty.value++;
    }

    const blocks = ref([]);
    const epoch = computed(() => {
        if (blocks.value.length < 6) {
            return 1;
        }
        else if (blocks.value.length < 11) {
            return 2;
        }
        else if (blocks.value.length < 17) {
            return 3;
        }
        else
            return 4;
    });

    function blocksUntilHalving() {
        var blocksMined = (blocks?.value?.length - 1) ?? 0;

        if (blocksMined < 5) {
            return 5 - blocksMined;
        }
        else if (blocksMined < 10) {
            return 10 - blocksMined;
        }
        else if (blocksMined < 16) {
            return 16 - blocksMined;
        }
        else
            return 0;
    }
    function blocksRemaining() {
        return 17 - blocks.value.length;
    }

    const lastNonce = computed(() => {
        if (!blocks.value.length) {
            return 0;
        }
        return cardHash(blocks.value[blocks.value.length - 1].cards[blocks.value[blocks.value.length - 1].cards.length - 1]);
    });

    function addBlock(cards, reward, miner) {
        let block = {
            cards: cards,
            miner: miner,
            reward: reward
        };
        blocks.value.push(block);

        turns.value.push({ player: miner == 'Satoshi' ? 'Satoshi' : currentPlayer.value.id, type: miner == 'Satoshi' ? 'Satoshi' : currentPlayer.value.type, action: 'mine', cards, bitcoin: reward, miner });
    }

    function mineGenesisBlock() {
        addBlock([decks.value.hash.pop()], 6, 'Satoshi');
        distributeBitcoin();
        distributeMiners();
        distributeCards();
    }

    function distributeBitcoin() {
        players.value.forEach(player => {
            player.bitcoin.hot = 1;
        });
    }
    function distributeMiners() {
        var NPCs = players.value.filter(player => player.type == 'NPC');
        var PCs = players.value.filter(player => player.type != 'NPC');

        PCs.forEach(player => {
            player.miners = 1;
        });

        var remainingMiners = 12 - PCs.length;
        NPCs.forEach(player => {
            player.miners = Math.floor(remainingMiners / NPCs.length);
        });
    }
    function distributeCards() {
        players.value.forEach(player => {
            for (let i = 0; i < 4; i++) {
                if (i == 0)
                    player.transaction.cards.push(decks.value.player.pop());
                else if (i == 1)
                    player.transaction.cards.push(decks.value.bitcoin.pop());
                else if (i == 2)
                    player.transaction.cards.push(decks.value.player.pop());
                else if (i == 3)
                    player.transaction.cards.push(decks.value.hash.pop());
            }
        });
    }

    function epochReward(e) {
        e = e || epoch.value;

        switch (e) {
            case 1: return 4;
            case 2: return 2;
            case 3: return 1;
            default: return 1;
        }
    }

    function getTurnIcon(action) {
        switch (action) {
            case 'endTurn': return 'arrow-left';
            case 'mine': return 'hammer';
            case 'buyMiner': return 'plug-circle-plus';
            case 'draw': return 'cards';
            case 'coldStorage': return 'snowflake';
            case 'defense': return 'shield';
            default: '';
        }
        return '';
    }

    function getTurnText(action) {
        switch (action) {
            case 'endTurn': return 'end turn';
            case 'mine': return 'mine';
            case 'buyMiner': return 'buy miner';
            case 'draw': return 'cards';
            case 'coldStorage': return 'strategic reserve';
            case 'defense': return 'defends';
            default: '';
        }
        return '';
    }

    function toRoman(num) {
        const romanNumerals = [
            ["M", 1000],
            ["CM", 900],
            ["D", 500],
            ["CD", 400],
            ["C", 100],
            ["XC", 90],
            ["L", 50],
            ["XL", 40],
            ["X", 10],
            ["IX", 9],
            ["V", 5],
            ["IV", 4],
            ["I", 1]
        ];

        let result = "";

        for (let [roman, value] of romanNumerals) {
            while (num >= value) {
                result += roman;
                num -= value;
            }
        }

        return result;
    }

    mineGenesisBlock();

    return { players, currentPlayer, actions, decks, cardType, cardValue, cardHash, difficulty, increaseDifficulty, decreaseDifficulty, blocks, blocksUntilHalving, blocksRemaining, lastNonce, addBlock, epoch, epochReward, toRoman, turns, turnsReverse, turnOrder, getTurnIcon, getTurnText, resetGame }
});

