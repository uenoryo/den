import CardData from './CardData'

export default class DeckData {
  constructor(
    private cards:CardData[]
  ) {}

  get Cards():CardData[] {
    return this.cards
  }

  get CardAmount(): number {
    return this.Cards.length
  }

  turn(): CardData {
    let card = this.Cards.shift()
    if (card === undefined) {
      throw new Error('Cant trun Empty deck')
    }
    return card
  }
}
