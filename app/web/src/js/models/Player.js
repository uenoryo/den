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

  pick(idx) {
    if (idx < 0 || idx >= this.hand.Cards.length) {
      throw new Error(`Invalid idx[${idx}] to pick card from hand`)
    }
    return this.hand.Cards.splice(idx, 1)[0]
  }

  put(idx, dealer) {
    if (this.hand.Cards[idx].constructor.name !== 'CardData') {
      throw new Error(`Invalid Card will put to field [${card.constructor.name}]`)
    }

    if (dealer.constructor.name !== 'Dealer') {
      throw new Error(`Card will be put to invalid Dealer [${card.constructor.name}]`)
    }

    dealer.receive(this.pick(idx))
  }
}
