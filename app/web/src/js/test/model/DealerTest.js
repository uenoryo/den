import assert from 'assert'
import Deck from '../../models/Deck'
import DeckData from '../../data/DeckData'
import CardData from '../../data/CardData'
import Player from '../../models/Player'
import PlayerData from '../../data/PlayerData'
import Dealer from '../../models/Dealer'

describe('Dealer', () => {
  describe('.constructor()', () => {
    it('正しく初期化できる', () => {
      let deck = new Deck(new DeckData([
        new CardData(1, 1),
        new CardData(2, 2),
      ]))
      new Dealer(deck)
    })

    it('デッキがおかしい場合はエラーになる', () => {
      assert.throws(() => {new Dealer(0)})
    })
  })

  describe('.draw()', () => {
    it('カードを引くことができる', () => {
      let deck = new Deck(new DeckData([
        new CardData(1, 1),
        new CardData(2, 2),
      ]))
      let d = new Dealer(deck)
      let card = d.draw()
      assert.equal(card.Mark, 1)
      assert.equal(card.Num, 1)
    })
  })

  describe('.shuffle()', () => {
    it('シャッフルしても枚数は変わらない', () => {
      let deck = new Deck(new DeckData([
        new CardData(1, 1),
        new CardData(2, 2),
      ]))
      let d = new Dealer(deck)
      let length = d.deck.data.Cards.length
      d.shuffle()
      assert.equal(d.deck.data.Cards.length, length)
    })
  })

  describe('.deal()', () => {
    it('カードを引いてプレイヤーに渡すことができる', () => {
      let deck = new Deck(new DeckData([
        new CardData(1, 1),
        new CardData(2, 2),
      ]))
      let d = new Dealer(deck)
      let player = new Player(new PlayerData(1, 1))
      d.deal(player)
      assert.equal(player.hand.Cards[0].Mark, 1)
      assert.equal(player.hand.Cards[0].Num, 1)
    })
  })
})
