import CardData from './CardData'
import HandData from './HandData'
import { HandActionPriority } from '../type/Type'

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
}
