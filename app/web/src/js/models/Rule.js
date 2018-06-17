import Constants from '../constants'

export default class Rule {
  static canPut(field, target) {
    return (
      field.Mark === target.Mark ||
      field.Num === target.Num ||
      target.Mark === Constants.CardMarkJoker ||
      field.Mark === Constants.CardMarkJoker
    )
  }

  static isPank(hand) {
    if (hand.constructor.name != 'HandData') {
      throw new Error(`${hand.constructor.name} is not HandData`)
    }
    return hand.Cards.length > Constants.PlayerHandMaxAmount
  }
}
