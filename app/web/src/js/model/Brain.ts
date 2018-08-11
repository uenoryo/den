import { CardMark, BrainInputType, BrainOutputType, HandPriority } from '../type/Type'
import BrainData from '../data/BrainData'
import CardData from '../data/CardData'
import HandData from '../data/HandData'
import BrainCell from './BrainCell'
import Rule from './Rule'

export default class Brain {
  public Data: BrainData

  private Cell: BrainCell

  constructor() {
    this.Data = new BrainData
    this.Cell = new BrainCell
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
    this.Data.resetPriority()
    for (let idx in this.Data.SelfHand.Cards) {
      if (Rule.canPut(this.Data.FieldCard, this.Data.SelfHand.Cards[idx], isForceDraw)) {
        this.Data.inputPriority(parseInt(idx), 0)
      }
    }
  }

  interpret(): void {
    //
  }

  putOrDraw(): number {
    return this.Data.topPriorityActionID()
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
