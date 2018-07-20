import Constants from '../constants'

export default class BrainData {
  constructor () {
    this.FieldCard = null
    this.SelfHand = null
    this.OtherPlayerHands = []
    this.NextPlayersHand = null
    this.PutCards = []
  }

  fieldCard (card) {
    if (card.constructor.name !== 'CardData') {
      throw new Error(`Invalid CardData [${card}]`)
    }
    this.FieldCard = card
  }

  selfHand (hand) {
    if (hand.constructor.name !== 'HandData') {
      throw new Error(`Invalid HandData [${hand}]`)
    }
    this.SelfHand = hand
  }

  otherPlayerHands (hands...) {
    for (let idx in hands) {
      if (hands[idx].constructor.name !== 'HandData') {
        throw new Error(`Invalid HandData [${hands[idx]}]`)
      }
    }
    this.OtherPlayerHands = hands
  }

  nextPlayerHand (hand) {
    if (hand !== null && hand.constructor.name !== 'HandData') {
      throw new Error(`Invalid HandData [${hand}]`)
    }
    this.NextPlayerHand = hand
  }

  putCards (cards) {
    for (let idx in cards) {
      if (cards[idx].constructor.name !== 'CardData') {
        throw new Error(`Invalid CardData [${cards[idx]}]`)
      }
    }
    this.PutCards = cards
  }
}
