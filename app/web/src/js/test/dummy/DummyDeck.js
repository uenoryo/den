import Constants from '../../constants'
import CardData from '../../data/CardData'

export default class Deck {
  constructor() {
    this.data = {}
    this.data.Cards = [
      new CardData(Constants.CardMarkClub, 1),
      new CardData(Constants.CardMarkDiamond, 1),
      new CardData(Constants.CardMarkHeart, 1),
      new CardData(Constants.CardMarkSpade, 1),
      new CardData(Constants.CardMarkClub, 2),
      new CardData(Constants.CardMarkDiamond, 2),
      new CardData(Constants.CardMarkHeart, 2),
      new CardData(Constants.CardMarkSpade, 2),
      new CardData(Constants.CardMarkJoker, Constants.CardJokerNum),
    ]
  }
}
