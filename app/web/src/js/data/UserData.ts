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
  public NormalLevel: number
  public HardLevel: number
  public Com1NormalLevel: number
  public Com2NormalLevel: number
  public Com3NormalLevel: number
  public Com1HardLevel: number
  public Com2HardLevel: number
  public Com3HardLevel: number

  constructor() {
    this.Code = ""
    this.Token = ""
    this.Name = ""
    this.Money = 0
    this.Rank = 0
    this.Stamina = 0
    this.BestScore = 0
    this.BestTotalScore = 0
    this.NormalLevel = 0
    this.HardLevel = 0
    this.Com1NormalLevel = 0
    this.Com2NormalLevel = 0
    this.Com3NormalLevel = 0
    this.Com1HardLevel = 0
    this.Com2HardLevel = 0
    this.Com3HardLevel = 0
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
