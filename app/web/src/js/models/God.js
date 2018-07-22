import Config from '../config'
import Constants from '../constants'
import Env from '../env'
import Dealer from './Dealer'
import Player from './Player'
import PlayerData from '../data/PlayerData'
import Deck from './Deck'
import DeckData from '../data/DeckData'
import CardData from '../data/CardData'

import BrainFastDone from './brains/FastDone'
import BrainBasic from './brains/Basic'

/**
 * God can setup game
 */
export default class God {
  createDealer(deck) {
    return new Dealer(deck)
  }

  createPlayers() {
    let data1 = new PlayerData(1, Config.EntryPlayers[1])
    let data2 = new PlayerData(2, Config.EntryPlayers[2])
    let data3 = new PlayerData(3, Config.EntryPlayers[3])
    let data4 = new PlayerData(4, Config.EntryPlayers[4])
    let playersByID = {
      1: new Player(data1),
      2: new Player(data2, this.createBrain(Env.Player2Brain)),
      3: new Player(data3, this.createBrain(Env.Player3Brain)),
      4: new Player(data4, this.createBrain(Env.Player4Brain)),
    }
    return playersByID
  }

  createDeck() {
    let cards = []

    // Prepare normal cards
    for (let num = Constants.CardMinNum+1; num <= Constants.CardMaxNum; num++) {
      cards.push(new CardData(Constants.CardMarkClub, num))
      cards.push(new CardData(Constants.CardMarkDiamond, num))
      cards.push(new CardData(Constants.CardMarkHeart, num))
      cards.push(new CardData(Constants.CardMarkSpade, num))
    }

    // Prepare Joker x2
    cards.push(new CardData(Constants.CardMarkJokerA, Constants.CardJokerNum))
    cards.push(new CardData(Constants.CardMarkJokerB, Constants.CardJokerNum))

    let data = new DeckData(cards)
    return new Deck(data)
  }

  createBrain(type) {
    switch (type) {
      case 'Basic':
        return new BrainBasic
      case 'FastDone':
        return new BrainFastDone
      default:
        return new BrainBasic
    }
  }
}
