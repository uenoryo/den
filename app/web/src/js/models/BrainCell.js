import Constants from '../constants'
import Rule from './Rule'

export default class BrainCell {
  // 素上がりできる場合におけるDrawの優先度を操作します
  static canDoneButDraw (data, value, rate) {
    if (data.SelfHand.Cards.length !== 1) {
      return
    }
    if (Object.keys(data.PuttableIdx).length === 2 && BrainCell.hit(rate)) {
      data.PuttableIdx['-1'] += value
    }
  }

  // 同じ数字のカードが3枚揃っている場合、そのカードの優先度を操作します
  static waitAnko (data, value, rate) {
    for (let idx in data.PuttableIdx) {
      if (idx === '-1') {
        continue
      }
      let card = data.SelfHand.Cards[idx]
      if (data.SelfHand.numAmount(card.Num) === 3) {
        data.PuttableIdx[idx] -= value
      }
    }
  }

  static hit(rate) {
    if (rate == null) {
      rate = 100
    }
    return Math.floor(Math.random() * 100) < rate
  }
}
