export default class UserData {
  public Code: string
  public Token: string
  public Name: string
  public Money: number
  public Stamina: number

  constructor() {
    this.Code = ""
    this.Token = ""
    this.Name = ""
    this.Money = 0
    this.Stamina = 0
  }
}
