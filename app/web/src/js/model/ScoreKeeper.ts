import ScoreData from '../data/ScoreData'
import { PlayerID, GameSetType } from '../type/Type'
import { ScoreRateBase, ScoreRate } from '../constant/Card'
import Players from '../model/Players'

export default class ScoreKeeper {
  private data: ScoreData[]
  private rate: number

  constructor() {
    this.data = []
    this.rate = ScoreRateBase * ScoreRate
  }

  get Data(): ScoreData[] {
    return this.data
  }

  get Rate(): number {
    return this.rate
  }

  keep(winnerID: PlayerID | 0, loserID: PlayerID | 0, type: GameSetType, players: Players): void {
    let score = new ScoreData

    switch (type) {
      case GameSetType.PlainDone:
        score = this.writePlainDone(score, winnerID, players)
        break
    }

    this.check(score)

    this.Data.push(score)
  }

  check(data: ScoreData) : void {
    if (!data.isValidScore()) {
      throw new Error(`score is invalid. ${this.data}`)
    }
    if (!data.isValidPlayerID()) {
      throw new Error(`score player id is invalid. ${this.data}`)
    }
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
}
