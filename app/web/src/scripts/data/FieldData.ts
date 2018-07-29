declare function require(x: string): any;
const Constants = require('../constants')

export default class FieldData {
  public Cards: any
  public PutPlayerID: number
  public denable: boolean

  constructor(cards: any) {
    this.cards(cards)
    this.PutPlayerID = 0
    this.denable = true
  }

  cards(cards: any) {
    if (Array.isArray(cards) === false) {
      throw new Error(`Invalid Cards [${cards}].`)
    }

    for (let idx in cards) {
      if (cards[idx].constructor.name !== 'CardData') {
        throw new Error(`Invalid Card [${cards[idx].constructor.name}]`)
      }
    }

    this.Cards = cards
  }

  putPlayerID(putPlayerID: number) {
    if (
      putPlayerID !== 0 &&
      putPlayerID !== Constants.Player1ID &&
      putPlayerID !== Constants.Player2ID &&
      putPlayerID !== Constants.Player3ID &&
      putPlayerID !== Constants.Player4ID
    ) {
      throw new Error(`Invalid putPlayerID [${putPlayerID}].`)
    }

    this.PutPlayerID = putPlayerID
  }
}
