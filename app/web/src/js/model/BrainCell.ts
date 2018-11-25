import BrainData from '../data/BrainData'

export default class BrainCell {
  // 素上がりできる場合におけるDrawの優先度を操作します
  static canDoneButDraw(data: BrainData, value: number, rate: number): void {
    if (data.SelfHand === null) {
      return
    }
    if (!data.SelfHand.isReach()) {
      return
    }

    if (data.HandPriorities.length === 2 && this.hit(rate)) {
      data.addPriority(-1, value)
    }
  }

  // 同じ数字のカードが3枚揃っている場合、そのカードの優先度を操作します
  static waitAnko(data: BrainData, value: number, rate: number) {
    if (data.SelfHand === null) {
      return
    }
    for (let idx in data.SelfHand.Cards) {
      if (data.SelfHand.numAmount(data.SelfHand.Cards[idx].Num) === 3) {
        data.addPriority(parseInt(idx), value)
      }
    }
  }

  // カードの優先順位をマニュアル的に操作します
  static controllManually(data: BrainData) {
    if (data.SelfHand === null) {
      return
    }
    for (let idx in data.SelfHand.Cards) {
      let prt = 0
      switch(data.SelfHand.Cards[idx].Num) {
        case 1:
        case 2:
        case 3:
        case 8:
          return
        case 4:
          prt++
        case 5:
          prt++
        case 6:
          prt++
        case 7:
          prt++
        case 9:
          prt++
        case 10:
          prt++
        case 11:
          prt++
        case 13:
          prt++
        case 12:
          prt++
      }
      data.addPriority(parseInt(idx), prt)
    }
  }

  // JOKERの優先順位を操作します
  static jokerPriority(data: BrainData, value: number, rate: number) {
    if (data.SelfHand === null) {
      return
    }

    for (let idx in data.SelfHand.Cards) {
      if (data.SelfHand.Cards[idx].isJoker()) {
        if (!this.hit(rate)) {
          continue
        }
        data.addPriority(parseInt(idx), value)
      }
    }
  }

  static hit(rate: number) {
    return Math.floor(Math.random() * 100) < rate
  }
}
