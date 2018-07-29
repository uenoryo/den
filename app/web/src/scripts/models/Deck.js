export default class Deck {
  constructor(data) {
    if (data.constructor.name !==  'DeckData') {
      throw new Error('Invalid DeckData')
    }
    this.data = data
  }

  cardNum() {
    return this.data.Cards.length
  }

  turn() {
    if (this.cardNum() === 0) {
      throw new Error('Cant trun Empty deck')
    }
    return this.data.Cards.shift()
  }
}
