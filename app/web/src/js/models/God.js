import Config from '../config'
import Constants from '../constants'
import Dealer from './Dealer'
import Player from './Player'
import PlayerData from '../data/PlayerData'
import Deck from './Deck'
import DeckData from '../data/DeckData'
import CardData from '../data/CardData'

/**
 * God can setup game
 */
export default class God {
  createDealer(deck) {
    return new Dealer(deck)
  }

  createPlayers() {
    let players = Config.EntryPlayers
    let playersByID = {}
    for (let id in players) {
      let data = new PlayerData(id, players[id])
      playersByID[id] = new Player(data)
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
}
