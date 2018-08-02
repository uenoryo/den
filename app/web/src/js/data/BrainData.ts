import CardData from './CardData'
import HandData from './HandData'
import { HandActionID, HandActionPriority } from '../type/Type'

export default class BrainData {
  public FieldCard: CardData | null
  public SelfCard: HandData | null
  public PutCards: CardData[]
  public HandActionPriorities: HandActionPriority[]
  public PuttableIdx: number[]

  constructor() {
    this.FieldCard = null
    this.SelfCard = null
    this.PuttableIdx = []
    this.HandActionPriorities = [ [-1, 0] ]
    this.PutCards = []
  }

  topPriorityActionID(): HandActionID {
    let actionID: HandActionID = -1
    if (this.HandActionPriorities.length === 0) {
      return actionID
    }
    let max = -99999
    for (let priority of this.HandActionPriorities) {
      if (max < priority[1]) {
        max = priority[1]
        actionID = priority[0]
      }
    }
    return actionID
  }

  inputPriority(actionID: HandActionID, priority: number): void {
    for (let idx in this.HandActionPriorities) {
      if (this.HandActionPriorities[idx][0] === actionID) {
        this.HandActionPriorities[idx][1] = priority
        return
      }
    }
    this.HandActionPriorities.push([actionID, priority])
  }
}
