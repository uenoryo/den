import { PlayerID, GameSetType } from '../type/Type'

export default class ScoreData {
  public Type: GameSetType
  public WinnerID: PlayerID | 0
  public LoserID: PlayerID | 0

  public p1Score: number
  public p2Score: number
  public p3Score: number
  public p4Score: number

  constructor() {
    this.Type = GameSetType.PlainDone
    this.WinnerID = 0
    this.LoserID = 0
    this.p1Score = 0
    this.p2Score = 0
    this.p3Score = 0
    this.p4Score = 0
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

  setScore(id: PlayerID | 0, value: number): void {
    switch(id) {
      case 1:
        this.p1Score = value
        return
      case 2:
        this.p2Score = value
        return
      case 3:
        this.p3Score = value
        return
      case 4:
        this.p4Score = value
        return
    }
    throw new Error(`Invalid Player id:${id}`)
  }

  addScore(id: PlayerID | 0, value: number): void {
    switch(id) {
      case 1:
        this.p1Score += value
        return
      case 2:
        this.p2Score += value
        return
      case 3:
        this.p3Score += value
        return
      case 4:
        this.p4Score += value
        return
    }
    throw new Error(`Invalid Player id:${id}`)
  }

  subtractScore(id: PlayerID | 0, value: number): void {
    switch(id) {
      case 1:
        this.p1Score -= value
        return
      case 2:
        this.p2Score -= value
        return
      case 3:
        this.p3Score -= value
        return
      case 4:
        this.p4Score -= value
        return
    }
    throw new Error(`Invalid Player id:${id}`)
  }

  // validateScore は Winnerのスコアが 0以上で、 Loserのスコアが 0 以下であることと、
  // Winner と Loserそれぞれのスコアがスコアが Width と一致しているかどうかを返します
  isValidScore(): boolean {
    if (this.WinnerID !== 0 && this.getScore(this.WinnerID) < 0) {
      return false
    }
    if (this.LoserID !== 0 && this.getScore(this.LoserID) > 0) {
      return false
    }

    if (this.WinnerID === 0 && this.LoserID !== 0) {
      if (Math.abs(this.getScore(this.LoserID)) !== this.Width) {
        return false
      }
    }

    if (this.LoserID === 0 && this.WinnerID !== 0) {
      if (this.getScore(this.WinnerID) !== this.Width) {
        return false
      }
    }

    return true
  }

  isValidPlayerID(): boolean {
    return this.WinnerID !== this.LoserID
  }
}
