import { PlayerID } from '../type/Type'

export default interface Configer = {
  TurnTable(): PlayerID[]
}
