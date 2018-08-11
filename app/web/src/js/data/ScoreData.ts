import { PlayerID, GameSetType } from '../type/Type'

export default class ScoreData {
  constructor(
    private gameSetType: GameSetType,
    private winnerID: PlayerID | 0,
    private loserID: PlayerID | 0,
    private p1Score: number,
    private p2Score: number,
    private p3Score: number,
    private p4Score: number
  ) {
    this.validateScore()
  }

  get GameSetType(): GameSetType {
    return this.gameSetType
  }

  get WinnerID(): PlayerID | 0 {
    return this.winnerID
  }

  get LoserID(): PlayerID | 0 {
    return this.loserID
  }

  get Width(): number {
    let absSum = Math.abs(this.p1Score) + Math.abs(this.p2Score) + Math.abs(this.p3Score) + Math.abs(this.p4Score)
    return absSum / 2
  }

  getScore(id: PlayerID | 0): number {
    switch(id) {
      case 1:
        return this.p1Score
      case 2:
        return this.p2Score
      case 3:
        return this.p3Score
      case 4:
        return this.p4Score
    }
    throw new Error(`Invalid Player id:${id}`)
  }

  validateScore(): void {
    // Winner, Loser のプラマイチェック
    if (this.winnerID !== 0 && this.getScore(this.winnerID) < 0) {
      throw new Error(`winner score ${this.getScore(this.winnerID)} must not be minus value.`)
    }
    if (this.loserID !== 0 && this.getScore(this.loserID) > 0) {
      throw new Error(`loser score ${this.getScore(this.loserID)} must not be plus value.`)
    }

    // winnerID が 0 の場合はPank -> loser のスコアが Width になっているかどうか
    if (this.WinnerID === 0) {
      let ls = this.getScore(this.loserID)
      if (Math.abs(ls) !== this.Width) {
        throw new Error(`Invalid loser score ${ls}, want ${this.Width}.`)
      }
      return
    }

    // winner のスコアが Width になっているかどうか
    let ws = this.getScore(this.winnerID)
    if (ws !== this.Width) {
      throw new Error(`Invalid winner score ${ws}, want ${this.Width}.`)
    }
  }
}
