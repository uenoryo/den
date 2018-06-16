import Constants from '../constants'

export default class HandData {
  constructor(cards) {
    this.cards(cards)
  }

  cards(cards) {
    if (Array.isArray(cards) === false) {
      throw new Error(`Invalid Cards [${cards}].`)
    }

    for (let idx in cards) {
      if (cards[idx].constructor.name !== 'CardData') {
        throw new Error(`Invalid Card [${cards[idx].constructor.name}]`)
      }
    }

    this.Cards = cards
  }
}
