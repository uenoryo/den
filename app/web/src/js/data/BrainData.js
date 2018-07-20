import Constants from '../constants'

export default class BrainData {
  constructor () {
    this.FieldCard = null
    this.SelfHand = null
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

  putCards (cards) {
    if (! Array.isArray(cards)) {
      throw new Error(`Invalid CardData [${cards}]`)
    }
    for (let idx in cards) {
      if (cards[idx].constructor.name !== 'CardData') {
        throw new Error(`Invalid CardData [${cards[idx]}]`)
      }
    }
    this.PutCards = cards
  }

  pushPutCard (card) {
    if (card.constructor.name !== 'CardData') {
      throw new Error(`Invalid CardData [${card}]`)
    }
    this.PutCards.push(card)
  }
}
