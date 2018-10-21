import Storager from '../../storage/Storager'
import ScoreData from '../../data/ScoreData'
import { PreferenceKey } from '../../type/Type'

export default class MockStorage implements Storager {
  public ScoreData: ScoreData[] | null
  public SessionID: string | null
  public Token: string | null

  constructor() {
    this.ScoreData = null
    this.SessionID = null
    this.Token = null
  }

  saveScore(score: ScoreData[]): void {
    this.ScoreData = score
  }

  getScore(): ScoreData[] | null {
    return this.ScoreData
  }

  clearScore(): void {
    this.ScoreData = null
  }

  savePreference(key: PreferenceKey, value: number): void {
    //
  }

  getPreference(key: PreferenceKey): number {
    return 0
  }

  saveToken(token: string): void {
    this.Token = token
  }

  getToken(): string | null {
    return this.Token
  }

  saveSessionID(sessionID: string): void {
    this.SessionID = sessionID
  }

  getSessionID(): string | null {
    return this.SessionID
  }
}
