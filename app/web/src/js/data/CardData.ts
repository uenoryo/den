import { CardMarkIntegers, CardMarkStrings, CardCosts } from '../constant/Card'
import { CardMark, CardNum, Style } from '../type/Type'

export default class CardData {
  private id: number
  public CSS: Style

  constructor(
    private mark: CardMark,
    private num: CardNum
  ) {
    this.id = this.DisplayID
    this.CSS = {
      display: 'initial'
    }
  }

  get Mark(): CardMark {
    return this.mark
  }

  get Num(): CardNum {
    return this.num
  }

  toString(): string {
    return this.toStringMark() + ' ' + this.toStringNum()
  }

  toStringNum(): string {
    switch(this.Num) {
      case 1:
        return 'A'
      case 11:
        return 'J'
      case 12:
        return 'Q'
      case 13:
        return 'K'
    }
    return String(this.Num)
  }

  toStringMark(): string {
    switch(this.Mark) {
      case CardMarkIntegers.Club:
        return CardMarkStrings.Club
      case CardMarkIntegers.Diamond:
        return CardMarkStrings.Diamond
      case CardMarkIntegers.Heart:
        return CardMarkStrings.Heart
      case CardMarkIntegers.Spade:
        return CardMarkStrings.Spade
      case CardMarkIntegers.JokerA:
        return CardMarkStrings.Joker
      case CardMarkIntegers.JokerB:
        return CardMarkStrings.Joker
      default:
        return ''
    }
  }

  changeMark(mark: CardMark): void {
    this.mark = mark
  }

  isJoker(): boolean {
    return this.Mark === CardMarkIntegers.JokerA || this.Mark === CardMarkIntegers.JokerB
  }

  get ID(): number {
    return this.id
  }

  get DisplayID(): number {
    if (this.Mark === CardMarkIntegers.JokerA) {
      return 52
    } else if (this.Mark === CardMarkIntegers.JokerB) {
      return 53
    } else {
      return this.Score - 1
    }
  }

  // カードを並べる際の優先順位として使用
  get Score(): number {
    if (this.isJoker()) {
      return 0
    }
    return (this.Mark + (this.Num * 4) - 4) + 1
  }

  get Cost(): number {
    if (CardCosts[this.Num] === undefined) {
      return 0
    }
    return CardCosts[this.Num]
  }

  get InitailMark(): CardMark {
    switch(this.ID) {
      case 52:
        return CardMark.JokerA
      case 53:
        return CardMark.JokerB
    }

    switch(this.id % 4) {
      case 0:
        return CardMark.Club
      case 1:
        return CardMark.Diamond
      case 2:
        return CardMark.Heart
      case 3:
        return CardMark.Spade
    }
    return 0
  }
}
