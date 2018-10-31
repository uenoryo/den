import { toMoneyString } from '../lib/Lib'

export default class UserData {
  public BusinessID: number
  public BusinessName: string
  public Level: number
  public CurrentPrice: number
  public LastBuyDate: string
  public BonusMoney: number
  public Prefecture: string

  constructor() {
    this.BusinessID = 0
    this.BusinessName = ""
    this.Level = 0
    this.CurrentPrice = 0
    this.LastBuyDate = ""
    this.BonusMoney = 0
    this.Prefecture = ""
  }

  get CurrentPriceString(): string {
    return toMoneyString(this.CurrentPrice)
  }

  get BonusMoneyString(): string {
    return toMoneyString(this.BonusMoney)
  }
}
