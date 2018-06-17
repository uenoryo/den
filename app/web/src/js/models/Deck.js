import cst from '../constants'

export default class Deck {
  constructor(data) {
    if (data.constructor.name !==  'DeckData') {
      throw new Error('Invalid DeckData')
    }
    this.data = data
  }
}
