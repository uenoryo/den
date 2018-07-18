import Constants from '../constants'
import CardCost from '../constants/CardCost'

export default class CardData {
  constructor(mark, num) {
    this.mark(mark)
    this.num(num)
    this.id()
    this.CSS = {}
  }

  mark(mark) {
    mark = parseInt(mark)
    if (
      mark !== Constants.CardMarkClub &&
      mark !== Constants.CardMarkDiamond &&
      mark !== Constants.CardMarkHeart &&
      mark !== Constants.CardMarkSpade &&
      mark !== Constants.CardMarkJokerA &&
      mark !== Constants.CardMarkJokerB
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

    if (
      (this.Mark === Constants.CardMarkJokerA || this.Mark === Constants.CardMarkJokerB)
      && num !== Constants.CardJokerNum
    ) {
      throw new Error(`Invalid Card Joker Num[${num}]`)
    }

    this.Num = num
    return this
  }

  toString() {
    let strNum = this.Num
    switch(this.Num) {
      case 1:
        strNum = 'A'
        break
      case 11:
        strNum = 'J'
        break
      case 12:
        strNum = 'Q'
        break
      case 13:
        strNum = 'K'
      break
    }

    switch(this.Mark) {
      case Constants.CardMarkClub:
        return Constants.CardMarkClubString + ' ' + strNum
      case Constants.CardMarkDiamond:
        return Constants.CardMarkDiamondString + ' ' + strNum
      case Constants.CardMarkHeart:
        return Constants.CardMarkHeartString + ' ' + strNum
      case Constants.CardMarkSpade:
        return Constants.CardMarkSpadeString + ' ' + strNum
      case Constants.CardMarkJokerA:
        return Constants.CardMarkJokerString + ' ' + strNum
      case Constants.CardMarkJokerB:
        return Constants.CardMarkJokerString + ' ' + strNum
      default:
        return ''
    }
  }

  id () {
    if (this._ID !== undefined) {
      return this._ID
    }
    this._ID = this.displayID()

    return this._ID
  }

  displayID () {
    if (this.Mark === Constants.CardMarkJokerA) {
      return 52
    } else if (this.Mark === Constants.CardMarkJokerB) {
      return 53
    } else {
      return this.score()
    }
  }

  score() {
    if (
      this.Mark === Constants.CardMarkJokerA ||
      this.Mark === Constants.CardMarkJokerB
    ) {
      return 0
    }
    return this.Mark + (this.Num * 4) - 4
  }

  cost () {
    if (CardCost[this.Num] === undefined) {
      return 0
    }
    return parseInt(CardCost[this.Num])
  }
}
