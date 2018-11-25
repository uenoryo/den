import ScoreData from '../data/ScoreData'
import { PreferenceKey } from '../type/Type'

export default interface Storager {
  saveNormalScore(score: ScoreData[]): void
  getNormalScore(): ScoreData[] | null
  clearNormalScore(): void
  saveHardScore(score: ScoreData[]): void
  getHardScore(): ScoreData[] | null
  clearHardScore(): void
  savePreference(key: PreferenceKey, value: number): void
  getPreference(key: PreferenceKey): number
  saveToken(token: string): void
  getToken(): string | null
  saveSessionID(sessionID: string): void
  getSessionID(): string | null
}
