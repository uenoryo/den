import { PlayerID } from '../type/Type'
import Player from './Player'

export default class Players {
  constructor(
    public Player1: Player,
    public Player2: Player,
    public Player3: Player,
    public Player4: Player
  ) {
    //
  }

  get(id: PlayerID): Player {
    switch(id) {
      case 1:
        return this.Player1
      case 2:
        return this.Player2
      case 3:
        return this.Player3
      case 4:
        return this.Player4
    }
    throw new Error(`Invalid Player id:${id}`)
  }

  all(): Player[] {
    return [
      this.Player1,
      this.Player2,
      this.Player3,
      this.Player4,
    ]
  }
}
