import { PlayerID, PlayerType, CardMark } from './type/Type'
import { CardMaxNum, CardJokerNum } from './constant/Card'
import CardData from '../data/CardData'
import DeckData from '../data/DeckData'
import Configer from '../config/Configer'
import Config from '../config/Config'
import Dealer from './Dealer'
import Players from './Players'
import Player from './Player'

export default class God {
  private config: Configer

  constructor() {
    this.config = new Config
  }

  createDealer(deck: DeckData) {
    return new Dealer(deck)
  }

  createPlayers(): Players {
    let players = new Players(
      new Player(new PlayerData(1, PlayerType.Human),    this.config.Player1Brain()),
      new Player(new PlayerData(2, PlayerType.Computer), this.config.Player2Brain()),
      new Player(new PlayerData(3, PlayerType.Computer), this.config.Player3Brain()),
      new Player(new PlayerData(4, PlayerType.Computer), this.config.Player4Brain())
    )
    return players
  }

  createDeck(): DeckData {
    let cards: CardData[] = []

    // Prepare normal cards
    for (let num = 1; num <= CardMaxNum; num++) {
      cards.push(new CardData(CardMark.Club, num))
      cards.push(new CardData(CardMark.Diamond, num))
      cards.push(new CardData(CardMark.Heart, num))
      cards.push(new CardData(CardMark.Spade, num))
    }

    // Prepare Joker x2
    cards.push(new CardData(CardMark.JokerA, CardJokerNum))
    cards.push(new CardData(CardMark.JokerB, CardJokerNum))

    return new DeckData(cards)
  }
}
