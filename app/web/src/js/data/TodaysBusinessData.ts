import { toMoneyString } from '../lib/Lib'

export default class TodaysBusinessData {
  public ID: number
  public Name: string
  public Price: number
  public Level: number
  public IsMaxLevel: boolean
  public IsSoldOut: boolean
  public Prefecture: string
  public IconID: number

  constructor() {
    this.ID = 0
    this.Name = ""
    this.Price = 0
    this.Level = 1
    this.IsMaxLevel = false
    this.IsSoldOut = false
    this.Prefecture = ""
    this.IconID = 0
  }

  get PriceString(): string {
    return toMoneyString(this.Price)
  }
}
