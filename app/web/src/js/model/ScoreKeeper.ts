import Storager from '../storage/Storager'
import ScoreData from '../data/ScoreData'
import { PlayerID, GameSetType } from '../type/Type'
import { ScoreRateBase, ScoreRate, PankScore } from '../constant/Card'
import Players from '../model/Players'

export default class ScoreKeeper {
  private data: ScoreData[]
  private rate: number

  constructor(private storage: Storager) {
    this.rate = ScoreRateBase * ScoreRate
    this.data = []
  }

  get Data(): ScoreData[] {
    return this.data
  }

  get DataReversed(): ScoreData[] {
    let data = this.data.slice()
    return data.reverse()
  }

  get Rate(): number {
    return this.rate
  }

  keep(type: GameSetType, winnerID: PlayerID | 0, loserID: PlayerID | 0, players: Players): void {
    let score = new ScoreData

    switch (type) {
      case GameSetType.PlainDone:
        score = this.writePlainDone(score, winnerID, players)
        break
      case GameSetType.Den:
        score = this.writeDen(score, winnerID, loserID, players)
        break
      case GameSetType.Anko:
        score = this.writeAnko(score, winnerID, loserID, players)
        break
      case GameSetType.Chitoi:
        score = this.writeChitoi(score, winnerID, loserID, players)
        break
      case GameSetType.Pank:
        score = this.writePank(score, loserID, players)
        break
    }

    this.check(score)

    this.Data.push(score)
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

  writePlainDone(data: ScoreData, winnerID: PlayerID | 0, players: Players): ScoreData {
    data.Type = GameSetType.PlainDone
    data.WinnerID = winnerID

    for (let player of players.all()) {
      if (player.Data.ID !== winnerID) {
        data.subtractScore(player.Data.ID, player.Hand.Cost * this.Rate)
        data.addScore(winnerID, player.Hand.Cost * this.Rate)
      }
    }
    return data
  }

  writeDen(data: ScoreData, winnerID: PlayerID | 0, loserID: PlayerID | 0, players: Players): ScoreData {
    data.Type = GameSetType.Den
    data.WinnerID = winnerID
    data.LoserID = loserID

    for (let player of players.all()) {
      if (player.Data.ID !== winnerID && winnerID !== 0) {
        if (player.Data.ID === loserID) {
          let loserCost = players.get(winnerID).Hand.Cost + player.Hand.Cost
          data.subtractScore(loserID, loserCost * this.Rate)
          data.addScore(winnerID, loserCost * this.Rate)
        } else {
          data.subtractScore(player.Data.ID, player.Hand.Cost * this.Rate)
          data.addScore(winnerID, player.Hand.Cost * this.Rate)
        }
      }
    }
    return data
  }

  writeAnko(data: ScoreData, winnerID: PlayerID | 0, loserID: PlayerID | 0, players: Players): ScoreData {
    return this.writeDen(data, winnerID, loserID, players)
  }

  writePank(data: ScoreData, loserID: PlayerID | 0, players: Players): ScoreData {
    data.Type = GameSetType.Pank
    data.LoserID = loserID

    for (let player of players.all()) {
      if (player.Data.ID !== loserID) {
        data.addScore(player.Data.ID, PankScore * this.Rate)
        data.subtractScore(loserID, PankScore * this.Rate)
      }
    }
    return data
  }

  writeChitoi(data: ScoreData, winnerID: PlayerID | 0, loserID: PlayerID | 0, players: Players): ScoreData {
    if (winnerID === 0) {
      throw new Error('chitoi requires winnerID')
    }

    data.Type = GameSetType.Den
    data.WinnerID = winnerID
    data.LoserID = loserID

    let bonus = players.get(winnerID).Hand.pairCount() + 1

    for (let player of players.all()) {
      if (player.Data.ID !== winnerID) {
        if (player.Data.ID === loserID) {
          let loserCost = players.get(winnerID).Hand.Cost + player.Hand.Cost + bonus
          data.subtractScore(loserID, loserCost * this.Rate)
          data.addScore(winnerID, loserCost * this.Rate)
        } else {
          data.subtractScore(player.Data.ID, (player.Hand.Cost + bonus) * this.Rate)
          data.addScore(winnerID, (player.Hand.Cost + bonus) * this.Rate)
        }
      }
    }
    return data
  }

  // TODO: JSONにした時にメソッドが消えるのでなんとかする
  aggregate(id: PlayerID): number {
    let result = 0
    for (let score of this.Data) {
      switch(id) {
        case 1:
          result += score.p1Score
          break
        case 2:
          result += score.p2Score
          break
        case 3:
          result += score.p3Score
          break
        case 4:
          result += score.p4Score
          break
        default:
          throw new Error(`Invalid Player id:${id}`)
      }
    }
    return result
  }
}
