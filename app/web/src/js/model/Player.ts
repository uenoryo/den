import { ActionType, CardNum, PlayerType } from '../type/Type'
import { Constants } from '../constant/Basic'
import PlayerData from '../data/PlayerData'
import HandData from '../data/HandData'
import CardData from '../data/CardData'
import Dealer from './Dealer'
import Rule from './Rule'

export default class Player {
  public Hand: HandData

  constructor(public Data: PlayerData) {
    // TODO: Brain導入
    // if (brain === undefined) {
    //   brain = new Brain
    // }
    // this.brain = brain
    this.Hand = new HandData([])
  }

  // lookField(card) {
  //   this.brain.input('FieldCard', card)
  // }

  // lookSelfHand() {
  //   this.brain.input('SelfHand', this.Hand)
  // }

  receive(card: CardData): void {
    this.Hand.Cards.push(card)
    this.sort()
  }

  // Todo: いらなさそう
  show(idx: number): CardData  {
    if (idx < 0 || idx >= this.Hand.Cards.length) {
      throw new Error(`Invalid idx[${idx}] to show card from hand`)
    }
    return this.Hand.Cards[idx]
  }

  pick(idx: number): CardData {
    if (idx < 0 || idx >= this.Hand.Cards.length) {
      throw new Error(`Invalid idx[${idx}] to pick card from hand`)
    }
    return this.Hand.Cards.splice(idx, 1)[0]
  }

  put(idx: number, dealer: Dealer): void {
    dealer.receive(this.pick(idx), this.Data.ID)
  }

  sort(): void {
    // カードをスコア降順に並び替える
    for (let i = 0; i < this.Hand.Cards.length; i++) {
      for (let j = this.Hand.Cards.length-1; j > i; j--) {
        if (this.Hand.Cards[j].Score > this.Hand.Cards[j-1].Score) {
          let tmp = this.Hand.Cards[j]
          this.Hand.Cards[j] = this.Hand.Cards[j-1]
          this.Hand.Cards[j-1] = tmp
        }
      }
    }
  }

  wantPut(field: CardData, isForceDraw: boolean): boolean {
    if (! this.canPut(field, isForceDraw)) {
      return false
    }
    if (this.think(isForceDraw) === -1) {
      return false
    }
    return true
  }

  canPut(field: CardData, isForceDraw: boolean): boolean {
    for (let card of this.Hand.Cards) {
      if (Rule.canPut(field, card, isForceDraw)) {
        return true
      }
    }
    return false
  }

  wantDen(): boolean {
    return this.thinkDen()
  }

  noPutAction(): ActionType {
    return ActionType.Draw
  }

  think(isForceDraw: boolean): number {
    return 0
    // return this.brain.output(isForceDraw ? 'PutOrForceDraw' : 'PutOrDraw')
  }

  // thinkChangeMark(): number {
  //   return this.brain.output('ChangeMark')
  // }

  thinkDen(): boolean {
    return true
    // return this.brain.output('Den')
  }

  hasNoCard(): boolean {
    return this.Hand.Cards.length === 0
  }

  isHuman(): boolean {
    return this.Data.Type === PlayerType.Human
  }

  isComputer(): boolean {
    return this.Data.Type === PlayerType.Computer
  }

  openHand(): void {
    this.Hand.IsReversed = true
  }

  closeHand(): void {
    this.Hand.IsReversed = false
  }

  handIsReversed(): boolean {
    return this.Hand.IsReversed
  }
}
