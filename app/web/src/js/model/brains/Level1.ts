import Brain from '../Brain'
import Thought from '../BrainCell'
import ChangeMarkThought from '../BrainCellChangeMark'
import PutOrForceDrawThought from '../BrainCellPutOrForceDraw'
import { CardMark } from '../../type/Type'

export default class Level1 extends Brain {
  thinkPutOrDraw(): void {
    Thought.waitAnko(this.Data, -10, 80)
    Thought.controllManually(this.Data)
    Thought.jokerPriority(this.Data, -20, 95)
  }

  changeMark(): CardMark {
    return ChangeMarkThought.mostHighPriorityCardMark(this.Data, 80)
  }

  putOrForceDraw(): number {
    return PutOrForceDrawThought.putNormally(this.Data, 80)
  }
}
