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
      default:
        throw new Error(`Invalid game set type ${type}.`)
    }
    this.scores.push(score)
  }

  makePlainDoneScore (winnerID, players) {
    let score = new ScoreData(winnerID, null, Constants.GameSetTypePlainDone,
      players[1].hand.cost(),
      players[2].hand.cost(),
      players[3].hand.cost(),
      players[4].hand.cost()
    )

    console.log(score)
    return score
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
}
