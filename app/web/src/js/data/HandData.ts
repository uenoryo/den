import { CardNum } from '../type/Type'
import CardData from './CardData'

export default class DeckData {
  private isReversed: boolean = false

  constructor(
    private cards: CardData[]
  ) {}

  get Cards(): CardData[] {
    return this.cards
  }

  get IsReversed(): boolean {
    return this.isReversed
  }

  set IsReversed(isReversed: boolean) {
    this.isReversed = isReversed
  }

  get Cost(): number {
    let cost = 0
    for (let idx in this.Cards) {
      cost += this.Cards[idx].Cost
    }
    return cost
  }

  numAmount(num: CardNum): number {
    let amount = 0
    for (let card of this.Cards) {
      if (num === card.Num) {
        amount++
      }
    }
    return amount
  }
}
