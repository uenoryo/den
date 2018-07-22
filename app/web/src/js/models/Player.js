import Constants from '../constants'
import HandData from '../data/HandData'
import Brain from './Brain'
import Rule from './Rule'

export default class Player {
  constructor(data, brain) {
    if (data.constructor.name !== 'PlayerData') {
      throw new Error('Invalid PlayerData')
    }
    if (brain === undefined) {
      brain = new Brain
    }
    this.data = data
    this.brain = brain
    this.hand = new HandData([])
  }

  lookField(card) {
    this.brain.input('FieldCard', card)
  }

  lookSelfHand() {
    this.brain.input('SelfHand', this.hand)
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
    if (! this.canPut(field, isForceDraw)) {
      return false
    }
    if (this.think() === -1) {
      return false
    }
    return true
  }

  canPut(field, isForceDraw) {
    for (let idx in this.hand.Cards) {
      if (Rule.canPut(field, this.hand.Cards[idx], isForceDraw)) {
        return true
      }
    }
    return false
  }

  wantDen() {
    return this.thinkDen()
  }

  noPutAction() {
    return Constants.ActionTypeDraw
  }

  think (isForceDraw) {
    return this.brain.output(isForceDraw ? 'PutOrForceDraw' : 'PutOrDraw')
  }

  thinkChangeMark() {
    return this.brain.output('ChangeMark')
  }

  thinkDen() {
    return this.brain.output('Den')
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

  handNumAmount (num) {
    let amount = 0
    for (let idx in this.hand.Cards) {
      if (parseInt(num) === parseInt(this.hand.Cards[idx].Num))
      amount++
    }
    return amount
  }

  lonelyHandNumForChitoi () {
    let agr = this.hand.aggregate()
    let num = null
    for (let cardNum in agr) {
      if (agr[cardNum] % 2 === 1) {
        // 枚数が奇数の数字が2種類以上ある場合は該当しない
        if (num !== null) {
          return null
        }
        num = cardNum
      }
    }
    return num
  }

  handPairCount () {
    let agr = this.hand.aggregate()
    let count = 0
    for (let cardNum in agr) {
      if (agr[cardNum] >= 2) {
        count += parseInt(agr[cardNum] / 2)
      }
    }
    return count
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
    return this.hand.IsReversed
  }
}
