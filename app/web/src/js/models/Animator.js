import Config from '../config'
import Constants from '../constants'
import HandFantomData from '../data/HandFantomData'
import CardFantomData from '../data/CardFantomData'
import EmptyCardData from '../data/EmptyCardData'
import CardData from '../data/CardData'

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
    this.expandHand(playerID)
  }

  resetHand (playerID) {
    this.hands[playerID].cards([])
  }

  insertableHandIdx (playerID, card) {
    for (let idx in this.hands[playerID].Cards) {
      if (this.hands[playerID].Cards[idx].IsEmpty) {
        continue
      }
      if (card.score() > this.hands[playerID].Cards[idx].score()) {
        return idx
      }
    }
    return 0
  }

  // 指定された手札のIndex番号に空のカードを挿入する
  insertEmpty (playerID, idx) {
    this.hands[playerID].Cards.splice(idx, 0, new CardData(1,1))
  }

  makeCardFantom (card) {
    return new CardFantomData(card.Mark, card.Num)
  }

  firstInsertIdx (num) {
    return parseInt(Constants.PlayerHandMaxAmount / 2) - parseInt(num / 2)
  }

  emptyHandCards (playerID) {
    let empty = []
    for (let idx in this.hands[playerID].Cards) {
      if (this.hands[playerID].Cards[idx].IsEmpty) {
        empty.push(this.hands[playerID].Cards[idx])
      }
    }
    return empty
  }

  expandHand (playerID) {
    if (parseInt(playerID) === 1) {
      let width = this.emptyHandCards(playerID).length * 50
      width = width > 100 ? 100 : width
      this.hands[playerID].CSS.minWidth = `${width}%`
    } else if (playerID % 2 === 0) {
      let height = this.emptyHandCards(playerID).length * 6
      height = height > 100 ? 100 : height
      this.hands[playerID].CSS.minHeight = `${height}%`
    } else {
      let width = this.emptyHandCards(playerID).length * 6
      width = width > 100 ? 100 : width
      this.hands[playerID].CSS.minWidth = `${width}%`
    }
  }
}
