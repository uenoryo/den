import Constants from '../constants'
import Rule from './Rule'

export default class BrainCell {
  static canDoneButDraw (data, value, rate) {
    if (value == null) {
      value = 10
    }
    if (data.SelfHand.Cards.length !== 1) {
      return
    }
    if (Object.keys(data.PuttableIdx).length === 2 && BrainCell.hit(rate)) {
      data.PuttableIdx['-1'] += value
    }
  }

  static hit(rate) {
    if (rate == null) {
      rate = 100
    }
    return Math.floor(Math.random() * 100) < rate
  }
}
