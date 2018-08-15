import PlayerData from '../data/PlayerData'
import Brain from '../model/Brain'
import Player from '../model/Player'
import Players from '../model/Players'

export function TestPlayer() {
  return new Player(new PlayerData(1, 0), new Brain)
}

export function testPlayers() {
  return new Players(
    new Player(new PlayerData(1, 0), new Brain),
    new Player(new PlayerData(2, 0), new Brain),
    new Player(new PlayerData(3, 0), new Brain),
    new Player(new PlayerData(4, 0), new Brain)
  )
}
