import Storager from '../../storage/Storager'
import ScoreData from '../../data/ScoreData'
import { PreferenceKey } from '../../type/Type'

export default class MockStorage implements Storager {
  public NormalScoreData: ScoreData[] | null
  public HardScoreData: ScoreData[] | null
  public SessionID: string | null
  public Token: string | null

  constructor() {
    this.NormalScoreData = null
    this.HardScoreData = null
    this.SessionID = null
    this.Token = null
  }

  saveNormalScore(score: ScoreData[]): void {
    this.NormalScoreData = score
  }

  getNormalScore(): ScoreData[] | null {
    return this.NormalScoreData
  }

  clearNormalScore(): void {
    this.NormalScoreData = null
  }

  saveHardScore(score: ScoreData[]): void {
    this.HardScoreData = score
  }

  getHardScore(): ScoreData[] | null {
    return this.HardScoreData
  }

  clearHardScore(): void {
    this.HardScoreData = null
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
