import CardData from './CardData'

export default class DeckData {
  constructor(
    private cards:CardData[]
  ) {}

  get Cards():CardData[] {
    return this.cards
  }
}
