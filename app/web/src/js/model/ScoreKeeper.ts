import Storager from '../storage/Storager'
import ScoreData from '../data/ScoreData'
import CardData from '../data/CardData'
import { PlayerID, GameSetType } from '../type/Type'
import { ScoreRateBase, ScoreRate } from '../constant/Card'
import Players from '../model/Players'

export default class ScoreKeeper {
  private data: ScoreData[]
  private tmpData: ScoreData | null = null
  private rate: number

  constructor(private storage: Storager) {
    this.rate = ScoreRateBase * ScoreRate
    this.data = []
  }

  get Data(): ScoreData[] {
    return this.data
  }

  get TmpData(): ScoreData | null {
    return this.tmpData
  }

  get DataReversed(): ScoreData[] {
    let data = this.data.slice()
    return data.reverse()
  }

  get Rate(): number {
    return this.rate
  }

  get LatestScoreData(): ScoreData | null {
    if (this.Data.length === 0) {
      return null
    }
    return this.Data[this.Data.length - 1]
  }

  get LatestWinnerID(): PlayerID | null {
    let latestScore = this.LatestScoreData
    if (latestScore === null) {
      return null
    }
    if (latestScore.WinnerID === 0) {
      return null
    }
    return latestScore.WinnerID
  }

  keep(type: GameSetType, winnerID: PlayerID | 0, loserID: PlayerID | 0, players: Players, field: CardData | null): void {
    let score = new ScoreData
    score.Type = type
    score.WinnerID = winnerID
    score.LoserID = loserID

    for (let player of players.all()) {
      score.setHandCost(player.Data.ID, player.Hand.Cost)
    }

    let fieldCost = field == null ? 0 : field.Cost

    switch (type) {
      case GameSetType.Den:
      case GameSetType.Anko:
      case GameSetType.Chitoi:
      case GameSetType.CounterDen:
      case GameSetType.CounterAnko:
      case GameSetType.CounterChitoi:
        if (winnerID !== 0 && loserID !== 0) {
          score.addHandCost(loserID, fieldCost)
          score.JokerBuff = players.get(winnerID).Hand.JokerBuff
          score.ChitoiPower = players.get(winnerID).Hand.ChitoiPower
        }
    }

    this.check(score)

    this.tmpData = score
  }

  check(data: ScoreData): void {
    if (!data.isValidScore()) {
      throw new Error(`score is invalid.`)
      console.warn(this.data)
    }
    if (!data.isValidPlayerID()) {
      throw new Error(`score player id is invalid. ${this.data}`)
    }
  }

  save(): void {
    if (this.tmpData === null) {
      return
    }
    this.tmpData.cache()
    this.Data.push(this.tmpData)
    this.storage.saveScore(this.Data)
  }

  fetch(): void {
    let data = this.storage.getScore()
    if (data === null) {
      this.data = []
      return
    }
    this.data = data
  }

  clear(): void {
    this.storage.clearScore()
    this.fetch()
  }

  // TODO: JSONにした時にメソッドが消えるのでなんとかする
  aggregate(id: PlayerID): number {
    let result = 0
    for (let score of this.Data) {
      switch(id) {
        case 1:
          result += score.p1ScoreCache
          break
        case 2:
          result += score.p2ScoreCache
          break
        case 3:
          result += score.p3ScoreCache
          break
        case 4:
          result += score.p4ScoreCache
          break
        default:
          throw new Error(`Invalid Player id:${id}`)
      }
    }
    return result
  }
}
