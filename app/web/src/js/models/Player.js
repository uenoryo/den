import Constants from '../constants'
import HandData from '../data/HandData'
import Rule from './Rule'

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
    this.sort()
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

  sort() {
    for (let i = 0; i < this.hand.Cards.length; i++) {
      for (let j = this.hand.Cards.length-1; j > i; j--) {
        if (this.hand.Cards[j].score() > this.hand.Cards[j-1].score()) {
          let tmp = this.hand.Cards[j]
          this.hand.Cards[j] = this.hand.Cards[j-1]
          this.hand.Cards[j-1] = tmp
        }
      }
    }
  }

  wantPut(field) {
    for (let idx in this.hand.Cards) {
      if (Rule.canPut(field, this.hand.Cards[idx])) {
        return true
      }
    }
    return false
  }

  noPutAction() {
    return Constants.ActionTypeDraw
  }

  think(field) {
    for (let idx in this.hand.Cards) {
      if (Rule.canPut(field, this.hand.Cards[idx])) {
        return idx
      }
    }
    return null
  }

  hasNoCard() {
    return this.hand.Cards.length === 0
  }

  isHuman() {
    return this.data.Type === Constants.PlayerTypeHuman
  }

  isComputer() {
    return this.data.Type === Constants.PlayerTypeComputer
  }
}
