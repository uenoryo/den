import Config from '../config'
import Constants from '../constants'
import HandFantomData from '../data/HandFantomData'
import CardFantomData from '../data/CardFantomData'

export default class Animator {
  constructor () {
    this.hands = []
    for (let id in Config.EntryPlayers) {
      this.hands[id] = new HandFantomData([])
    }
  }

  syncHand (playerID, cards) {
    this.resetHand(playerID)

    // 中央になるようにセット
    for (let i = 0; i < cards.length; i++) {
      this.hands[playerID].Cards[i + this.firstInsertIdx(cards.length)] = this.makeCardFantom(cards[i])
    }
    console.log(this.hands[playerID].Cards[4])
  }

  resetHand (playerID) {
    this.hands[playerID].cards([])
  }

  insertableHandIdx (playerID, card) {
    for (let idx in this.hands[playerID].Cards) {
      if (card.score() > this.hands[playerID].Cards[idx].score()) {
        return idx
      }
    }
    return 0
  }

  makeCardFantom (card) {
    return new CardFantomData(card.Mark, card.Num)
  }

  firstInsertIdx (num) {
    return parseInt(Constants.PlayerHandMaxAmount / 2) - parseInt(num / 2)
  }
}
