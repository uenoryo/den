import assert from 'assert'
import Constants from '../../constants'
import Player from '../../models/Player'
import PlayerData from '../../data/PlayerData'
import Deck from '../../models/Deck'
import DeckData from '../../data/DeckData'
import CardData from '../../data/CardData'

describe('Player', () => {
  describe('.constructor()', () => {
    it('正しく初期化できる', () => {
      let pd = new PlayerData(1, 1)
      let p = new Player(pd)
      assert.equal(p.data.ID, 1)
      assert.equal(p.data.Type, 1)
    })
  })

  describe('.draw()', () => {
    it('カードを引くと手札が増える', () => {
      let pd = new PlayerData(1, 1)
      let p = new Player(pd)
      let dd = new DeckData([
        new CardData(Constants.CardMarkSpade, 1),
        new CardData(Constants.CardMarkClub, 2),
      ])
      let deck = new Deck(dd)

      p.draw(deck)
      assert.equal(p.hand.Cards[0].Mark, Constants.CardMarkSpade)
      assert.equal(p.hand.Cards[0].Num, 1)
    })

    it('デッキが空の場合は引いても手札が増えない', () => {
      let pd = new PlayerData(1, 1)
      let p = new Player(pd)
      let dd = new DeckData([])
      let deck = new Deck(dd)

      p.draw(deck)
      assert.equal(p.hand.Cards.length, 0)
    })
  })

  describe('.addCardToHand()', () => {
    it('カードを手札に加えられる', () => {
      let pd = new PlayerData(1, 1)
      let p = new Player(pd)
      let card = new CardData(Constants.CardMarkClub, 7)

      p.addCardToHand(card)
      assert.equal(p.hand.Cards[0].Mark, Constants.CardMarkClub)
      assert.equal(p.hand.Cards[0].Num, 7)
    })

    it('カード以外は手札に加えることができない', () => {
      let pd = new PlayerData(1, 1)
      let p = new Player(pd)

      assert.throws(() => {p.addCardToHand('invalid card.')})
    })
  })
})
