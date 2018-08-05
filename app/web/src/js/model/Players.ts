import { PlayerID } from './type/Type'
import Player from './Player'

export default class Players {
  constructor(Player1: Player, Player2: Player, Player3: Player, Player4: Player) {}

  get(id: PlayerID): Plyaer {
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
}
