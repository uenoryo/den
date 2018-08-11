import { PlayerID } from '../type/Type'
import Brain from '../model/Brain'

export default interface Configer {
  IsDebug(): boolean
  TurnTable(): PlayerID[]
  Player1Brain(): Brain
  Player2Brain(): Brain
  Player3Brain(): Brain
  Player4Brain(): Brain
  MainPlayerID(): PlayerID
}
