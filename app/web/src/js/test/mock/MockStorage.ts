import Storager from './Storager'
import ScoreData from '../data/ScoreData'

export default class MockStorage implements Storager {
  private scoreData: ScoreData[] | null

  constructor() {
    this.scoreData = null
  }

  saveScore(score: ScoreData[]): void {
    this.scoreData = score
  }

  getScore(): ScoreData[] | null {
    return this.scoreData
  }

  clearScore(): void {
    this.scoreData = null
  }
}
