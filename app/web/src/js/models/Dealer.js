export default class Dealer {
  shuffle(deck) {
    if (deck.constructor.name !== 'Deck') {
      throw new Error(`Dealer can't shuffle [${deck.constructor.name}]`)
    }

    for (let i = deck.data.Cards.length - 1; i > 0; i--) {
        let r = Math.floor(Math.random() * (i + 1))
        let tmp = deck.data.Cards[i];
        deck.data.Cards[i] = deck.data.Cards[r];
        deck.data.Cards[r] = tmp;
    }
  }
}
