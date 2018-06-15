import Player from '@/models/Player'
import PlayerData from '@/data/PlayerData'

/**
 * God can setup game
 */
export default class God {
  constructor(config) {
    this.config = config
  }

  /**
   * Create entry player
   */
  createPlayers() {
    let players = this.config.EntryPlayers
    let playersByID = {}
    for (let id in players) {
      let data = new PlayerData(id, players[id])
      playersByID[id] = new Player(data)
    }
    return playersByID
  }
}
