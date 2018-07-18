import Constants from '../constants'

export default class ScoreData {
  constructor (winnerID, loserID, type, p1HandCost, p2HandCost, p3HandCost, p4HandCost) {
    this.winnerID(winnerID)
    this.loserID(winnerID)
    this.type(type)
    this.player1HandCost(p1HandCost)
    this.player2HandCost(p2HandCost)
    this.player3HandCost(p3HandCost)
    this.player4HandCost(p4HandCost)
  }

  winnerID (playerID) {
    if (! this._existsPlayerID(playerID)) {
      throw new Error(`Invalid winner Player ID [${playerID}].`)
    }
    if (playerID === this.LoserID) {
      throw new Error(`Winner Player ID [${playerID}] is equal to Loser Player ID.`)
    }
    this.WinnerID = parseInt(playerID)
  }

  loserID (playerID) {
    if (! this._existsPlayerID(playerID)) {
      throw new Error(`Invalid winner Player ID [${playerID}].`)
    }
    if (playerID === this.LoserID) {
      throw new Error(`Winner Player ID [${playerID}] is equal to Loser Player ID.`)
    }
    this.WinnerID = parseInt(playerID)
  }

  type (type) {
    this.Type = type
  }

  player1HandCost (cost) {
    this,Player1HandCost = cost
  }

  player2HandCost (cost) {
    this,Player2HandCost = cost
  }

  player3HandCost (cost) {
    this,Player3HandCost = cost
  }

  player4HandCost (cost) {
    this,Player4HandCost = cost
  }

  _existsPlayerID (playerID) {
    return playerID === Constants.Player1ID ||
           playerID === Constants.Player2ID ||
           playerID === Constants.Player3ID ||
           playerID === Constants.Player4ID
  }
}
