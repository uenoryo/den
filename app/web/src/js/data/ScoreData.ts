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
    //
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

  getScore(id: PlayerID): number {
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
}
