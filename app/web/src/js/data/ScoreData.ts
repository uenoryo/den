import { PlayerID, GameSetType, JokerBuff } from '../type/Type'
import { PankScore, ScoreCounterBonusRate } from '../constant/Card'

export default class ScoreData {
  public Type: GameSetType
  public JokerBuff: JokerBuff
  public WinnerID: PlayerID | 0
  public LoserID: PlayerID | 0
  public ChitoiPower: number
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
    this.ChitoiPower = 0
    this.Level = 1

    this.p1HandCost = 0
    this.p2HandCost = 0
    this.p3HandCost = 0
    this.p4HandCost = 0
  }

  get TotalHandCost(): number {
    return this.p1HandCost + this.p2HandCost + this.p3HandCost + this.p4HandCost
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

  isValidScore(): boolean {
    return true
  }

  isValidPlayerID(): boolean {
    return this.WinnerID !== this.LoserID
  }

  getScore(id: PlayerID | 0): number {
    switch(this.Type) {
      case GameSetType.PlainDone:
        return this.calcScorePlainDone(id)
      case GameSetType.Pank:
        return this.calcScorePank(id)
      case GameSetType.Den:
        return this.calcScoreDen(id)
      case GameSetType.Anko:
        return this.calcScoreAnko(id)
      case GameSetType.Chitoi:
        return this.calcScoreChitoi(id)
      case GameSetType.CounterDen:
        return this.calcScoreDen(id) * ScoreCounterBonusRate
      case GameSetType.CounterAnko:
        return this.calcScoreAnko(id) * ScoreCounterBonusRate
      case GameSetType.CounterChitoi:
        return this.calcScoreChitoi(id) * ScoreCounterBonusRate
    }
    return 0
  }

  calcScorePlainDone(id: PlayerID | 0): number {
    if (id === this.WinnerID) {
      return this.TotalHandCost
    }
    return this.getHandCost(id) * -1
  }

  calcScorePank(id: PlayerID | 0): number {
    if (id === this.LoserID) {
      return PankScore * 3 * -1
    }
    return PankScore
  }

  calcScoreDen(id: PlayerID | 0): number {
    if (id === this.WinnerID) {
      return this.TotalHandCost
    }
    return this.getHandCost(id) * -1
  }

  calcScoreAnko(id: PlayerID | 0): number {
    if (id === this.WinnerID) {
      return this.TotalHandCost
    }
    return this.getHandCost(id) * -1
  }

  calcScoreChitoi(id: PlayerID | 0): number {
    if (id === this.WinnerID) {
      return this.TotalHandCost + this.ChitoiPower
    }
    return (this.getHandCost(id) + this.ChitoiPower) * -1
  }
}
