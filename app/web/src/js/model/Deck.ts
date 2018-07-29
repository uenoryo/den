import DeckData from '../data/DeckData'
import CardData from '../data/CardData'

export default class Deck {
  constructor(private data: DeckData) {}

  get CardAmount(): number {
    return this.data.Cards.length
  }

  turn(): CardData {
    let card = this.data.Cards.shift()
    if (card === undefined) {
      throw new Error('Cant trun Empty deck')
    }
    return card
  }
}
