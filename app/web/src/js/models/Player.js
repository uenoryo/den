import HandData from '../data/HandData'

export default class Player {
  constructor(data) {
    if (data.constructor.name !==  'PlayerData') {
      throw new Error('Invalid PlayerData')
    }
    this.data = data
    this.hand = new HandData([])
  }

  receive(card) {
    if (card.constructor.name !== 'CardData') {
      throw new Error(`Invalid Card will add to hand [${card.constructor.name}]`)
    }

    this.hand.Cards.push(card)
  }
}
