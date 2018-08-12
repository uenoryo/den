import Storager from './Storager'
import ScoreData from '../data/ScoreData'

export default class LocalStorage implements Storager {
  saveScore(score: ScoreData[]): void {
    //
  }

  getScore(): ScoreData[] | null {
    return null
  }

  clearScore(): void {
    //
  }
}
