import Constants from '../constants'

export default class Rule {
  static canPut(field, target) {
    return (
      field.Mark === target.Mark ||
      field.Num === target.Num ||
      target.Num === Constants.CardSkillWildCard ||
      target.Mark === Constants.CardMarkJokerA ||
      target.Mark === Constants.CardMarkJokerB ||
      field.Mark === Constants.CardMarkJokerA ||
      field.Mark === Constants.CardMarkJokerB
    )
  }

  static isPank(hand) {
    if (hand.constructor.name != 'HandData') {
      throw new Error(`${hand.constructor.name} is not HandData`)
    }
    return hand.Cards.length > Constants.PlayerHandMaxAmount
  }
}
