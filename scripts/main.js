const dealerHand = document.getElementById('dealer-hand')
const playerHand = document.getElementById('player-hand')
const dealerPoints = document.getElementById('dealer-points')
const playerPoints = document.getElementById('player-points')
const dealBtn = document.getElementById('deal-button')
const hitBtn = document.getElementById('hit-button')
const standBtn = document.getElementById('stand-button')
const resetBtn = document.getElementById('reset-button')
const message = document.getElementById('messages')
const resultMessage = document.getElementsByClassName('message-text')[0]
const xBtn = document.getElementsByClassName('close')[0]
const printPlayerPoints = document.createElement('div')
const printDealerPoints = document.createElement('div')

let gameStatus = 'init'
let playerCards = []
let dealerCards = []
let hiddenCard = null
let playerHandValue = 0
let dealerHandValue = 0
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
    if (hand === dealerCards) {
        if (dealerCards.length === 2) {
            //make the hidden card//
            makeCard.src = './images/back_of_card.png'
            hiddenCard = currentCard
        } else makeCard.src = currentCard.getImage()
    } else makeCard.src = currentCard.getImage()
    windowHand.appendChild(makeCard)
}

const revealHiddenCard = () => {
    const hiddenCardImage = document.querySelector('#dealer-hand :nth-child(2)')
    if ((hiddenCardImage.scr = './image/back_of_card.png')) {
        hiddenCardImage.src = hiddenCard.getImage()
    }
}

const getPoints = hand => {
    let points = 0
    for (let card = 0; card < hand.length; card++) {
        points = points + hand[card].value
    }
    return points
}

const findAceWorthEleven = hand =>
    hand.find(card => card.name[0] === 'A' && card.value === 11)

const reduceAceValue = ace => ace.setValue(1)

const checkPoints = (value, hand) => {
    let newValue = 0
    if (value < 21) {
        return (gameStatus = 'cont')
    } else if (value === 21) {
        if (hand === playerCards) {
            return (gameStatus = 'Player Win')
        } else return (gameStatus = 'Dealer Win')
    } else if (value > 21) {
        const foundAce = findAceWorthEleven(hand)
        if (foundAce) {
            reduceAceValue(foundAce)
            newValue = getPoints(hand)
            checkPoints(newValue, hand)
        } else {
            if (hand === playerCards) {
                return (gameStatus = 'Player Busted')
            } else return (gameStatus = 'Dealer Busted')
        }
    }
}

const checkDealerUnder16 = () => {
    while (dealerHandValue <= 16) {
        dealCard(dealerCards, dealerHand)
        dealerHandValue = getPoints(dealerCards)
    }
    checkPoints(dealerHandValue, dealerCards)
    if ((dealerHandValue = getPoints(dealerCards)) <= 16) {
        checkDealerUnder16()
    }
    return dealerHandValue
}

const renderPoints = (handvalue, whichplayer, whosepoints) => {
    whosepoints.innerHTML = handvalue.toString()
    whichplayer.appendChild(whosepoints)
}

const checkResult = gameStatus => {
    switch (gameStatus) {
        case 'init':
            break
        case 'cont':
            break
        case 'Player Win':
            revealHiddenCard()
            resultMessage.innerHTML = 'Ya Won!'
            showModal()
            break
        case 'Dealer Win':
            resultMessage.innerHTML = 'Dealer Won (-_-)'
            showModal()
            break
        case 'Player Busted':
            revealHiddenCard()
            resultMessage.innerHTML = 'Ya Busted!'
            showModal()
            break
        case 'Dealer Busted':
            resultMessage.innerHTML = 'Dealer Busted!'
            showModal()
            break
        case 'Tie':
            resultMessage.innerHTML = 'Issa tie!'
            showModal()
            break
    }
}

const compareHands = (playerHandValue, dealerHandValue) => {
    if (playerHandValue > dealerHandValue) {
        return (gameStatus = 'Player Win')
    } else if (playerHandValue < dealerHandValue) {
        return (gameStatus = 'Dealer Win')
    } else return (gameStatus = 'Tie')
}

const renderResetBtn = () => {
    hitBtn.style.display = 'none'
    standBtn.style.display = 'none'
    resetBtn.style.display = 'block'
}

const renderHitStandBtn = () => {
    dealBtn.style.display = 'none'
    hitBtn.style.display = 'block'
    standBtn.style.display = 'block'
}

const showModal = () => {
    message.style = 'display: block;'
    renderResetBtn()
}

const startGame = () => {
    shuffle((deck = makeDeck()))
}

const resetGame = () => {
    deck = makeDeck()
    shuffle(deck)
    gameStatus = 'init'
    playerCards = []
    dealerCards = []
    hiddenCard = null
    playerHandValue = 0
    dealerHandValue = 0

    playerPoints.innerHTML = null
    dealerPoints.innerHTML = null
    playerHand.innerHTML = null
    dealerHand.innerHTML = null

    dealBtn.style.display = 'initial'
    hitBtn.style.display = 'none'
    standBtn.style.display = 'none'
    resetBtn.style.display = 'none'
}

dealBtn.addEventListener('click', () => {
    dealCard(playerCards, playerHand)
    dealCard(dealerCards, dealerHand)
    dealCard(playerCards, playerHand)
    dealCard(dealerCards, dealerHand)
    renderHitStandBtn()
    playerHandValue = getPoints(playerCards)
    dealerHandValue = getPoints(dealerCards)
    checkPoints(playerHandValue, playerCards)
    playerHandValue = getPoints(playerCards)
    renderPoints(playerHandValue, playerPoints, printPlayerPoints)
    checkResult(gameStatus)
})

hitBtn.addEventListener('click', () => {
    dealCard(playerCards, playerHand)
    playerHandValue = getPoints(playerCards)
    checkPoints(playerHandValue, playerCards)
    playerHandValue = getPoints(playerCards)
    renderPoints(playerHandValue, playerPoints, printPlayerPoints)
    checkResult(gameStatus)
})

standBtn.addEventListener('click', () => {
    revealHiddenCard()
    renderPoints(dealerHandValue, dealerPoints, printDealerPoints)
    checkDealerUnder16()
    renderPoints(dealerHandValue, dealerPoints, printDealerPoints)
    checkResult(gameStatus)
    if (gameStatus === 'cont') {
        compareHands(playerHandValue, dealerHandValue)
        checkResult(gameStatus)
    }
})

resetBtn.addEventListener('click', () => resetGame())

xBtn.addEventListener('click', () => {
    message.style.display = 'none'
})

window.addEventListener('DOMContentLoaded', startGame())
