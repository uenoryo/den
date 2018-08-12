import Storager from './Storager'
import ScoreData from '../data/ScoreData'

export default class MockStorage implements Storager {
  public ScoreData: ScoreData[] | null

  constructor() {
    this.ScoreData = null
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
}
