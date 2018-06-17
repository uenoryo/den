export default class Dealer {
  constructor(deck) {
    if (deck.constructor.name !== 'Deck') {
      throw new Error(`Invalid deck [${deck.constructor.name}]`)
    }
    this.deck = deck
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
}
