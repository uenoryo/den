import { PlayerID, GameSetType, JokerBuff } from '../type/Type'

export default class ScoreData {
  public Type: GameSetType
  public JokerBuff: JokerBuff
  public WinnerID: PlayerID | 0
  public LoserID: PlayerID | 0
  public Level: number

  public p1HandCost: number
  public p2HandCost: number
  public p3HandCost: number
  public p4HandCost: number

  constructor() {
    this.Type = GameSetType.PlainDone
    this.WinnerID = 0
    this.LoserID = 0
    this.JokerBuff = JokerBuff.None
    this.Level = 1

    this.p1HandCost = 0
    this.p2HandCost = 0
    this.p3HandCost = 0
    this.p4HandCost = 0
  }

  get Width(): number {
    let absSum = Math.abs(this.p1HandCost) + Math.abs(this.p2HandCost) + Math.abs(this.p3HandCost) + Math.abs(this.p4HandCost)
    return absSum / 2
  }

  getHandCost(id: PlayerID | 0): number {
    switch(id) {
      case 1:
        return this.p1HandCost
      case 2:
        return this.p2HandCost
      case 3:
        return this.p3HandCost
      case 4:
        return this.p4HandCost
    }
    throw new Error(`Invalid Player id:${id}`)
  }

  setHandCost(id: PlayerID | 0, value: number): void {
    switch(id) {
      case 1:
        this.p1HandCost = value
        return
      case 2:
        this.p2HandCost = value
        return
      case 3:
        this.p3HandCost = value
        return
      case 4:
        this.p4HandCost = value
        return
    }
    throw new Error(`Invalid Player id:${id}`)
  }

  addHandCost(id: PlayerID | 0, value: number): void {
    switch(id) {
      case 1:
        this.p1HandCost += value
        return
      case 2:
        this.p2HandCost += value
        return
      case 3:
        this.p3HandCost += value
        return
      case 4:
        this.p4HandCost += value
        return
    }
    throw new Error(`Invalid Player id:${id}`)
  }

  // validateScore は Winnerのスコアが 0以上で、 Loserのスコアが 0 以下であることと、
  // Winner と Loserそれぞれのスコアがスコアが Width と一致しているかどうかを返します
  isValidScore(): boolean {
    return true
  }

  isValidPlayerID(): boolean {
    return this.WinnerID !== this.LoserID
  }
}
