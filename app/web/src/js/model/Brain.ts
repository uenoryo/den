import { CardMark, BrainInputType, BrainOutputType, HandActionPriority } from '../type/Type'
import BrainData from '../data/BrainData'
import CardData from '../data/CardData'
import HandData from '../data/HandData'
import Rule from './Rule'

export default class Brain {
  public Data: BrainData

  constructor() {
    this.Data = new BrainData
  }

  inputFieldCard(card: CardData): void {
    this.Data.FieldCard = card
    this.interpret()
  }

  inputSelfHand(hand: HandData): void {
    this.Data.SelfHand = hand
    this.interpret()
  }

  inputPutCard(card: CardData): void {
    this.Data.PutCards.push(card)
    this.interpret()
  }

  outputPutOrDraw(): number {
    this.confirm()
    this.narrow(false)
    return this.putOrDraw()
  }

  outputPutOrForceDraw(): number {
    this.confirm()
    this.narrow(true)
    return this.putOrForceDraw()
  }

  outputChangeMark(): CardMark {
    this.confirm()
    return this.changeMark()
  }

  outputDen(): boolean {
    this.confirm()
    return this.den()
  }

  confirm(): void {
    if (this.Data.FieldCard === null || this.Data.SelfHand === null) {
      throw new Error('Not enough to narrow behavior, it need field card and self hand at least.')
    }
  }

  narrow(isForceDraw: boolean): void {
    if (this.Data.FieldCard === null || this.Data.SelfHand === null) {
      throw new Error('Not enough to narrow behavior, it need field card and self hand at least.')
    }
    for (let idx in this.Data.SelfHand.Cards) {
      if (Rule.canPut(this.Data.FieldCard, this.Data.SelfHand.Cards[idx], isForceDraw)) {
        this.Data.inputPriority(parseInt(idx), 0)
      }
    }
  }

  decide(): number {
    let draw = -1
    if (this.Data.PuttableIdx.length === null) {
      return draw
    }
    if (this.Data.HandActionPriorities.length === 0) {
      return draw
    }
    return this.Data.topPriorityActionID()
  }

  interpret(): void {
    //
  }

  putOrDraw(): number {
    return -1
  }

  putOrForceDraw(): number {
    return -1
  }

  changeMark(): CardMark {
    return CardMark.JokerA
  }

  den(): boolean {
    return true
  }
}
