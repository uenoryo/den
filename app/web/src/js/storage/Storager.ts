import ScoreData from '../data/ScoreData'
import { PreferenceKey } from '../type/Type'

export default interface Storager {
  saveScore(score: ScoreData[]): void
  getScore(): ScoreData[] | null
  clearScore(): void
  savePreference(key: PreferenceKey, value: number): void
  getPreference(key: PreferenceKey): number
  saveToken(token: string): void
  getToken(): string | null
  saveSessionID(sessionID: string): void
  getSessionID(): string | null
}
