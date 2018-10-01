import { PlayerID, GameSetType, JokerBuff } from '../type/Type'
import {
  ScoreCounterBonusRate,
  JokerBuffScoreGood,
  JokerBuffScoreAwesome,
  ScoreDen,
  ScoreAnko,
  ScoreChitoi,
  ScorePank,
} from '../constant/Card'

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

  public p1ScoreCache: number
  public p2ScoreCache: number
  public p3ScoreCache: number
  public p4ScoreCache: number

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

    this.p1ScoreCache = 0
    this.p2ScoreCache = 0
    this.p3ScoreCache = 0
    this.p4ScoreCache = 0
  }

  get TotalHandCost(): number {
    return this.p1HandCost + this.p2HandCost + this.p3HandCost + this.p4HandCost
  }

  get TotalChitoiPower(): number {
    return this.ChitoiPower * 3
  }

  get JokerBuffBonus() : number {
    switch(this.JokerBuff) {
      case JokerBuff.Good:
        return JokerBuffScoreGood
      case JokerBuff.Awesome:
        return JokerBuffScoreAwesome
    }
    return 0
  }

  get JokerBuffString() : string {
    switch(this.JokerBuff) {
      case JokerBuff.Good:
        return '成金'
      case JokerBuff.Awesome:
        return '一攫千金'
    }
    return ''
  }

  get GameSetTypeString() : string {
    switch(this.Type) {
      case GameSetType.PlainDone:
        return '素上がり'
      case GameSetType.Pank:
        return 'パンク'
      case GameSetType.Den:
        return 'デン'
      case GameSetType.Anko:
        return '暗刻'
      case GameSetType.Chitoi:
        return 'チートイ'
      case GameSetType.CounterDen:
        return 'デン返し'
      case GameSetType.CounterAnko:
        return '暗刻返し'
      case GameSetType.CounterChitoi:
        return 'チートイ返し'
    }
    return ''
  }

  get TotalJokerBuffBonus(): number {
    return this.JokerBuffBonus * 3
  }

  get RoleScore(): number {
    switch(this.Type) {
      case GameSetType.Den:
        return ScoreDen
      case GameSetType.Anko:
        return ScoreAnko
      case GameSetType.Chitoi:
        return ScoreChitoi
      case GameSetType.Pank:
        return ScorePank
    }
    return 0
  }

  get IsJokerBuffGood(): boolean {
    return this.JokerBuff === JokerBuff.Good
  }

  get IsJokerBuffAwesome(): boolean {
    return this.JokerBuff === JokerBuff.Awesome
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

  // JSONにする前にメンバ変数に保存しておく必要がある
  cache(): void {
    this.p1ScoreCache = this.getScore(1)
    this.p2ScoreCache = this.getScore(2)
    this.p3ScoreCache = this.getScore(3)
    this.p4ScoreCache = this.getScore(4)
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
        return this.calcScorePlainDone(id) * this.Level
      case GameSetType.Pank:
        return this.calcScorePank(id) * this.Level
      case GameSetType.Den:
        return this.calcScoreDen(id) * this.Level
      case GameSetType.Anko:
        return this.calcScoreAnko(id) * this.Level
      case GameSetType.Chitoi:
        return this.calcScoreChitoi(id) * this.Level
      case GameSetType.CounterDen:
        return this.calcScoreDen(id) * ScoreCounterBonusRate * this.Level
      case GameSetType.CounterAnko:
        return this.calcScoreAnko(id) * ScoreCounterBonusRate * this.Level
      case GameSetType.CounterChitoi:
        return this.calcScoreChitoi(id) * ScoreCounterBonusRate * this.Level
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
      return this.RoleScore * 3 * -1
    }
    return this.RoleScore
  }

  calcScoreDen(id: PlayerID | 0): number {
    if (id === this.WinnerID) {
      return this.RoleScore + this.TotalHandCost + this.TotalJokerBuffBonus
    }
    if (id === this.LoserID) {
      return (this.RoleScore + this.getHandCost(id) + this.getHandCost(this.WinnerID) + this.JokerBuffBonus) * -1
    }
    return (this.getHandCost(id) + this.JokerBuffBonus) * -1
  }

  calcScoreAnko(id: PlayerID | 0): number {
    if (id === this.WinnerID) {
      return this.RoleScore + this.TotalHandCost + this.TotalJokerBuffBonus
    }
    if (id === this.LoserID) {
      return (this.RoleScore + this.getHandCost(id) + this.getHandCost(this.WinnerID) + this.JokerBuffBonus) * -1
    }
    return (this.getHandCost(id) + this.JokerBuffBonus) * -1
  }

  calcScoreChitoi(id: PlayerID | 0): number {
    if (id === this.WinnerID) {
      return this.RoleScore + this.TotalHandCost + this.TotalJokerBuffBonus + this.TotalChitoiPower
    }
    if (id === this.LoserID) {
      return (this.RoleScore + this.getHandCost(id) + this.getHandCost(this.WinnerID) + this.JokerBuffBonus + this.ChitoiPower) * -1
    }
    return (this.getHandCost(id) + this.JokerBuffBonus + this.ChitoiPower) * -1
  }
}
