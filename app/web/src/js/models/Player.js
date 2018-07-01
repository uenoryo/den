import Constants from '../constants'
import HandData from '../data/HandData'
import Rule from './Rule'

export default class Player {
  constructor(data) {
    if (data.constructor.name !== 'PlayerData') {
      throw new Error('Invalid PlayerData')
    }
    this.data = data
    this.hand = new HandData([])
  }

  receive(card) {
    if (card === null) {
      return
    }

    if (card.constructor.name !== 'CardData') {
      throw new Error(`Invalid Card will add to hand [${card.constructor.name}]`)
    }

    this.hand.Cards.push(card)
    this.sort()
  }

  show(idx) {
    if (idx < 0 || idx >= this.hand.Cards.length) {
      return null
    }
    return this.hand.Cards[idx]
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

  wantPut(field, isForceDraw) {
    for (let idx in this.hand.Cards) {
      if (Rule.canPut(field, this.hand.Cards[idx], isForceDraw)) {
        return true
      }
    }
    return false
  }

  wantForcePut() {
    for (let idx in this.hand.Cards) {
      if (this.hand.Cards[idx].Num === Constants.CardAbilityDrawTwo) {
        return idx
      }
    }
    return false
  }

  noPutAction() {
    return Constants.ActionTypeDraw
  }

  think(field, isForceDraw) {
    for (let idx in this.hand.Cards) {
      if (Rule.canPut(field, this.hand.Cards[idx], isForceDraw)) {
        return idx
      }
    }
    return null
  }

  thinkChangeMark() {
    switch(this.hand.Cards[0].Mark) {
      case Constants.CardMarkClub:
        return Constants.PlayerReplyChangeMarkClub
      case Constants.CardMarkDiamond:
        return Constants.PlayerReplyChangeMarkDiamond
      case Constants.CardMarkHeart:
        return Constants.PlayerReplyChangeMarkHeart
      case Constants.CardMarkSpade:
        return Constants.PlayerReplyChangeMarkSpade
      default:
        return Constants.PlayerReplyChangeMarkJoker
    }
  }

  hasNoCard() {
    return this.hand.Cards.length === 0
  }

  handCardNumTotal() {
    let sum = 0
    for (let idx in this.hand.Cards) {
      sum += this.hand.Cards[idx].Num
    }
    return sum
  }

  isHuman() {
    return this.data.Type === Constants.PlayerTypeHuman
  }

  isComputer() {
    return this.data.Type === Constants.PlayerTypeComputer
  }

  openHand () {
    this.hand.isReversed(true)
  }

  closeHand () {
    this.hand.isReversed(false)
  }

  handIsReversed () {
    return this.hand.isReversed
  }
}
