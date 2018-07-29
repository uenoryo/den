import * as mocha from "mocha";
import * as assert from 'power-assert';
import CardData from '../../data/CardData'
import DeckData from '../../data/DeckData'
import Deck from '../../model/Deck'

describe('DeckData', () => {
  describe('.constructor()', () => {
    let dd = new DeckData([
      new CardData(0, 1),
      new CardData(0, 2),
    ])
    it('正常に初期化できる', () => {
      new Deck(dd)
    })
    it('枚数を取得できる', () => {
      let d = new Deck(dd)
      assert.equal(d.CardAmount, 2)
    })
  })

  describe('.turn()', () => {
    it('デッキのカードを先頭から１枚引くことができる', () => {
      let dd = new DeckData([
        new CardData(0, 1),
        new CardData(0, 2),
      ])
      let d = new Deck(dd)
      let card = d.turn()

      assert.equal(card.Mark, 0)
      assert.equal(card.Num, 1)
    })
    it('空のデッキから引こうとした場合はエラーになる', () => {
      let dd = new DeckData([])
      let d = new Deck(dd)
      assert.throws(() => { d.turn() })
    })
  })
})
