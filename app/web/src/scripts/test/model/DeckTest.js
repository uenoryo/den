import assert from 'assert'
import Constants from '../../constants'
import Deck from '../../models/Deck'
import DeckData from '../../data/DeckData'
import CardData from '../../data/CardData'

describe('Deck', () => {
  describe('.constructor()', () => {
    it('正しく初期化できる', () => {
      let dd = new DeckData([
        new CardData(Constants.CardMarkSpade, 1),
        new CardData(Constants.CardMarkClub, 2),
      ])
      new Deck(dd)
    })
  })

  describe('.cardNum()', () => {
    it('デッキの枚数を取得できる', () => {
      let dd = new DeckData([
        new CardData(Constants.CardMarkSpade, 1),
        new CardData(Constants.CardMarkClub, 2),
      ])
      let d = new Deck(dd)
      assert.equal(d.cardNum(), 2)
    })
  })

  describe('.turn()', () => {
    it('デッキのカードを先頭から１枚引ける', () => {
      let dd = new DeckData([
        new CardData(Constants.CardMarkSpade, 1),
        new CardData(Constants.CardMarkClub, 2),
      ])
      let d = new Deck(dd)
      let card = d.turn()

      assert.equal(card.Mark, Constants.CardMarkSpade)
      assert.equal(card.Num, 1)
    })

    it('空のデッキから引こうとした場合はエラーになる', () => {
      let dd = new DeckData([])
      let d = new Deck(dd)

      assert.throws(() => {d.turn()})
    })
  })
})
