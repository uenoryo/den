import Constants from '../constants'
import EmptyCardData from './EmptyCardData'

export default class HandFantomData {
  constructor (cards) {
    this.cards(cards)
    this.CSS = {}
  }

  cards (cards) {
    if (Array.isArray(cards) === false) {
      throw new Error(`Invalid Cards [${cards}].`)
    }
    if (cards.length > Constants.PlayerHandMaxAmount) {
      console.warn(`HandFantom got too many cards, got ${cards.length} cards.`)
    }

    this.Cards = []
    for (let i = 0; i < Constants.PlayerHandMaxAmount; i++) {
      if (cards[i] === undefined) {
        this.Cards[i] = new EmptyCardData
        continue
      }
      if (cards[i].constructor.name !== 'CardFantomData') {
        throw new Error(`Invalid CardFantomData [${cards[i]}].`)
      }
      this.Cards[i] = cards[i]
    }
  }
}
