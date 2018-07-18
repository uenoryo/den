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

  // TODO: HandDataにセッターはいらないかもしれない #21
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

  aggregate () {
    let agr = {}
    for (let idx in this.Cards) {
      agr[this.Cards[idx].Num] = agr[this.Cards[idx].Num] === undefined ? 1 : agr[this.Cards[idx].Num]+1
    }
    return agr
  }

  cost () {
    let cost = 0
    for (let idx in this.Cards) {
      cost += this.Cards[idx].cost()
    }
    return cost
  }
}
