import CardData from './CardData'

export default class CardFantomData extends CardData {
  constructor(mark, num) {
    super(mark, num)
    this.CSS = {
      TransitionDuration: '.3s'
    }
  }
}
