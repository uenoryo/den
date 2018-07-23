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
      case Constants.GameSetTypeChitoi:
        score = new ScoreData(
          winnerID,
          loserID,
          type,
          this.playerChitoiScoreByPlayerID(1, winnerID, players),
          this.playerChitoiScoreByPlayerID(2, winnerID, players),
          this.playerChitoiScoreByPlayerID(3, winnerID, players),
          this.playerChitoiScoreByPlayerID(4, winnerID, players)
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

  // Den と Anko は同じ
  playerAnkoScoreByPlayerID (playerID, winnerID, loserID, players) {
    return this.playerDenScoreByPlayerID(playerID, winnerID, loserID, players)
  }

  // Chitoi は 3倍
  playerChitoiScoreByPlayerID (playerID, winnerID, loserID, players) {
    return this.playerDenScoreByPlayerID(playerID, winnerID, loserID, players) * 3
  }
}
