const dealerHand = document.getElementById('dealer-hand')
const playerHand = document.getElementById('player-hand')
const dealerPoints = document.getElementById('dealer-points')
const playerPoints = document.getElementById('player-points')
const dealBtn = document.getElementById('deal-button')
const hitBtn = document.getElementById('hit-button')
const standBtn = document.getElementById('stand-button')

const playerCards = []
const dealerCards = []
let deck = []

class Card {
    constructor(name) {
        this.name = name
        this.value = this.getValue()
    }

    getValue = () => {
        let value
        const cardsWorthTen = ['K', 'Q', 'J']
        if (!isNaN(this.name[0])) {
            value = Number(this.name[0])
        } else if (cardsWorthTen.includes(this.name[0])) {
            value = 10
        } else {
            value = 11
        }
        return value
    }

    setValue = (newValue) => {
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

const shuffle = (deck) => {
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
    return deck
}

const getPoints = (hand) => {
    let points = 0
    for (let card = 0; card < hand.length; card++) {
        points = points + hand[card].value
    }
    return points
}

makeDeck()
shuffle(deck)
console.log(deck)

dealBtn.addEventListener('click', () => {
    // newCard = deck.pop()
    // newCard.getImage()
})

hitBtn.addEventListener('click', () => {
    dealCard(playerCards, playerHand)
})
// makeDeck()
// shuffle(deck)
// dealCard(playerCards)
// dealCard(playerCards)
// dealCard(playerCards)
// const playerHandValue = getPoints(playerCards)
// console.log(playerHandValue)
// console.log(playerCards)
// console.log(deck)

// window.addEventListener('DOMContentLoaded', function () {})
//     // Execute after page load
