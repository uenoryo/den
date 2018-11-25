import Storager from './Storager'
import ScoreData from '../data/ScoreData'
import { PreferenceKey } from '../type/Type'

export default class LocalStorage implements Storager {
  private normalScoreKey: string = 'den.NoralScore'
  private hardScoreKey: string = 'den.HardScore'
  private tokenKey: string = 'den.Token'
  private sessionIDKey: string = 'den.SessionID'
  private preferenceKeyPrefix: string = 'den.Preference.'

  saveNormalScore(score: ScoreData[]): void {
    localStorage.setItem(this.normalScoreKey, JSON.stringify(score))
  }

  getNormalScore(): ScoreData[] | null {
    let item = localStorage.getItem(this.normalScoreKey)
    if (item === null) {
      return null
    }
    return JSON.parse(item) as ScoreData[]
  }

  clearNormalScore(): void {
    localStorage.removeItem(this.normalScoreKey)
  }

  saveHardScore(score: ScoreData[]): void {
    localStorage.setItem(this.hardScoreKey, JSON.stringify(score))
  }

  getHardScore(): ScoreData[] | null {
    let item = localStorage.getItem(this.hardScoreKey)
    if (item === null) {
      return null
    }
    return JSON.parse(item) as ScoreData[]
  }

  clearHardScore(): void {
    localStorage.removeItem(this.hardScoreKey)
  }

  savePreference(key: PreferenceKey, value: number): void {
    localStorage.setItem(this.preferenceKeyPrefix + String(key), String(value))
  }

  getPreference(key: PreferenceKey): number {
    let item = localStorage.getItem(String(key))
    if (item === null) {
      return 0
    }
    return +item
  }

  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token)
  }

  getToken(): string | null {
    let item = localStorage.getItem(this.tokenKey)
    if (item === null) {
      return null
    }
    return item
  }

  saveSessionID(sessionID: string): void {
    localStorage.setItem(this.sessionIDKey, sessionID)
  }

  getSessionID(): string | null {
    let item = localStorage.getItem(this.sessionIDKey)
    if (item === null) {
      return null
    }
    return item
  }
}
