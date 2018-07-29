import CardData from './CardData'
import HandData from './HandData'

export default class BrainData {
  public FieldCard:CardData | null
  public SelfCard:HandData | null
  public PuttableIdx:number[]
  public PutCards:CardData[]

  constructor() {
    this.FieldCard = null
    this.SelfCard = null
    this.PuttableIdx = []
    this.PutCards = []
  }
}
