import BrainData from '../data/BrainData'

export default class BrainCell {
  // 素上がりできる場合におけるDrawの優先度を操作します
  canDoneButDraw(data: BrainData, value: number, rate: number): void {
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
  waitAnko(data: BrainData, value: number, rate: number) {
    if (data.SelfHand === null) {
      return
    }
    for (let idx in data.SelfHand.Cards) {
      if (data.SelfHand.numAmount(data.SelfHand.Cards[idx].Num) === 3) {
        data.addPriority(parseInt(idx), value)
      }
    }
  }

  hit(rate: number) {
    return Math.floor(Math.random() * 100) < rate
  }
}
