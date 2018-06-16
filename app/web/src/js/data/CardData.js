import Constants from '../constants'

export default class CardData {
  constructor(mark, num) {
    this.mark(mark)
    this.num(num)
  }

  mark(mark) {
    mark = parseInt(mark)
    if (
      mark !== Constants.CardMarkClub &&
      mark !== Constants.CardMarkDiamond &&
      mark !== Constants.CardMarkHeart &&
      mark !== Constants.CardMarkSpade &&
      mark !== Constants.CardMarkJoker
    ) {
      throw new Error(`Invalid Card Mark[${mark}].`)
    }
    this.Mark = mark
    return this
  }

  num(num) {
    num = parseInt(num)
    if (num < Constants.CardMinNum || num > Constants.CardMaxNum) {
      throw new Error(`Invalid Card Num[${num}]`)
    }

    if (this.Mark === Constants.CardMarkJoker && num !== Constants.CardJokerNum) {
      throw new Error(`Invalid Card Joker Num[${num}]`)
    }

    this.Num = num
    return this
  }
}
