import Configer from './Configer'
import { PlayerID } from '../type/Type'
import Brain from '../model/brains/Basic'

export default class implements Configer {
  IsDebug(): boolean {
    return true
  }

  TurnTable(): PlayerID[] {
    return [1, 2, 3, 4]
  }

  Player1Brain(): Brain {
    return new Brain
  }

  Player2Brain(): Brain {
    return new Brain
  }

  Player3Brain(): Brain {
    return new Brain
  }

  Player4Brain(): Brain {
    return new Brain
  }

  MainPlayerID(): PlayerID {
    return 1
  }
}
