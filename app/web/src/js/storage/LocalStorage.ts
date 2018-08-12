import Storager from './Storager'
import ScoreData from '../data/ScoreData'

export default class LocalStorage implements Storager {
  private scoreKey: string = 'den.Score'

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
}
