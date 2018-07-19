import Constants from '../constants'

export default class ScoreData {
  constructor (winnerID, loserID, type, p1HandCost, p2HandCost, p3HandCost, p4HandCost) {
    this.winnerID(winnerID)
    this.loserID(loserID)
    this.type(type)
    this.playerHandCosts(p1HandCost, p2HandCost, p3HandCost, p4HandCost)
  }

  winnerID (playerID) {
    if (! this._existsPlayerID(playerID)) {
      throw new Error(`Invalid winner Player ID [${playerID}].`)
    }
    if (playerID === this.LoserID) {
      throw new Error(`Winner player ID [${playerID}] is equal to loser player ID.`)
    }
    this.WinnerID = parseInt(playerID)
  }

  loserID (playerID) {
    if (! this._existsPlayerID(playerID)) {
      throw new Error(`Invalid loser player ID [${playerID}].`)
    }
    if (playerID === this.WinnerID) {
      throw new Error(`Loser player ID [${playerID}] is equal to winner player ID.`)
    }
    this.LoserID = parseInt(playerID)
  }

  type (type) {
    this.Type = type
  }

  playerHandCosts (p1cost, p2cost, p3cost, p4cost) {
    if (p1cost + p2cost + p3cost + p4cost !== 0) {
      throw new Error(`The sub Player Hand costs should be 0. got ${p1cost + p2cost + p3cost + p4cost}`)
    }
    this.Player1HandCost = parseInt(p1cost)
    this.Player2HandCost = parseInt(p2cost)
    this.Player3HandCost = parseInt(p3cost)
    this.Player4HandCost = parseInt(p4cost)
  }

  _existsPlayerID (playerID) {
    return playerID === Constants.Player1ID ||
           playerID === Constants.Player2ID ||
           playerID === Constants.Player3ID ||
           playerID === Constants.Player4ID
  }
}
