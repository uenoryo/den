import { toMoneyString } from '../lib/Lib'

export default class UserData {
  public BusinessID: number
  public BusinessName: string
  public Level: number
  public CurrentPrice: number

  constructor() {
    this.BusinessID = 0
    this.BusinessName = ""
    this.Level = 0
    this.CurrentPrice = 0
  }
}
