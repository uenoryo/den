import Constants from '../constants'

export default class HandData {
  constructor (cards) {
    this.cards(cards)
    this.isReversed(false)
    this.Hand = []
    for (let i = 0; i < Constants.PlayerHandMaxAmount; i++) {
      this.Hand[i] = cards[i] === undefined ? null : cards[i]
    }
  }

  cards (cards) {
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

  isReversed (isReversed) {
    if (typeof isReversed !== 'boolean') {
      throw new Error(`Invalid isReversed [${isReversed}].`)
    }
    this.IsReversed = isReversed
  }

  set(idx, card) {
    if (card.constructor.name !== 'CardData') {
      throw new Error(`Invalid Card [${card.constructor.name}]`)
    }

    if (idx < 0 || idx > Constants.PlayerHandMaxAmount) {
      throw new Error(`Invalid Hand index ${idx}`)
    }

    this.Cards[idx] = card
  }

  get(idx) {
    if (idx < 0 || idx > Constants.PlayerHandMaxAmount) {
      throw new Error(`Invalid Hand index ${idx}`)
    }
    return this.Cards[idx]
  }
}
