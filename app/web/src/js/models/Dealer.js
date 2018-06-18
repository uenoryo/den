import Constants from '../constants'
import FieldData from '../data/FieldData'

export default class Dealer {
  constructor(deck) {
    if (deck.constructor.name !== 'Deck') {
      throw new Error(`Invalid deck [${deck.constructor.name}]`)
    }
    this.deck = deck
    this.field = new FieldData([])
  }

  draw() {
    if (this.deck.cardNum() === 0) {
      return
    }
    return this.deck.turn()
  }

  shuffle() {
    for (let i = this.deck.data.Cards.length - 1; i > 0; i--) {
      let r = Math.floor(Math.random() * (i + 1))
      let tmp = this.deck.data.Cards[i];
      this.deck.data.Cards[i] = this.deck.data.Cards[r];
      this.deck.data.Cards[r] = tmp;
    }
  }

  deal(player) {
    let card = this.draw()
    if (card === null) {
      return
    }
    player.receive(card)
  }

  receive(card) {
    if (card.constructor.name !== 'CardData') {
      throw new Error(`Invalid Card will add to hand [${card.constructor.name}]`)
    }

    this.field.Cards.push(card)
  }

  put() {
    this.field.Cards.push(this.draw())
  }

  fieldCard() {
    if (this.field.Cards.length === 0) {
      return null
    }
    return this.field.Cards[this.field.Cards.length-1]
  }

  maintenance() {
    // 1枚だけフィールドに残し、その他をデッキに加える
    while (this.field.Cards.length > 1) {
      this.deck.data.Cards.push(this.field.Cards.pop())
    }
  }

  shouldMaintenance() {
    return this.deck.cardNum() <= Constants.DeckShuffleRemainingAmount
  }
}
