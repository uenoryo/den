import Constants from '../constants'

export default class FieldData {
  constructor(cards) {
    this.cards(cards)
    this.putPlayerID
  }

  cards(cards) {
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

  putPlayerID(putPlayerID) {
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
