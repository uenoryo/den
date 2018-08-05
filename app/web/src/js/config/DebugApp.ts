import Configer from './Configer'
import { PlayerID } from '../type/Type'

export default class implements Configer {
  TurnTable(): PlayerID[] {
    return [1, 2, 3, 4]
  }
}
