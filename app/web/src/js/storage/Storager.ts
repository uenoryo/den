import ScoreData from '../data/ScoreData'

export default interface Storager {
  saveScore(score: ScoreData[]): void
  getScore(): ScoreData[] | null
  clearScore(): void
}
