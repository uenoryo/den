import Storager from './Storager'
import ScoreData from '../data/ScoreData'
import { PreferenceKey } from '../type/Type'

export default class LocalStorage implements Storager {
  private scoreKey: string = 'den.Score'
  private preferenceKeyPrefix: string = 'den.Preference.'

  saveScore(score: ScoreData[]): void {
    localStorage.setItem(this.scoreKey, JSON.stringify(score))
  }

  getScore(): ScoreData[] | null {
    let item = localStorage.getItem(this.scoreKey)
    if (item === null) {
      return null
    }
    return JSON.parse(item) as ScoreData[]
  }

  clearScore(): void {
    localStorage.removeItem(this.scoreKey)
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
}
