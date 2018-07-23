import Constants from '../constants'

export default class ScoreData {
  constructor (winnerID, loserID, type, p1HandCost, p2HandCost, p3HandCost, p4HandCost) {
    this.winnerID(winnerID)
    this.loserID(loserID)
    this.type(type)
    this.playerHandCosts(p1HandCost, p2HandCost, p3HandCost, p4HandCost)
  }

  winnerID (playerID) {
    if (playerID === null) {
      this.WinnerID = null
      return
    }
    if (! this._existsPlayerID(playerID)) {
      throw new Error(`Invalid winner Player ID [${playerID}].`)
    }
    if (playerID === this.LoserID) {
      throw new Error(`Winner player ID [${playerID}] is equal to loser player ID.`)
    }
    this.WinnerID = parseInt(playerID)
  }

  loserID (playerID) {
    if (playerID === null) {
      this.LoserID = null
      return
    }
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
    this.Player1HandCost = parseInt(p1cost)
    this.Player2HandCost = parseInt(p2cost)
    this.Player3HandCost = parseInt(p3cost)
    this.Player4HandCost = parseInt(p4cost)
    this._isValidScoresOrFail()
  }

  width () {
    return Math.abs(this.Player1HandCost)
      + Math.abs(this.Player2HandCost)
      + Math.abs(this.Player3HandCost)
      + Math.abs(this.Player4HandCost)
  }

  _existsPlayerID (playerID) {
    return playerID === Constants.Player1ID ||
           playerID === Constants.Player2ID ||
           playerID === Constants.Player3ID ||
           playerID === Constants.Player4ID
  }

  _handCostByPlayerID (id) {
    switch (id) {
      case 1:
        return this.Player1HandCost
      case 2:
        return this.Player2HandCost
      case 3:
        return this.Player3HandCost
      case 4:
        return this.Player4HandCost
      default:
        throw new Error(`Invalid Player ID ${id}, could not get hand cost.`)
    }
  }

  _isValidScoresOrFail () {
    // Winner, Loser のプラマイチェック
    if (this.WinnerID !== null && this._handCostByPlayerID(this.WinnerID) < 0) {
      throw new Error(`Winner score ${this._handCostByPlayerID(this.WinnerID)} must be plus value.`)
    }
    if (this.LoserID !== null && this._handCostByPlayerID(this.LoserID) > 0) {
      throw new Error(`Loser score ${this._handCostByPlayerID(this.LoserID)} must not be plus value.`)
    }

    // winnerID が null の場合はPank -> loser以外が全員プラス
    if (this.WinnerID === null) {
      let loserScore = Math.abs(this._handCostByPlayerID(this.LoserID))
      if (this.width() - loserScore !== loserScore) {
        throw new Error(`Invalid loser score ${loserScore}, winner score ${this.width() - loserScore}, score total is not zero.`)
      }
      return
    }

    let winnerScore = Math.abs(this._handCostByPlayerID(this.WinnerID))
    if (this.width() - winnerScore !== winnerScore) {
      throw new Error(`Invalid winner score data ${winnerScore}, score total is not zero.`)
    }
  }
}
