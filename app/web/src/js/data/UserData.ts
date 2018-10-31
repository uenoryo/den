import { toMoneyString } from '../lib/Lib'

export default class UserData {
  public Code: string
  public Token: string
  public Name: string
  public Money: number
  public Rank: number
  public Stamina: number
  public BestScore: number
  public BestTotalScore: number

  constructor() {
    this.Code = ""
    this.Token = ""
    this.Name = ""
    this.Money = 0
    this.Rank = 0
    this.Stamina = 0
    this.BestScore = 0
    this.BestTotalScore = 0
  }

  get MoneyString(): string {
    return toMoneyString(this.Money)
  }

  get BestScoreString(): string {
    return toMoneyString(this.BestScore)
  }

  get BestTotalScoreString(): string {
    return toMoneyString(this.BestTotalScore)
  }
}
