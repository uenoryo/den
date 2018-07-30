import * as mocha from "mocha";
import * as assert from 'power-assert';
import CardData from '../../data/CardData'
import DeckData from '../../data/DeckData'

describe('DeckData', () => {
  describe('.constructor()', () => {
    let dd = new DeckData([
        new CardData(0, 1),
        new CardData(0, 2),
        new CardData(0, 3),
    ])
    it('カードが正しく設定される', () => {
      assert.equal(dd.Cards[0].Mark, 0)
      assert.equal(dd.Cards[0].Num, 1)
    })
  })

  describe('.turn()', () => {
    it('デッキのカードを先頭から１枚引くことができる', () => {
      let dd = new DeckData([
        new CardData(0, 1),
        new CardData(0, 2),
      ])
      let card = dd.turn()

      assert.equal(card.Mark, 0)
      assert.equal(card.Num, 1)
    })
    it('空のデッキから引こうとした場合はエラーになる', () => {
      let dd = new DeckData([])
      assert.throws(() => { dd.turn() })
    })
  })
})

