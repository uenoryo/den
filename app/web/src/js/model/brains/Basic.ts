import Brain from '../Brain'
import ChangeMarkThought from '../BrainCellChangeMark'
import { CardMark } from '../../type/Type'

export default class BasicBrain extends Brain {
  changeMark(): CardMark {
    return ChangeMarkThought.mostHighPriorityCardMark(this.Data, 80)
  }
}
