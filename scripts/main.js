const dealerHand = document.getElementById('dealer-hand')
const playerHand = document.getElementById('player-hand')
const dealerPoints = document.getElementById('dealer-points')
const playerPoints = document.getElementById('player-points')
const dealBtn = document.getElementById('deal-button')
const hitBtn = document.getElementById('hit-button')
const standBtn = document.getElementById('stand-button')
const printPlayerPoints = document.createElement('div')
const printDealerPoints = document.createElement('div')

let gameStatus = 'init'
const playerCards = []
const dealerCards = []
let playerHandValue = 0
let dealerHandValue = 0
let deck = []
let gameCondition = ''

class Card {
    constructor(name) {
        this.name = name
        this.value = this.getValue()
    }

    getValue = () => {
        let value
        const cardsWorthTen = ['K', 'Q', 'J']
        if (!isNaN(this.name[0])) {
            if (this.name[0] === '1') {
                if (isNaN(this.name[1])) {
                    value = 1
                } else if (!isNaN(this.name[1])) {
                    value = 10
                }
            } else value = Number(this.name[0])
        } else if (cardsWorthTen.includes(this.name[0])) {
            value = 10
        } else {
            value = 11
        }
        return value
    }

    setValue = newValue => {
        this.value = newValue
    }

    print = () => {
        console.log(this.name)
    }

    getImage = () => {
        let rank
        if (!isNaN(this.name[0])) {
            if (this.name[0] === '1') {
                if (isNaN(this.name[1])) {
                    rank = '1'
                } else if (!isNaN(this.name[1])) {
                    rank = '10'
                }
            } else rank = this.name[0]
        } else if (this.name[0] === 'J') {
            rank = 'jack'
        } else if (this.name[0] === 'Q') {
            rank = 'queen'
        } else if (this.name[0] === 'K') {
            rank = 'king'
        } else if (this.name[0] === 'A') {
            rank = 'ace'
        }
        let suit
        if (this.name.slice(-1) === 'H') {
            suit = 'hearts'
        } else if (this.name.slice(-1) === 'S') {
            suit = 'spades'
        } else if (this.name.slice(-1) === 'D') {
            suit = 'diamonds'
        } else if (this.name.slice(-1) === 'C') {
            suit = 'clubs'
        }
        return `./images/${rank}_of_${suit}.png`
    }
}

const makeDeck = () => {
    let suits = ['H', 'S', 'C', 'D']
    let ranks = [
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        'J',
        'Q',
        'K',
        'A',
    ]
    counter = 0
    for (let suitCounter = 0; suitCounter < suits.length; suitCounter++) {
        for (rankCounter = 0; rankCounter < ranks.length; rankCounter++) {
            let name = ranks[rankCounter] + suits[suitCounter]
            deck.push(new Card(name))
        }
    }
    return deck
}

const shuffle = deck => {
    deck.sort(() => Math.random() - 0.5)
    deck.sort(() => Math.random() - 0.5)
    deck.sort(() => Math.random() - 0.5)
    return deck
}

const dealCard = (hand, windowHand) => {
    const currentCard = deck.pop()
    hand.push(currentCard)

    const makeCard = document.createElement('img')
    makeCard.src = currentCard.getImage()
    windowHand.appendChild(makeCard)
}

const getPoints = hand => {
    console.log(hand)
    let points = 0
    for (let card = 0; card < hand.length; card++) {
        points = points + hand[card].value
    }
    return points
}

const renderPoints = (handvalue, whichplayer, whosepoints) => {
    whosepoints.innerHTML = handvalue.toString()
    whichplayer.appendChild(whosepoints)
}

dealBtn.addEventListener('click', () => {
    dealCard(playerCards, playerHand)
    dealCard(dealerCards, dealerHand)
    dealCard(playerCards, playerHand)
    dealCard(dealerCards, dealerHand)
    console.log({ playerCards, dealerCards })
    let playerHandValue = getPoints(playerCards)
    let dealerHandValue = getPoints(dealerCards)
    renderPoints(playerHandValue, playerPoints, printPlayerPoints)
    renderPoints(dealerHandValue, dealerPoints, printDealerPoints)
    console.log(checkPoints(playerHandValue, playerCards))
})

hitBtn.addEventListener('click', () => {
    dealCard(playerCards, playerHand)
    let playerHandValue = getPoints(playerCards)
    renderPoints(playerHandValue, playerPoints, printPlayerPoints)
    setPlayerPoints(getPoints(playerCards))
    console.log(checkPoints(playerHandValue, playerCards))
})

standBtn.addEventListener('click', () => {})

const checkPoints = (value, hand) => {
    let newValue = 0
    if (value < 21) {
        return (gameStatus = 'cont')
    } else if (value === 21) {
        return (gameStatus = 'Player Win')
    } else if (value > 21) {
        const foundAce = findAceWorthEleven(hand)
        if (foundAce) {
            reduceAceValue(foundAce)
            newValue = getPoints(hand)
            checkPoints(newValue, hand)
        } else return (gameStatus = 'Player Busted')
    }
}

const findAceWorthEleven = hand =>
    hand.find(card => card.name[0] === 'A' && card.value === 11)

const reduceAceValue = ace => ace.setValue(1)

// testing changing ace value
// const testHand = [new Card('10H'), new Card('AD'), new Card('AS')]

// const testValue = getPoints(testHand)
// checkPoints(testValue, testHand)

const setPlayerPoints = points => (playerPoints.innerHTML = points)
const setDealerPoints = points => (playerPoints.innerHTML = points)

deck = makeDeck()
shuffle(deck)
