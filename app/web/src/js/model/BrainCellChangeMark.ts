import BrainData from '../data/BrainData'
import { CardMark } from '../type/Type'
import { CardMarksWithoutJokerB } from '../constant/Card'

export default class BrainCell {
  // 現時点で priority が一番高いカードのMarkを返します
  // hit しなければランダムで返します
  static mostHighPriorityCardMark(data: BrainData, rate: number): CardMark {
    let mark = this.randMark()
    let card = data.topPriorityCard()
    if (card !== null && this.hit(rate)) {
      mark = card.Mark
    }
    return mark
  }

  static randMark(): CardMark {
    return CardMarksWithoutJokerB[Math.floor(Math.random() * CardMarksWithoutJokerB.length)]
  }

  static hit(rate: number) {
    return Math.floor(Math.random() * 100) < rate
  }
}
