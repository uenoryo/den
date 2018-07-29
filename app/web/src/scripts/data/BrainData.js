import Constants from '../constants'

export default class BrainData {
  constructor () {
    this.FieldCard = null
    this.SelfHand = null
    this.PuttableIdx = []
    this.PutCards = []
  }

  fieldCard (card) {
    if (card.constructor.name !== 'CardData') {
      throw new Error(`Invalid CardData [${card}]`)
    }
    this.FieldCard = card
  }

  selfHand (hand) {
    if (hand.constructor.name !== 'HandData') {
      throw new Error(`Invalid HandData [${hand}]`)
    }
    this.SelfHand = hand
  }

  putCards (cards) {
    if (! Array.isArray(cards)) {
      throw new Error(`Invalid CardData [${cards}]`)
    }
    for (let idx in cards) {
      if (cards[idx].constructor.name !== 'CardData') {
        throw new Error(`Invalid CardData [${cards[idx]}]`)
      }
    }
    this.PutCards = cards
  }

  pushPutCard (card) {
    if (card.constructor.name !== 'CardData') {
      throw new Error(`Invalid CardData [${card}]`)
    }
    this.PutCards.push(card)
  }

  puttableIdx (puttables) {
    if (Object.keys(puttables).length > this.SelfHand.Cards.length + 1) {
      throw new Error(`puttables is too long, max [${this.SelfHand.Cards.length + 1}]`)
    }
    for (let idx in puttables) {
      if (parseInt(idx) !== -1 && this.SelfHand.Cards[idx] == null) {
        throw new Error(`Invalid hand index [${idx}]. hand: ${this.SelfHand.Cards}`)
      }
      if (puttables[idx] < -99 || puttables[idx] > 99) {
        throw new Error(`puttable card priorities must be from -99 to +99`)
      }
    }
    this.PuttableIdx = puttables
  }

  getPuttableIdxByNum (num) {
    let res = []
    for (let idx in this.PuttableIdx) {
      if (idx === '-1') {
        continue
      }
      if (parseInt(this.SelfHand.Cards[idx].Num) === num) {
        res.push(parseInt(idx))
      }
    }
    return res
  }
}
