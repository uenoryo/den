import Brain from '../Brain'
import ChangeMarkThought from '../BrainCellChangeMark'
import PutOrForceDrawThought from '../BrainCellPutOrForceDraw'
import { CardMark } from '../../type/Type'

export default class BasicBrain extends Brain {
  changeMark(): CardMark {
    return ChangeMarkThought.mostHighPriorityCardMark(this.Data, 80)
  }

  putOrForceDraw(): number {
    return PutOrForceDrawThought.putNormally(this.Data, 80)
  }
}
