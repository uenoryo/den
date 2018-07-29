import { ActionType, CardNum, PlayerType } from '../type/Type'
import { Constants } from '../constant/Basic'
import PlayerData from '../data/PlayerData'
import HandData from '../data/HandData'
import CardData from '../data/CardData'
import Rule from './Rule'

export default class Player {
  public Hand: HandData

  constructor(data: PlayerData) {
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
    dealer.receive(this.pick(idx))
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
    return Constants.ActionTypeDraw
  }

  // think(isForceDraw: boolean): number {
  //   return this.brain.output(isForceDraw ? 'PutOrForceDraw' : 'PutOrDraw')
  // }

  // thinkChangeMark(): number {
  //   return this.brain.output('ChangeMark')
  // }

  // thinkDen(): boolean {
  //   return this.brain.output('Den')
  // }

  hasNoCard(): boolean {
    return this.Hand.Cards.length === 0
  }

  // TODO: Handに持たせる
  handCardNumTotal(): number {
    let sum = 0
    for (let idx in this.Hand.Cards) {
      sum += this.Hand.Cards[idx].Num
    }
    return sum
  }

  // TODO: いらなさそう
  handNumAmount(num: CardNum): number {
    return this.Hand.numAmount(num)
  }

  lonelyHandNumForChitoi(): CardNum | null {
    let agr = this.Hand.aggregate()
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

  handPairCount(): number {
    let agr = this.Hand.aggregate()
    let count = 0
    for (let amount of agr) {
      if (amount >= 2) {
        count += parseInt(amount / 2)
      }
    }
    return count
  }

  isHuman(): boolean {
    return this.Data.Type === PlayerType.Human
  }

  isComputer(): boolean {
    return this.Data.Type === PlayerType.Computer
  }

  openHand(): void {
    this.Hand.isReversed(true)
  }

  closeHand(): void {
    this.Hand.isReversed(false)
  }

  handIsReversed(): boolean {
    return this.Hand.IsReversed
  }
}
