import Constants from '../constants'
import ScoreData from '../data/ScoreData'

export default class ScoreKeeper {
  constructor () {
    this.scores = []
  }

  keep (winnerID, loserID, type, players) {
    let score = null
    switch (type) {
      case Constants.GameSetTypePlainDone:
        score = new ScoreData(
          winnerID,
          null,
          type,
          this.playerPlainDoneScoreByPlayerID(1, winnerID, players),
          this.playerPlainDoneScoreByPlayerID(2, winnerID, players),
          this.playerPlainDoneScoreByPlayerID(3, winnerID, players),
          this.playerPlainDoneScoreByPlayerID(4, winnerID, players)
        )
        break
      case Constants.GameSetTypeDen:
        score = new ScoreData(
          winnerID,
          loserID,
          type,
          this.playerDenScoreByPlayerID(1, winnerID, players),
          this.playerDenScoreByPlayerID(2, winnerID, players),
          this.playerDenScoreByPlayerID(3, winnerID, players),
          this.playerDenScoreByPlayerID(4, winnerID, players)
        )
        break
      case Constants.GameSetTypeAnko:
        score = new ScoreData(
          winnerID,
          loserID,
          type,
          this.playerAnkoScoreByPlayerID(1, winnerID, players),
          this.playerAnkoScoreByPlayerID(2, winnerID, players),
          this.playerAnkoScoreByPlayerID(3, winnerID, players),
          this.playerAnkoScoreByPlayerID(4, winnerID, players)
        )
        break
      default:
        throw new Error(`Invalid game set type ${type}.`)
    }
    this.scores.push(score)
  }

  playerPlainDoneScoreByPlayerID (playerID, winnerID, players) {
    if (playerID !== winnerID) {
      return players[playerID].hand.cost() * -1
    }

    let sum = 0
    for (let id in players) {
      if (id === playerID) {
        continue
      }
      sum += players[id].hand.cost()
    }
    return sum
  }

  playerDenScoreByPlayerID (playerID, winnerID, loserID, players) {
    if (playerID !== winnerID && playerID !== loserID) {
      return players[playerID].hand.cost() * -1
    }

    if (playerID === loserID) {
      // loser は winner の手札を受け取ってスコアを算出
      return (players[playerID].hand.cost() + players[winnerID].hand.cost()) * -1
    }

    let sum = 0
    for (let id in players) {
      sum += players[id].hand.cost()
    }
    return sum
  }

  playerAnkoScoreByPlayerID (playerID, winnerID, loserID, players) {
    // Den と Anko は同じ
    return this.playerDenScoreByPlayerID(playerID, winnerID, loserID, players)
  }
}
