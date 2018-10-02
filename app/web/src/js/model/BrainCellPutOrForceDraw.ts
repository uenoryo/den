import BrainData from '../data/BrainData'
import { CardMark } from '../type/Type'
import { CardMarksWithoutJokerB } from '../constant/Card'
import { DrawActionID } from '../constant/Card'

export default class BrainCell {
  // 現時点で priority が一番高いものを返します
  // hit しなければ Draw します
  static putNormally(data: BrainData, rate: number): number {
    if (this.hit(rate)) {
      return data.topPriorityActionID()
    }
    return DrawActionID
  }

  static hit(rate: number) {
    return Math.floor(Math.random() * 100) < rate
  }
}
