import { toMoneyString } from '../lib/Lib'

export default class TodaysBusinessData {
  public ID: number
  public Name: string
  public PriceBase: number
  public PriceLevel2: number
  public PriceLevel3: number

  constructor() {
    this.ID = 0
    this.Name = ""
    this.PriceBase = 0
    this.PriceLevel2 = 0
    this.PriceLevel3 = 0
  }

  get PriceBaseString(): string {
    return toMoneyString(this.PriceBase)
  }

  get PriceLevel2String(): string {
    return toMoneyString(this.PriceLevel2)
  }

  get PriceLevel3String(): string {
    return toMoneyString(this.PriceLevel3)
  }
}
