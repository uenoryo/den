import CardData from './CardData'
import HandData from './HandData'
import { HandPriority } from '../type/Type'
import { DrawActionID } from '../constant/Card'

export default class BrainData {
  public FieldCard: CardData | null
  public SelfHand: HandData | null
  public PutCards: CardData[]
  public HandPriorities: HandPriority[]
  public PuttableIdx: number[]

  constructor() {
    this.FieldCard = null
    this.SelfHand = null
    this.PuttableIdx = []
    this.HandPriorities = [ [DrawActionID, 0] ]
    this.PutCards = []
  }

  topPriorityActionID(): number {
    let actionID: number = DrawActionID
    if (this.HandPriorities.length === 0) {
      return actionID
    }
    let max = -99999
    for (let priority of this.HandPriorities) {
      if (max < priority[1]) {
        max = priority[1]
        actionID = priority[0]
      }
    }
    return actionID
  }

  getPriority(actionID: number): number | null {
    for (let idx in this.HandPriorities) {
      if (this.HandPriorities[idx][0] === actionID) {
        return this.HandPriorities[idx][1]
      }
    }
    return null
  }

  inputPriority(actionID: number, priority: number): void {
    for (let idx in this.HandPriorities) {
      if (this.HandPriorities[idx][0] === actionID) {
        this.HandPriorities[idx][1] = priority
        return
      }
    }
    this.HandPriorities.push([actionID, priority])
  }

  addPriority(actionID: number, priority: number): void {
    for (let idx in this.HandPriorities) {
      if (this.HandPriorities[idx][0] === actionID) {
        this.HandPriorities[idx][1] += priority
        return
      }
    }
  }
}
